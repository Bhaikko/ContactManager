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
    let name = req.user.username;
    let renderingContacts = [];

    sqlDatabaseHandler.getContacts(req.user.username, true)
    .then(function(contacts)
    {
        contacts.map(function(contact)
        {
            contact.name = contact.name.split(" ")[0];
        });
        res.render("myhomepage", {name, contacts});
    });

});

route.get("/contacts", function(req, res, next)
{
    let username = req.user.username;
    let renderingContacts = [];
    sqlDatabaseHandler.getContacts(req.user.username, false)
    .then(function(contacts)
    {   
        renderingContacts = contacts;
        renderingContacts.map(function(current, index)
        {
            current.firstName = contacts[index].name.split(" ")[0];
        });
        res.render("mycontacts", { renderingContacts, username});
    });
})

route.post("/addContact", uploadHandler.upload.single("profile"), function(req, res, next)
{
    let newContact = {
        name: req.body.firstName,
        phone: req.body.phone,
        address: req.body.houseNumber + " " + req.body.locality + " " + req.body.city + " " + req.body.state + " " + req.body.pincode,
        email: req.body.email,
    };
    if(req.body.middleName)
        newContact.name += " \" " + req.body.middleName + " \" ";
    if(req.body.lastName)
        newContact.name += req.body.lastName;
    
    require("fs").access(__dirname + "/../public/uploads/" + req.user.username + "/" + req.body.phone, function(err)
    {
        if(!err)
            newContact["profile"] = "./../uploads/" + req.user.username + "/" + req.body.phone;
        else
            newContact["profile"] = "./../uploads/profile.png";
    
        sqlDatabaseHandler.addContact(req.user.username, newContact.name, newContact.phone, newContact.address, newContact.email, newContact.profile);
        res.redirect("/profile/contacts");
        return;
        
    });
});

route.patch("/patchContact", function(req, res)
{
    sqlDatabaseHandler.patchContacts(req.body.name, req.body.phone, req.body.address, req.body.email);
});

module.exports = route;