const express = require("express");

const mongoDatabaseHandler = require("./../database/mongoDatabaseHandler");
const route = express.Router();



route.get("/issues", function(req, res)
{
    mongoDatabaseHandler.connectdb("contactmanager")
    .then(function(database)
    {
        const issues = database.collection("issues");
        issues.find().toArray()
        .then(function(data)
        {
            res.render("issues", {data});
        });
    })
});

route.post("/issues", function(req, res)
{
    mongoDatabaseHandler.connectdb("contactmanager")
    .then(function(database)
    {
        const issues = database.collection("issues");
        issues.insertOne({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message 
        });
    });
    res.redirect("/");
});

route.delete("/issues", function(req, res)
{
    mongoDatabaseHandler.connectdb("contactmanager")
    .then(function(database)
    {
        const issues = database.collection("issues");
        issues.deleteOne({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        });
    });
})

module.exports = route;            