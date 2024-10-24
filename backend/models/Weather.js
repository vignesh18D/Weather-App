// backend/models/Weather.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WeatherSchema = new Schema({
    city: { type: String, required: true },
    temp: { type: Number, required: true },
    feels_like: { type: Number },
    main: { type: String },
    timestamp: { type: Number, required: true } // Unix timestamp for the data
});

module.exports = mongoose.model('Weather', WeatherSchema);