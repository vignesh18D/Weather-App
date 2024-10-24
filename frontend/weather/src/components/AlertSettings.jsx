import React, { useState } from 'react';
import axios from 'axios';

const AlertSettings = () => {
  const [threshold, setThreshold] = useState(35);
  const [message, setMessage] = useState('');

  const handleSetAlert = () => {
    axios.post('http://localhost:5000/api/weather/set-alert', { temp: threshold })
      .then(response => setMessage(response.data))
      .catch(error => console.error('Error setting alert threshold:', error));
  };

  return (
    <div>
      <h2>Set Alert Threshold</h2>
      <div className="alert-settings">
        <input
          type="number"
          value={threshold}
          onChange={(e) => setThreshold(e.target.value)}
          className="alert-input"
          placeholder="Enter temperature threshold"
        />
        <button onClick={handleSetAlert}>Set Threshold</button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AlertSettings;
