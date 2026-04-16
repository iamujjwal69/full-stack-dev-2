import axios from 'axios';

// Base URL for the backend API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Create a centralized axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach the JWT token from sessionStorage
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('jwtToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Requirement 4
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API Service Methods
const apiService = {
  // Login method
  login: async (username, password) => {
    try {
      const response = await api.post('/api/auth/login', { username, password }); // Requirement 3
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Protected data fetch
  getProtectedData: async () => {
    try {
      const response = await api.get('/api/auth/protected'); // Requirement 4
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Failed to fetch protected data');
    }
  },
};

export default apiService;
