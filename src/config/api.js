export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
export const AUTH_SERVICE_URL = import.meta.env.VITE_AUTH_SERVICE_URL || 'http://localhost:8081';
export const MOVIE_SERVICE_URL = import.meta.env.VITE_MOVIE_SERVICE_URL || 'http://localhost:8082';
export const RECOMMENDATION_SERVICE_URL = import.meta.env.VITE_RECOMMENDATION_SERVICE_URL || 'http://localhost:8083';
export const REVIEW_SERVICE_URL = import.meta.env.VITE_REVIEW_SERVICE_URL || 'http://localhost:8084';

export const API_ENDPOINTS = {
  // Auth Service Endpoints
  LOGIN: `${AUTH_SERVICE_URL}/api/auth/login`,
  REGISTER: `${AUTH_SERVICE_URL}/api/auth/register`,
  PREFERENCES: `${AUTH_SERVICE_URL}/api/users/preferences`,
  
  // Movie Service Endpoints
  MOVIES: `${MOVIE_SERVICE_URL}/api/movies`,
  MOVIE_DETAILS: (id) => `${MOVIE_SERVICE_URL}/api/movies/${id}`,
  MOVIES_BY_LANGUAGE: `${MOVIE_SERVICE_URL}/api/movies/language`,
  
  // Recommendation Service Endpoints
  RECOMMENDATIONS: (userId) => `${RECOMMENDATION_SERVICE_URL}/api/recommendations/${userId}`,
  
  // Review Service Endpoints
  REVIEWS: `${REVIEW_SERVICE_URL}/api/reviews`,
  MOVIE_REVIEWS: (movieId) => `${REVIEW_SERVICE_URL}/api/reviews/movie/${movieId}`,
  USER_REVIEWS: (userId) => `${REVIEW_SERVICE_URL}/api/reviews/user/${userId}`,
  
  // Watchlist Endpoints
  WATCHLIST: `${MOVIE_SERVICE_URL}/api/watchlist`,
  WATCHLIST_ADD: (movieId) => `${MOVIE_SERVICE_URL}/api/watchlist/${movieId}`,
  WATCHLIST_REMOVE: (movieId) => `${MOVIE_SERVICE_URL}/api/watchlist/${movieId}`,
};

export const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}; 