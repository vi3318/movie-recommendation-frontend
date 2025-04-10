import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth Service API
export const authApi = {
  login: (credentials) => api.post('/api/users/login', credentials),
  register: (userData) => api.post('/api/users/register', userData),
  forgotPassword: (email) => api.post('/api/users/forgot-password', { email }),
  resetPassword: (token, password) =>
    api.post('/api/users/reset-password', { token, password }),
  verifyEmail: (token) => api.post('/api/users/verify-email', { token }),
  refreshToken: () => api.post('/api/users/refresh-token'),
  logout: () => api.post('/api/users/logout'),
};

// Movie Service API
export const movieApi = {
  getMovies: (params) => api.get('/api/movies', { params }),
  getMovieById: (id) => api.get(`/api/movies/${id}`),
  searchMovies: (query) => api.get('/api/movies/search', { params: { query } }),
  searchByGenre: (genres) => api.get('/api/movies/search', { params: { genres } }),
  searchByDirector: (director) => api.get('/api/movies/search', { params: { director } }),
  searchByActors: (actors) => api.get('/api/movies/search', { params: { actors } }),
  searchByReleaseYear: (year) => api.get('/api/movies/search', { params: { releaseYear: year } }),
};

// User Service API
export const userApi = {
  getProfile: () => api.get('/api/users/profile'),
  updateProfile: (data) => api.put('/api/users/profile', data),
  addToWatchHistory: (movieId) => api.post('/api/users/watchhistory', { movieId }),
  getWatchHistory: () => api.get('/api/users/watchhistory'),
  addPreferredGenre: (genre) => api.post('/api/users/genres', { genre }),
};

// Review Service API
export const reviewApi = {
  getMovieReviews: (movieId) => api.get(`/api/reviews/movie/${movieId}`),
  getUserReviews: (userId) => api.get(`/api/reviews/user/${userId}`),
  createReview: (review) => api.post('/api/reviews', review),
  updateReview: (reviewId, data) => api.put(`/api/reviews/${reviewId}`, data),
  deleteReview: (reviewId) => api.delete(`/api/reviews/${reviewId}`),
  getAverageRating: (movieId) => api.get(`/api/reviews/movie/${movieId}/average-rating`),
};

// Recommendation Service API
export const recommendationApi = {
  getRecommendationsForUser: (userId) => api.get(`/api/recommendations/users/${userId}`),
  getRecommendationsByGenre: (userId) => api.get(`/api/recommendations/users/${userId}/genre`),
  getRecommendationsByRating: (userId) => api.get(`/api/recommendations/users/${userId}/rating`),
  getRecommendationsBySimilarUsers: (userId) => api.get(`/api/recommendations/users/${userId}/similar-users`),
};

export default api; 