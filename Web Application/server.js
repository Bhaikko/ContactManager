const express = require("express");
const server = express();

server.set("view engine", "hbs");
server.use(express.json());
server.use(express.urlencoded({extended: true}));

let port = 4000;
server.listen(port, () => console.log("Server Up And Running On 127.0.0.1:" + port));
