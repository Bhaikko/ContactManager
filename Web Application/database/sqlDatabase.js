const Sequelize = require("sequelize");

const database = new Sequelize("contactmanager", "contactManagerAdmin", "123456",{
    host: "localhost",
    dialect: "mysql",
    logging: false 
});

const Users = database.define("users", {
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
    },
    bAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false 
    }

});

const Contacts = database.define("contacts", {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    phone: {
        type: Sequelize.STRING,
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

Contacts.belongsTo(Users);
Users.hasMany(Contacts);

const ActiveUsers = database.define("activeUsers", {
    socketId: {
        type: Sequelize.STRING,
        allowNull: false 
    }
});

ActiveUsers.belongsTo(Users);
Users.hasMany(ActiveUsers);

const Messages = database.define("messages", {
    message: {
        type: Sequelize.STRING,
        allowNull: false 
    },
    time: {
        type: Sequelize.STRING,
        allowNull: false
    },
    bSeen: {
        type: Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue: false 
    }
});

Messages.belongsTo(Users);
Messages.belongsTo(Contacts);
Users.hasMany(Messages);
Contacts.hasMany(Messages);

module.exports = {  
    database, 
    Users, 
    Contacts,
    Messages,
    ActiveUsers
};
