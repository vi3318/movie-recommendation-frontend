import axios from 'axios';
import authService from './authService';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const movieService = {
  getAllMovies: async () => {
    try {
      const response = await axios.get(`${API_URL}/api/movies`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getMovieById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/api/movies/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  searchMovies: async (searchParams) => {
    try {
      const response = await axios.get(`${API_URL}/api/movies/search`, {
        params: searchParams
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  searchByTitle: async (title) => {
    try {
      const response = await axios.get(`${API_URL}/api/movies/search`, {
        params: { title }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  searchByGenres: async (genres) => {
    try {
      const response = await axios.get(`${API_URL}/api/movies/search`, {
        params: { genres }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  searchByDirector: async (director) => {
    try {
      const response = await axios.get(`${API_URL}/api/movies/search`, {
        params: { director }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  searchByActors: async (actors) => {
    try {
      const response = await axios.get(`${API_URL}/api/movies/search`, {
        params: { actors }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  searchByReleaseYear: async (releaseYear) => {
    try {
      const response = await axios.get(`${API_URL}/api/movies/search`, {
        params: { releaseYear }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  addMovie: async (movie) => {
    try {
      const token = authService.getToken();
      const response = await axios.post(`${API_URL}/api/movies`, movie, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  updateMovie: async (id, movie) => {
    try {
      const token = authService.getToken();
      const response = await axios.put(`${API_URL}/api/movies/${id}`, movie, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  deleteMovie: async (id) => {
    try {
      const token = authService.getToken();
      const response = await axios.delete(`${API_URL}/api/movies/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get movie details
  getMovieDetails: async (movieId) => {
    try {
      const token = authService.getToken();
      const response = await axios.get(`${API_URL}/api/movies/${movieId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get movies by genre
  getMoviesByGenre: async (genre, page = 1, limit = 20) => {
    try {
      const token = authService.getToken();
      const response = await axios.get(`${API_URL}/api/movies/genre/${genre}`, {
        params: { page, limit },
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get movies by language preferences
  getMoviesByLanguage: async (languages, page = 1, limit = 20) => {
    try {
      const token = authService.getToken();
      const response = await axios.get(`${API_URL}/api/movies/language`, {
        params: { languages: languages.join(','), page, limit },
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get movie recommendations
  getRecommendations: async (userId) => {
    const response = await axios.get(API_URL + `/api/movies/recommendations/${userId}`, {
      headers: { Authorization: `Bearer ${authService.getToken()}` }
    });
    return response.data;
  },

  // Add movie to watchlist
  addToWatchlist: async (movieId) => {
    try {
      const token = authService.getToken();
      const response = await axios.post(
        `${API_URL}/api/movies/watchlist/${movieId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Remove movie from watchlist
  removeFromWatchlist: async (movieId) => {
    try {
      const token = authService.getToken();
      const response = await axios.delete(
        `${API_URL}/api/movies/watchlist/${movieId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get user's watchlist
  getWatchlist: async () => {
    try {
      const token = authService.getToken();
      const response = await axios.get(`${API_URL}/api/movies/watchlist`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default movieService; 