const express = require("express");
const sqlDatabaseHandler = require("./database/sqlDatabaseHandler");
const session = require("express-session");
const passport = require("./passport");

const contactsRouter = require("./routes/contacts");

const server = express();

server.set("view engine", "hbs");
server.use(express.json());
server.use(express.urlencoded({extended: true}));

server.use(express.static("./public"));

server.use(session({
    secret: "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF FFFFFF",
    resave: false,
    saveUninitialized: true,
    // cookie: {
    //     maxAge: 1000 * 60
    // }
}));

server.use(passport.initialize());
server.use(passport.session());

server.post("/login", passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login.html"
}));

function checkLoggedIn(req, res, next)
{
    if(req.user)
        return next();

    res.redirect("/login.html");
}

server.use("/profile", checkLoggedIn, contactsRouter);


server.post("/signup", function(req, res)
{
    sqlDatabaseHandler.addUser(req.body.username, req.body.password, req.body.mobile)
    .then(function(response)
    {
        if(response == "User Already Exist")
            console.log("User Already Exist");
        else 
            console.log("New User: " + req.body.username + " Added");
        
        res.redirect("/login.html");
    });
});


sqlDatabaseHandler.database.sync()
.then(function()
{
    console.log("SQL Database Synced");
    let port = 4000;
    server.listen(port, () => console.log("Server Up And Running On 127.0.0.1:" + port));
});

