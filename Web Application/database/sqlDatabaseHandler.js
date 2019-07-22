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

function addUser(username, password, mobile)
{
    return Users.findOne({
        username
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

module.exports = {  database, Users, addUser};
