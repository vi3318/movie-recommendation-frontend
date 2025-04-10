import axios from 'axios';
import authService from './authService';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const recommendationService = {
  getPersonalizedRecommendations: async () => {
    try {
      const token = authService.getToken();
      const user = authService.getCurrentUser();
      if (!user || !user.id) {
        throw new Error('User not authenticated');
      }
      
      const response = await axios.get(`${API_URL}/api/recommendations/users/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getRecommendationsByGenre: async () => {
    try {
      const token = authService.getToken();
      const user = authService.getCurrentUser();
      if (!user || !user.id) {
        throw new Error('User not authenticated');
      }
      
      const response = await axios.get(`${API_URL}/api/recommendations/users/${user.id}/genre`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getRecommendationsByRating: async () => {
    try {
      const token = authService.getToken();
      const user = authService.getCurrentUser();
      if (!user || !user.id) {
        throw new Error('User not authenticated');
      }
      
      const response = await axios.get(`${API_URL}/api/recommendations/users/${user.id}/rating`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getRecommendationsBySimilarUsers: async () => {
    try {
      const token = authService.getToken();
      const user = authService.getCurrentUser();
      if (!user || !user.id) {
        throw new Error('User not authenticated');
      }
      
      const response = await axios.get(`${API_URL}/api/recommendations/users/${user.id}/similar-users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getSimilarMovies: async (movieId) => {
    try {
      const token = authService.getToken();
      const response = await axios.get(`${API_URL}/api/recommendations/similar/${movieId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getTrendingMovies: async () => {
    try {
      const token = authService.getToken();
      const response = await axios.get(`${API_URL}/api/recommendations/trending`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default recommendationService; 