import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DailySummary = () => {
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    // Fetch the daily summary from the backend
    axios.get('http://localhost:5000/api/weather/daily-summary')
      .then(response => {
        setSummary(response.data);
      })
      .catch(error => {
        console.error('Error fetching daily summary:', error);
      });
  }, []);

  return (
    <div>
      <h2>Daily Weather Summary</h2>
      <div className="summary-grid">
        {summary.map((citySummary, index) => (
          <div key={index} className="summary-card">
            <h3>{citySummary._id}</h3>
            <p>Avg Temp: {citySummary.avgTemp.toFixed(2)}°C</p>
            <p>Max Temp: {citySummary.maxTemp}°C</p>
            <p>Min Temp: {citySummary.minTemp}°C</p>
            <p>Dominant Condition: {citySummary.dominantCondition}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailySummary;
