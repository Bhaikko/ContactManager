const MongoClient = require("mongodb").MongoClient;

const mongoPort = process.env.PORT || 5000;
const url = "mongodb://localhost:" + mongoPort;

module.exports.connectdb = function(database)
{
    return MongoClient.connect(url)
    .then(function(client)
    {
        return client.db(database);
    });
};