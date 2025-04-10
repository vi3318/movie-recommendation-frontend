import axios from 'axios';
import bollywoodMovies from './bollywoodMovies';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

/**
 * Adds all Bollywood movies to the Movie Catalog Service
 * @param {string} token - JWT authentication token
 * @returns {Promise<Array>} - Array of added movies
 */
export const addMoviesToCatalog = async (token) => {
  try {
    const addedMovies = [];
    
    for (const movie of bollywoodMovies) {
      try {
        const response = await axios.post(
          `${API_URL}/api/movies`,
          movie,
          {
            headers: { 
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        
        addedMovies.push(response.data);
        console.log(`Added movie: ${movie.title}`);
      } catch (error) {
        console.error(`Failed to add movie ${movie.title}:`, error.response?.data || error.message);
      }
    }
    
    return addedMovies;
  } catch (error) {
    console.error('Error adding movies to catalog:', error);
    throw error;
  }
};

/**
 * Adds a single movie to the Movie Catalog Service
 * @param {Object} movie - Movie object to add
 * @param {string} token - JWT authentication token
 * @returns {Promise<Object>} - Added movie
 */
export const addMovieToCatalog = async (movie, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/movies`,
      movie,
      {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log(`Added movie: ${movie.title}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to add movie ${movie.title}:`, error.response?.data || error.message);
    throw error;
  }
};

export default {
  addMoviesToCatalog,
  addMovieToCatalog
}; 