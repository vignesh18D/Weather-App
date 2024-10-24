# Weather App - Real-Time Weather Monitoring System

## Overview
The Weather App is a real-time data processing system that monitors weather conditions for major Indian cities. It fetches weather data from the OpenWeatherMap API at regular intervals, processes the data, and provides insights like daily summaries and weather alerts based on user-defined thresholds.

## Features
- Fetch real-time weather data for multiple cities.
- Convert temperatures from Kelvin to Celsius.
- Aggregate daily weather data (average, maximum, minimum temperatures).
- Set and monitor temperature thresholds, triggering alerts when exceeded.

## Project Structure

weather-app/ ├── public/ │   ├── index.html             # Main HTML file ├── src/ │   ├── components/            # Reusable UI components │   ├── App.js                 # Main application component │   ├── index.js               # Entry point for React │   ├── styles/                # CSS styles

## Technologies Used
- React.js for building the user interface.
- Axios for making HTTP requests to the weather API.
- OpenWeatherMap API for fetching real-time weather data.

## Installation

### Prerequisites
- Node.js installed on your system.
- A free OpenWeatherMap API Key.

### Steps

1. Clone the Repository:
   `bash
   git clone <[repository-url](https://github.com/vignesh18D/Weather-App)>

2. Navigate to the Weather App Directory:

cd weather-app


3. Install Dependencies:

npm install


4. Create a .env File: Create a .env file in the root directory with the following:

REACT_APP_WEATHER_API_KEY=<your-api-key>


5. Start the Application:

npm start


The application will run at http://localhost:5000.



Key Features

Weather Data Fetching:

The app retrieves real-time weather data for Indian metros (Delhi, Mumbai, Chennai, Bangalore, Kolkata, Hyderabad) at 5-minute intervals.

Temperature Conversion:

The system converts temperature from Kelvin (API default) to Celsius.

Daily Summaries:

Daily summaries include average, maximum, and minimum temperatures along with the dominant weather condition.

Alerts:

Users can set configurable thresholds, and the app will trigger alerts if certain conditions (like high temperature) are met.

Future Improvements

Extend support to additional weather parameters like humidity and wind speed.

Add visualizations for weather trends and forecasts.


API Key

You can get an API key by signing up on the OpenWeatherMap API website.

---

These README files are formatted for use in each project. You can modify or expand them based on any specific requirements for the submission or additional project features you may want to highlight. Let me know if you need further customization!
