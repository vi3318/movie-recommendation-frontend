import axios from 'axios';
import authService from './authService';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const reviewService = {
  getAllReviews: async () => {
    try {
      const token = authService.getToken();
      const response = await axios.get(`${API_URL}/api/reviews`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getReviewById: async (id) => {
    try {
      const token = authService.getToken();
      const response = await axios.get(`${API_URL}/api/reviews/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getReviewsByMovieId: async (movieId) => {
    try {
      const response = await axios.get(`${API_URL}/api/reviews/movie/${movieId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getReviewsByUserId: async (userId) => {
    try {
      const token = authService.getToken();
      const response = await axios.get(`${API_URL}/api/reviews/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getAverageRatingForMovie: async (movieId) => {
    try {
      const response = await axios.get(`${API_URL}/api/reviews/movie/${movieId}/average-rating`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getHighlyRatedReviews: async (minRating) => {
    try {
      const response = await axios.get(`${API_URL}/api/reviews/rating/${minRating}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  createReview: async (review) => {
    try {
      const token = authService.getToken();
      const user = authService.getCurrentUser();
      
      // Add user information to the review
      const reviewWithUser = {
        ...review,
        userId: user.id,
        username: user.username
      };
      
      const response = await axios.post(`${API_URL}/api/reviews`, reviewWithUser, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  updateReview: async (id, updatedReview) => {
    try {
      const token = authService.getToken();
      const response = await axios.put(`${API_URL}/api/reviews/${id}`, updatedReview, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  deleteReview: async (id) => {
    try {
      const token = authService.getToken();
      const response = await axios.delete(`${API_URL}/api/reviews/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default reviewService; 