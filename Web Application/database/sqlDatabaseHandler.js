// In The End I Guess
// Will be using mySql Though with sequelize and mysql

const Sequelize = require("sequelize");

const database = new Sequelize("contactmanager", "contactManagerAdmin", "123456",{
    host: "localhost",
    port: 3306,
    dialect: "mysql",
    logging: false 
});

const Users = database.define("users", {
    username: {
        type: Sequelize.STRING,
        allowNull: false, 
        primaryKey: true 
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false 
    }
});

module.exports = {  database, Users};
