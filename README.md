# ContactManager
ContactManager or known as 'Contapps' where you can store your contacts, have a funny picture of them and text them whenever you want. A user is required to sign-up on the site to have access to the features such as Having their personal contacts, texting them. Happy Texting :)


## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites
Before running the server on your local machine, following *npm packages* must be installed in the same directory where you have cloned the project.

*requirements*
* [nodejs](https://nodejs.org)
* npm
* [mysql](https://www.mysql.com)
* [mongodb](https://www.mongodb.com)

*npm packages*
* [connect-mongo](https://www.npmjs.com/package/connect-mongo)
* [cookie-parser](https://www.npmjs.com/package/cookie-parser)
* [express](https://www.npmjs.com/package/express)
* [express-session](https://www.npmjs.com/package/express-session)
* [hbs](https://www.npmjs.com/package/hbs)
* [mongodb](https://www.npmjs.com/package/mongodb)
* [multer](https://www.npmjs.com/package/multer)
* [mysql2](https://www.npmjs.com/package/mysql2)
* [passport](https://www.npmjs.com/package/passport)
* [passport-local](https://www.npmjs.com/package/passport-local)
* [passport.socketio](https://www.npmjs.com/package/passport.socketio)
* [sequelize](https://www.npmjs.com/package/sequelize)
* [socket.io](https://www.npmjs.com/package/socket.io)

You can install them manually or run the following command
```
  npm install
```
*Database*
* mysql - For storing Users, Contacts, and Messages.
* mongodb - For storing Sessions, and Issues.

## Database Usage
For mongodb, excute the following commands in root directory of ContactManager Folder
```
  cd "Web Application"/database
  mongod --dbpath=./ --port=5000
```
*Note: The port above can be whatever you assign*

For mysql, To create a database
```
  create database "contactmanager";
  create user "contactManagerAdmin" identified by "123456";
  use contactmanager;
  GRANT ALL PRIVILEGES ON contactmanager.* to "contactManagerAdmin";
  FLUSH PRIVILEGES;
  
```
*Note: These are default credentials hardcoded inside ContactManager/Web Application/database/sqlDatabase.js and can be changed. All the above commands must be executed as root user of mysql*

## Running The Server On Your Machine
```
  cd "Web Application"
  node server.js
```
*Note: The default port, the website runs on is 4000 and can be changed in server.js"

## Adding Admin
Admins can be added using the *addAdmin* inside ContactManager/Web Application/database/sqlDatabaseHandler.js.
The issues can be accessed by loggin through /admin 

## Screenshots
### Homepage
<img src="https://github.com/Bhaikko/ContactManager/blob/master/Screenshots/Homepage.png"
     style="float: left; margin-right: 10px;"/>
     
### Profile
<img src="https://github.com/Bhaikko/ContactManager/blob/master/Screenshots/Profile.png"
     style="float: left; margin-right: 10px;"/>
     
### Contact
<img src="https://github.com/Bhaikko/ContactManager/blob/master/Screenshots/Contacts.png"
     style="float: left; margin-right: 10px;"/>
     
### Issues
<img src="https://github.com/Bhaikko/ContactManager/blob/master/Screenshots/Issues.png"
     style="float: left; margin-right: 10px;"/>

