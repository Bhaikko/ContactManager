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



module.exports = {  
    database, 
    Users, 
    Contacts,
    ActiveUsers
};
