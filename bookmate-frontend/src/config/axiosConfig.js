import axios from 'axios';

/**
 * Axios configuration for API calls
 * Automatically uses the current host for API requests
 */

// Get the base URL based on current environment
const getBaseURL = () => {
  // If we're on localhost:3000 (dev), use http://localhost:8080
  if (window.location.hostname === 'localhost' && window.location.port === '3000') {
    return 'http://localhost:8080';
  }
  
  // For production, use the current host with port 8081
  // e.g., http://44.197.73.97:8081
  return `http://${window.location.hostname}:8081`;
};

// Create axios instance with default base URL
const axiosInstance = axios.create({
  baseURL: getBaseURL(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Log the base URL for debugging
console.log('API Base URL:', getBaseURL());

export default axiosInstance;
