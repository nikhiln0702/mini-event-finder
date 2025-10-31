import axios from 'axios';

// The base URL for your backend API
// This is the URL of your Node.js server
const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Define API functions
export const getAllEvents = (location) => {
  return api.get('/events', { params: { location } });
};

export const getEventById = (id) => {
  return api.get(`/events/${id}`);
};

export const createEvent = (eventData) => {
  return api.post('/events', eventData);
};

// You can add update/delete functions here later