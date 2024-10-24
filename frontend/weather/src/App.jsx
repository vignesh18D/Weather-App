import React from 'react';
import WeatherDashboard from './components/WeatherDashboard';
import DailySummary from './components/DailySummary';
import AlertSettings from './components/AlertSettings';
import './global.css';

const App = () => {
  return (
    <div className="app">
      <h1>Weather Monitoring App</h1>
      <WeatherDashboard />
      <DailySummary />
      <AlertSettings />
    </div>
  );
};

export default App;
