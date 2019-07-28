const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:5000";

module.exports.connectdb = function(database)
{
    return MongoClient.connect(url)
    .then(function(client)
    {
        return client.db(database);
    });
};