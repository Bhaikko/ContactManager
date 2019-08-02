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

route.delete("/issues", function(req, res)
{
    mongoDatabaseHandler.connectdb("contactmanager")
    .then(function(database)
    {
        const issues = database.collection("issues");
        issues.deleteMany({
            name: req.body.name, 
            email: req.body.email,
        });
    });
    res.sendStatus(200);
})

module.exports = route;            