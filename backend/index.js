// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const weatherRoute = require('./routes/weather');
const cron = require('node-cron');
const cors = require('cors');

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/api/weather', weatherRoute);

cron.schedule('*/5 * * * *', () => {
    axios.get('http://localhost:5000/api/weather/current')
        .then(response => console.log('Weather data fetched and saved'))
        .catch(error => console.log('Error fetching weather data', error));
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/weatherDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected')).catch(err => console.log(err));

// Basic route
app.get('/', (req, res) => {
    res.send('Weather Monitoring API is running');
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));