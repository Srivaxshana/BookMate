import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';  // Add this line
import './App.css';
import App from './App';

import axios from 'axios';

// Configure axios for all API calls
const getBaseURL = () => {
  if (window.location.hostname === 'localhost' && window.location.port === '3000') {
    return 'http://localhost:8080';
  }
  return `http://${window.location.hostname}:8081`;
};

axios.defaults.baseURL = getBaseURL();
console.log('Configured API Base URL:', getBaseURL());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
