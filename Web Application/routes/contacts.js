const express = require("express");
const route = express.Router();

contacts = [
    {
        name: "Siddharth Bhaikko Pawar",
        phone: "999999999",
        address: "house locallity city state pin",
        email: "yo@gmail.com"
    },
    {
        name: "Yo Bhaikko Pawar2",
        phone: "999999999",
        address: "house locallity city state pin",
        email: "yo@gmail.com"
    },
    {
        name: "No Bhaikko Pawar3",
        phone: "999999999",
        address: "house locallity city state pin",
        email: "yo@gmail.com"
    },
    {
        name: "N-word Bhaikko Pawar4",
        phone: "999999999",
        address: "house locallity city state pin",
        email: "yo@gmail.com"
    },
    {
        name: "Siddharth Bhaikko Pawar5",
        phone: "999999999",
        address: "house locallity city state pin",
        email: "yo@gmail.com"
    }
]


route.get("/", function(req, res, next)
{
    res.render("myhomepage");
});

route.get("/contacts", function(req, res, next)
{
    let renderingContacts = contacts;
    renderingContacts.map(function(current, index)
    {
        current.firstName = contacts[index].name.split(" ")[0];
    });
    res.render("mycontacts", { renderingContacts});
})

route.post("/addContact", function(req, res, next)
{
    console.log(req.user)
});

module.exports = route;