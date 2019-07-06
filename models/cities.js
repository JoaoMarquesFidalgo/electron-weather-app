const mongoose = require('../config/config').mongoose;

const CitiesSchema = new mongoose.Schema({
    coordinates: [Number],
    name: String,
    geometry: Object
});

module.exports = mongoose.model("Cities", CitiesSchema, "cities");
