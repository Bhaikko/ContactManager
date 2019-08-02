const express = require("express");

const uploadHandler = require("../uploads/uploadHandler");
const sqlDatabaseHandler = require("../database/sqlDatabaseHandler");

const route = express.Router();

route.get("/", function(req, res, next)
{
    let name = req.user.username;
    let mobile = req.user.mobile;
    sqlDatabaseHandler.getContacts(req.user.id, true)
    .then(async function(contacts)
    {
        const contactPromises = await contacts.map(async function(contact)
        {
            contact.get().name = contact.get().name.split(" ")[0]; 
            await sqlDatabaseHandler.getMessages(contact.phone, mobile)
            .then(function(messages)
            {
                if(messages && messages[0])
                {
                    contact.bSeen = messages[0].get().bSeen;
                }
            });

        });
        await Promise.all(contactPromises);
        // await console.log(contacts);
        await res.render("myhomepage", {name, mobile, contacts});
    });
       
    
            
});

route.post("/myid", function(req, res)
{
    sqlDatabaseHandler.getUserId(req.body.mobile)
    .then(function(user)
    {
        res.send(user);
    });
})

route.post("/checkOnline", function(req, res)
{
    sqlDatabaseHandler.getUserId(req.body.currentContact)
    .then(function(user)
    {
        sqlDatabaseHandler.checkOnline(user.get().id)
        .then(function(status)
        {
            if(status)
                res.send("Online");
            else
                res.send("Offline");
        })
    })
});

route.post("/checkuser", function(req, res)
{
    sqlDatabaseHandler.getUserId(req.body.currentContact)
    .then(function(user)
    {
        if(user == null)
            res.send("false")
        else 
            res.send("true");
    })
})

route.post("/checkFriend", function(req, res)
{
    sqlDatabaseHandler.getUserId(req.body.currentContact)
    .then(function(user)
    {
        sqlDatabaseHandler.checkFriend(user.get().id, req.body.mobile)
        .then(function(bFriend)
        {
            if(bFriend == null)
            {
                sqlDatabaseHandler.addContact(user.get().id, "Unknown", req.body.mobile, "", "", "./../uploads/profile.png");
            }
            res.sendStatus(200);
        });
    })
})

route.get("/contacts", function(req, res, next)
{
    let username = req.user.username;
    let renderingContacts = [];
    sqlDatabaseHandler.getContacts(req.user.id, false)
    .then(function(contacts)
    {   
        renderingContacts = contacts;
        renderingContacts.map(function(current, index)
        {
            current.firstName = contacts[index].name.split(" ")[0];
        });
        res.render("mycontacts", { renderingContacts, username});
    });
});

route.post("/messages", function(req, res)
{
    sqlDatabaseHandler.getMessages(req.body.mobile, req.body.currentContact, req.body.bRecieved)
    .then(function(data)
    {
        messages = [];
        if(data)
        {
            data.forEach(function(current, index)
            {
                messages[index] = current.get();
            });  
        }
        res.send(messages);
       
    });
});

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
    
        sqlDatabaseHandler.addContact(req.user.id, newContact.name, newContact.phone, newContact.address, newContact.email, newContact.profile);
        res.redirect("/profile/contacts");
        return;
        
    });
});

route.patch("/patchContact", function(req, res)
{
    sqlDatabaseHandler.patchContacts(req.user.id ,req.body.name, req.body.phone, req.body.address, req.body.email);
});

route.delete("/deleteContact", function(req, res)
{
    sqlDatabaseHandler.deleteContact(req.user.id, req.body.phone);
    require("fs").access(__dirname + "/../public/uploads/" + req.user.username + "/" + req.body.phone, function(err)
    {
        if(!err)
        {
            require("fs").unlink(__dirname + "/../public/uploads/" + req.user.username + "/" + req.body.phone, function(err)
            {
                if(err)
                    console.log(err);
            });
        }
    });
    
});

module.exports = route;