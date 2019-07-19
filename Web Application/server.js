const express = require("express");
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

let port = 4000;
server.listen(port, () => console.log("Server Up And Running On 127.0.0.1:" + port));
