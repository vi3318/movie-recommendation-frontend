import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const authService = {
  register: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/api/users/register`, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/api/users/login`, credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  updateProfile: async (userData) => {
    try {
      const token = authService.getToken();
      const response = await axios.put(`${API_URL}/api/users/profile`, userData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  updatePreferences: async (genre) => {
    try {
      const token = authService.getToken();
      const response = await axios.post(`${API_URL}/api/users/genres`, { genre }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  addToWatchHistory: async (movieId) => {
    try {
      const token = authService.getToken();
      const response = await axios.post(`${API_URL}/api/users/watchhistory`, { movieId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getWatchHistory: async () => {
    try {
      const token = authService.getToken();
      const response = await axios.get(`${API_URL}/api/users/watchhistory`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default authService; 