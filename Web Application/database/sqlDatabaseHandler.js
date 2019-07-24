// In The End I Guess
// Will be using mySql Though with sequelize and mysql

const Sequelize = require("sequelize");

const database = new Sequelize("contactmanager", "contactManagerAdmin", "123456",{
    host: "localhost",
    // port: 3306,
    dialect: "mysql",
    logging: false 
});

const Users = database.define("users", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false, 
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false 
    },
    mobile: {
        type: Sequelize.STRING,
        allowNull: false,
    }

});

const Contacts = database.define("contacts", {
    username: {
        type: Sequelize.STRING,
        allowNull: false 
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    phone: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
    },
    address: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING 
    },
    profile:{
        type: Sequelize.STRING,
        allowNull: false 
    }
});

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
        else 
        {
            return "User Already Exist";
        }
    })
    .catch(console.log);
}

function addContact(username, name, phone, address, email, profile)
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
                username,
                name,
                phone,
                address,
                email,
                profile 
            });
        }
        else 
        {
            return "Contact Already Exist";
        }
    })
    .catch(console.log);
}

function getContacts(username, bFrontPage)
{
    if(bFrontPage)
    {
        return Contacts.findAll({
            attributes: ["name", "profile"],
            where: {
                username
            }

        })
    }
    else (!bFrontPage)
    {
        return Contacts.findAll({
            where: {
                username
            }
        });
    }
}

function patchContacts(name, phone, address, email)
{
    return Contacts.update({
        name,
        phone,
        address,
        email
    },
    {
        where:  {
            phone
        }
    });
}

module.exports = {  database, Users, Contacts, addUser, addContact, getContacts, patchContacts};
