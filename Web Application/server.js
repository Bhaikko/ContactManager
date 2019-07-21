const express = require("express");
const sqlDatabaseHandler = require("./database/sqlDatabaseHandler");

const server = express();

server.set("view engine", "hbs");
server.use(express.json());
server.use(express.urlencoded({extended: true}));

server.use(express.static("./public"));

server.get("/myhomepage", function(req, res, next)
{
    res.render("myhomepage");
});

server.get("/mycontacts", function(req, res, next)
{
    res.render("mycontacts");
});


sqlDatabaseHandler.database.sync()
.then(function()
{
    console.log("SQL Database Synced");
    let port = 4000;
    server.listen(port, () => console.log("Server Up And Running On 127.0.0.1:" + port));
});

