import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloud, faCloudRain, faSnowflake } from '@fortawesome/free-solid-svg-icons';

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/weather/current')
      .then(response => setWeatherData(response.data))
      .catch(error => console.error('Error fetching weather data:', error));
  }, []);

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'Clear':
        return faSun;
      case 'Clouds':
        return faCloud;
      case 'Rain':
        return faCloudRain;
      case 'Snow':
        return faSnowflake;
      default:
        return faCloud;
    }
  };

  return (
    <div>
      <h2>Current Weather Data</h2>
      <div className="weather-grid">
        {weatherData.map((cityWeather, index) => (
          <div key={index} className="weather-card">
            <h3>{cityWeather.name}</h3>
            <FontAwesomeIcon icon={getWeatherIcon(cityWeather.weather[0].main)} size="3x" />
            <p>Temperature: {cityWeather.main.temp}°C</p>
            <p>Feels Like: {cityWeather.main.feels_like}°C</p>
            <p>Condition: {cityWeather.weather[0].main}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherDashboard;
