import axios from 'axios';
import { API_ENDPOINTS, getAuthHeader } from '../config/api';

const movieService = {
  // Get all movies
  getAllMovies: async () => {
    const response = await axios.get(API_ENDPOINTS.MOVIES, {
      headers: getAuthHeader(),
    });
    return response.data;
  },

  // Get movie details
  getMovieDetails: async (movieId) => {
    const response = await axios.get(API_ENDPOINTS.MOVIE_DETAILS(movieId), {
      headers: getAuthHeader(),
    });
    return response.data;
  },

  // Get movies by language preferences
  getMoviesByLanguage: async (languages) => {
    const response = await axios.post(
      API_ENDPOINTS.MOVIES_BY_LANGUAGE,
      { languages },
      {
        headers: getAuthHeader(),
      }
    );
    return response.data;
  },

  // Get movie recommendations
  getRecommendations: async (userId) => {
    const response = await axios.get(API_ENDPOINTS.RECOMMENDATIONS(userId), {
      headers: getAuthHeader(),
    });
    return response.data;
  },

  // Add movie to watchlist
  addToWatchlist: async (movieId) => {
    const response = await axios.post(
      API_ENDPOINTS.WATCHLIST_ADD(movieId),
      {},
      {
        headers: getAuthHeader(),
      }
    );
    return response.data;
  },

  // Remove movie from watchlist
  removeFromWatchlist: async (movieId) => {
    const response = await axios.delete(API_ENDPOINTS.WATCHLIST_REMOVE(movieId), {
      headers: getAuthHeader(),
    });
    return response.data;
  },

  // Get user's watchlist
  getWatchlist: async () => {
    const response = await axios.get(API_ENDPOINTS.WATCHLIST, {
      headers: getAuthHeader(),
    });
    return response.data;
  },
};

export default movieService; 