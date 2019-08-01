const { Users, Contacts, ActiveUsers, Messages} = require("./sqlDatabase");


function getUser(username)
{
    return Users.findAll({
        attributes: ["username"],
        where: {
            username
        }
    });
}

function getUserId(mobile)
{
    return Users.findOne({
        attributes: ["id"],
        where: {
            mobile
        }
    });
}

function getSocketId(userId)
{
    return ActiveUsers.findOne({
        attributes: ["socketId"],
        where: {
            userId
        }
    });
}

function checkUserAndPassword(username, password)
{
    return Users.findAll({
        attributes: ["username", "password"],
        where:  {
            username,
            password 
        }
    });
}

function checkUsername(username)
{
    return Users.findAll({
        attributes: ["username"],
        where:  {
            username
        }
    });
}

function checkMobile(mobile)
{
    return Users.findAll({
        attributes: ["mobile"],
        where:  {
            mobile
        }
    });
}

function addUser(username, password, mobile)
{
    return Users.findOne({
        where: {
            username
        }
    })
    .then(function(user)
    {
        if(!user)
        {
            return Users.create({
                username,
                password,
                mobile
            });
        }
    })
    .catch(console.log);
}

function addAdmin(username, password, mobile)
{
    return Users.findOne({
        where: {
            username 
        }
    })
    .then(function(admin)
    {
        if(!admin)
        {
            return Users.create({
                username,
                password,
                mobile,
                bAdmin: true 
            })
        }
        else 
        {
            return Contacts.update({
                bAdmin: true 
            },
            {
                where:  {
                    username
                }
            });
        }
    })
}

function addContact(userId, name, phone, address, email, profile)
{
    return Contacts.findOne({
        where: {
            userId,
            phone 
        }
    })
    .then(function(contact)
    {
        if(!contact)
        {
            return Contacts.create({
                userId,
                name,
                phone,
                address,
                email,
                profile 
            });
        }
    })
    .catch(console.log);
}

function getContacts(userId, bFrontPage)
{
    if(bFrontPage)
    {
        return Contacts.findAll({
            attributes: ["name", "profile", "phone"],
            where: {
                userId
            }
        });
    }
    else (!bFrontPage)
    {
        return Contacts.findAll({
            where: {
                userId
            }
        });
    }
}

function patchContacts(userId ,name, phone, address, email)
{
    return Contacts.update({
        name,
        address,
        email
    },
    {
        where:  {
            userId,
            phone
        }
    });
}

function deleteContact(userId, phone)
{
    return Contacts.destroy({
        where:  {
            userId,
            phone
        }
    });
}

// addAdmin("nimda", "nimda", "99999"); To Add Admin, run this function

function makeActive(userId, socketId)
{
    return ActiveUsers.findOne({
        where: {
            userId
        }
    })
    .then(function(user)
    {
        if(user)
        {
           ActiveUsers.destroy({
               where:   {
                   userId 
               }
           }) 
        }
        return ActiveUsers.create({
            userId,
            socketId 
        });
    })
    .catch(console.log);
}

function removeActive(socketId)
{
    return ActiveUsers.destroy({
        where:  {
            socketId
        }
    });
}

function addMessage(userId, contactId, message, time)
{
    Messages.create({
        userId,
        contactId,
        message,
        time
    });
}

function getMessages(senderMobile, phone)
{
    return Users.findOne({
        attributes: ["id"],
        where: {
            mobile: senderMobile 
        }
    })
    .then(function(user)
    {
        if(!user)
            return;

        return Contacts.findOne({
            attributes: ["id"],
            where: {
                userId: user.get().id,
                phone
            }
        })
        .then(function(contact)
        {
            return Messages.findAll({
                where:  {
                    userId: user.get().id,
                    contactId: contact.get().id 
                }
            })
            .then(function(messages)
            {
                return messages;
            })
        })
    })
}

function getContactId(userId, phone)
{
    return Contacts.findOne({
        where:  {
            userId,
            phone
        }
    });
}

function checkOnline(userId)
{
    return ActiveUsers.findOne({
        where: {
           userId 
        }
    });
}

function checkFriend(userId, phone)
{
    return Contacts.findOne({
        where:  {
            id: userId,
            phone
        }
        
    });
}

module.exports = {
    addUser, 
    addContact, 
    getContacts, 
    patchContacts, 
    getUser, 
    getUserId,
    getSocketId,
    checkUserAndPassword, 
    checkUsername,
    checkMobile,
    deleteContact,
    makeActive,
    removeActive,
    getMessages,
    addMessage,
    getContactId,
    checkOnline,
    checkFriend,
    
}