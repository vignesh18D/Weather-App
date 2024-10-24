// backend/routes/weather.js
const express = require('express');
const router = express.Router();
const axios = require('axios');
const Weather = require('../models/Weather'); // Import the Weather model

let alertThreshold = { temp: 35 }; // Default threshold for temperature

router.post('/set-alert', (req, res) => {
    const { temp } = req.body;
    alertThreshold.temp = temp;
    res.send(`Alert threshold set to ${temp}°C`);
});

router.get('/check-alerts', async(req, res) => {
    try {
        const latestWeather = await Weather.find().sort({ timestamp: -1 }).limit(cities.length);
        const alerts = latestWeather.filter(entry => entry.temp > alertThreshold.temp);

        if (alerts.length > 0) {
            res.json({ message: `Alert: Temperature exceeded ${alertThreshold.temp}°C`, alerts });
        } else {
            res.json({ message: 'No alerts' });
        }
    } catch (error) {
        res.status(500).send('Error checking alerts');
    }
});


// OpenWeatherMap API details
const apiKey = '22f5131085b2c112f358d6577f7b2dd5'; // Replace with your OpenWeatherMap API key
const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
const units = 'metric'; // Use metric units for temperature in Celsius



// GET: Fetch current weather data for cities and save it to MongoDB
router.get('/current', async(req, res) => {
    try {
        const weatherData = await Promise.all(cities.map(async city => {
            const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`);
            const weather = response.data;

            // Save the fetched weather data to MongoDB
            const weatherEntry = new Weather({
                city: weather.name,
                temp: weather.main.temp,
                feels_like: weather.main.feels_like,
                main: weather.weather[0].main, // Main weather condition
                timestamp: weather.dt // Unix timestamp from OpenWeatherMap
            });

            await weatherEntry.save(); // Save to MongoDB

            return weather; // Return the fetched weather data
        }));

        res.json(weatherData); // Respond with the fetched weather data
    } catch (error) {
        res.status(500).send('Error fetching weather data');
    }
});

// GET: Fetch daily summary (aggregated data)
router.get('/daily-summary', async(req, res) => {
    try {
        // Get the start of the current day (Unix timestamp)
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set time to midnight (start of the day)

        // MongoDB aggregation pipeline
        const dailySummary = await Weather.aggregate([{
                $match: { timestamp: { $gte: Math.floor(today.getTime() / 1000) } } // Match today's data
            },
            {
                $group: {
                    _id: "$city", // Group by city
                    avgTemp: { $avg: "$temp" }, // Calculate average temperature
                    maxTemp: { $max: "$temp" }, // Calculate maximum temperature
                    minTemp: { $min: "$temp" }, // Calculate minimum temperature
                    dominantCondition: { $first: "$main" } // Simplified for now: pick first condition
                }
            }
        ]);

        // Return the aggregated results
        res.json(dailySummary);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error fetching daily summary');
    }
});
module.exports = router;