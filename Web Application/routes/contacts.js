const express = require("express");

const uploadHandler = require("./../uploads/uploadHandler");
const sqlDatabaseHandler = require("./../database/sqlDatabaseHandler");

const route = express.Router();

// contacts = [
//     {
//         name: "Siddharth Bhaikko Pawar",
//         phone: "999999999",
//         address: "house locallity city state pin",
//         email: "yo@gmail.com",
//         profile: "./../uploads/profile.png"
//     }
// ];


route.get("/", function(req, res, next)
{
    res.render("myhomepage");
});

route.get("/contacts", function(req, res, next)
{
    let renderingContacts = [];
    sqlDatabaseHandler.getContacts(req.user.username)
    .then(function(contacts)
    {   
        renderingContacts = contacts;
        renderingContacts.map(function(current, index)
        {
            current.firstName = contacts[index].name.split(" ")[0];
        });


        res.render("mycontacts", { renderingContacts});
    });
})

route.post("/addContact", uploadHandler.upload.single("profile"), function(req, res, next)
{
    let newContact = {
        name: req.body.firstName + " \" " + req.body.middleName + " \" " + req.body.lastName,
        phone: req.body.phone,
        address: req.body.houseNumber + " " + req.body.locality + " " + req.body.city + " " + req.body.state + " " + req.body.pincode,
        email: req.body.email,
    };
    
    require("fs").access(__dirname + "/../public/uploads/" + req.user.username + "/" + req.body.phone, function(err)
    {
        console.log("inside");
        if(!err)
            newContact["profile"] = "./../uploads/" + req.user.username + "/" + req.body.phone;
        else
            newContact["profile"] = "./../uploads/profile.png";
    
        sqlDatabaseHandler.addContact(req.user.username, newContact.name, newContact.phone, newContact.address, newContact.email, newContact.profile)
        .then(function(result)
        {
            console.log("New Contact Added By " + req.user.username);
        });
        res.redirect("/profile/contacts");
        return;
        
    });
});

module.exports = route;