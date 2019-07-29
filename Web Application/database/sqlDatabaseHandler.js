const { Users, Contacts, ActiveUsers} = require("./sqlDatabase");


function getUser(username)
{
    return Users.findAll({
        attributes: ["username"],
        where: {
            username
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
            attributes: ["name", "profile"],
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

// addAdmin("nimda", "nimda", "99999");

function makeActive(userId, socketId)
{
    return ActiveUsers.findOne({
        where: {
            userId,
            socketId 
        }
    })
    .then(function(user)
    {
        if(!user)
        {
            return ActiveUsers.create({
                userId,
                socketId 
            });
        }
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


module.exports = {
    addUser, 
    addContact, 
    getContacts, 
    patchContacts, 
    getUser, 
    checkUserAndPassword, 
    deleteContact,
    makeActive,
    removeActive
}