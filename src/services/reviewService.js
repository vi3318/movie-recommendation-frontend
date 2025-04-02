import axios from 'axios';
import { API_ENDPOINTS, getAuthHeader } from '../config/api';

const reviewService = {
  // Get all reviews for a movie
  getMovieReviews: async (movieId) => {
    const response = await axios.get(API_ENDPOINTS.MOVIE_REVIEWS(movieId), {
      headers: getAuthHeader(),
    });
    return response.data;
  },

  // Get user's reviews
  getUserReviews: async (userId) => {
    const response = await axios.get(API_ENDPOINTS.USER_REVIEWS(userId), {
      headers: getAuthHeader(),
    });
    return response.data;
  },

  // Add a new review
  addReview: async (reviewData) => {
    const response = await axios.post(
      API_ENDPOINTS.REVIEWS,
      reviewData,
      {
        headers: getAuthHeader(),
      }
    );
    return response.data;
  },

  // Update a review
  updateReview: async (reviewId, reviewData) => {
    const response = await axios.put(
      `${API_ENDPOINTS.REVIEWS}/${reviewId}`,
      reviewData,
      {
        headers: getAuthHeader(),
      }
    );
    return response.data;
  },

  // Delete a review
  deleteReview: async (reviewId) => {
    const response = await axios.delete(
      `${API_ENDPOINTS.REVIEWS}/${reviewId}`,
      {
        headers: getAuthHeader(),
      }
    );
    return response.data;
  },
};

export default reviewService; 