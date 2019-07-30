//npm packages
const express = require("express");
const session = require("express-session");
const socket = require("socket.io");
const MongoStore = require("connect-mongo")(session);

const http = require("http");
const fs = require("fs");

//Handlers
const { database} = require("./database/sqlDatabase");
const sqlDatabaseHandler = require("./database/sqlDatabaseHandler");
const passport = require("./passport");

//Routers
const contactsRouter = require("./routes/profile");
const adminRouter = require("./routes/admin");

const app = express();
const server = http.createServer(app);


app.set("view engine", "hbs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static("./public"));
app.use("/admin", express.static("./private"));

let sessionMiddleware = session({
    secret: "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF FFFFFF",
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
        url: "mongodb://127.0.0.1:5000/sessions"
    }),
    // cookie: {
    //     maxAge: 1000 * 60 * 60
    // }
});

app.use(sessionMiddleware);

app.use(passport.initialize());
app.use(passport.session());

app.post("/login", passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login.html"
}));

app.post("/adminLogin", passport.authenticate("local", {
    successRedirect: "/admin/issues",
    failureRedirect: "/"
}));

function checkLoggedIn(req, res, next)
{
    if(!req.user)
    {
        res.redirect("/login.html");
        return;
    }
        
    next();    
}  

function checkAdminLogin(req, res, next)
{
    if(!req.user.bAdmin)
    {
        res.redirect("/admin");
        return;
    }
    next();
}

app.use("/profile", checkLoggedIn, contactsRouter);
app.use("/admin", checkLoggedIn, checkAdminLogin, adminRouter); 

app.post("/signup", function(req, res)
{
    sqlDatabaseHandler.addUser(req.body.username, req.body.password, req.body.mobile)
    .then(function(response)
    {
        fs.mkdir("./public/uploads/" + req.body.username, function(err, dir)
        {
            res.redirect("/login.html");
        });
    });
});

app.post("/checkUserLogin", function(req, res, next)
{
    sqlDatabaseHandler.checkUserAndPassword(req.body.username, req.body.password)
    .then(function(user)
    {
        res.send(user);
    });
});

app.post("/checkUsername", function(req, res, next)
{
    sqlDatabaseHandler.checkUsername(req.body.username)
    .then(function(user)
    {
        res.send(user);
    });
});

app.post("/checkMobile", function(req, res)
{
    sqlDatabaseHandler.checkMobile(req.body.mobile)
    .then(function(user)
    {
        res.send(user);
    })
})

app.get("/logout", function(req, res)
{
    req.logOut();
    res.redirect("/");
});

app.get("/time", function(req, res)
{
    let today = new Date();
    let currentTime = today.getHours() + ":" + today.getMinutes();
    res.send(currentTime);
})

const io = socket(server)
    .use(function(socket, next)
    {
        sessionMiddleware(socket.request, {}, next);
    })
    .on("connection", function(socket)
    {
        let today = new Date();
        let userId = socket.request.session.passport.user;
        sqlDatabaseHandler.makeActive(userId, socket.id);

        socket.on("send", function(data)
        {
            
            sqlDatabaseHandler.getUserId(data.mobile)
            .then(function(user)
            {
                if(user)
                {
                    // console.log(user.get());
                    sqlDatabaseHandler.getSocketId(user.get().id)
                    .then(function(socketData)
                    {
                        socket.to(socketData.socketId).emit("recieve", {
                            mobile: data.mobile,
                            message: data.message,
                            time: today.getHours() + ":" + today.getMinutes()
                        });
                    });
                }
                
            });
        });
        
        socket.on("disconnect", function()
        {
            sqlDatabaseHandler.removeActive(socket.id);
        });
    });


database.sync()
.then(function()
{
    console.log("SQL Database Synced");
    let port = 4000;
    server.listen(port, () => console.log("Server Up And Running On 127.0.0.1:" + port));
});



