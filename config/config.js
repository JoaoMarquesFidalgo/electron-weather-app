const mongoose = require('mongoose');

const config = {
    environment: process.env.NODE_ENV,
    port: "",
    mongooseUrl: ""
}

switch (config.environment)
{
    case "qa":
        // to do
        break;
    case "production":
        // to do
        break;
    default:
        config.port = 10010;
        config.mongooseUrl = "mongodb://127.0.0.1:27017/electron_app";
        config.url = "http://localhost:10010/",
        config.requireUrl = "./";
        config.accessToken = 'pk.eyJ1IjoiZWxlY3RyaWNtb29uIiwiYSI6ImNqeG1zb2E1YzAyemEzY252YzVkYThtMTcifQ.DQe4E2O-FE8hAysN3S2bgw'
        break;
}

mongoose.connect(config.mongooseUrl);

module.exports = {config, mongoose};
