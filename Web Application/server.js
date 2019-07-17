const express = require("express");
const server = express();

server.set("view engine", "hbs");
server.use(express.json());
server.use(express.urlencoded({extended: true}));

server.use("/", express.static("./public"));
// server.use("/", express.static("./images"));
server.use("/login", express.static("./public/login.html"));
server.use("/aboutUs", express.static("./public/aboutUs.html"));

let port = 4000;
server.listen(port, () => console.log("Server Up And Running On 127.0.0.1:" + port));
