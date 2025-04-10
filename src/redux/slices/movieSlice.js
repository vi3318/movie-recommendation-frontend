import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

// Fetch all movies
export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().user;
      const response = await axios.get(`${API_URL}/api/movies`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch movies');
    }
  }
);

// Fetch movie by ID
export const fetchMovieById = createAsyncThunk(
  'movies/fetchMovieById',
  async (movieId, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().user;
      const response = await axios.get(`${API_URL}/api/movies/${movieId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch movie');
    }
  }
);

// Search movies
export const searchMovies = createAsyncThunk(
  'movies/searchMovies',
  async (searchParams, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().user;
      const response = await axios.get(`${API_URL}/api/movies/search`, {
        params: searchParams,
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to search movies');
    }
  }
);

// Fetch recommendations for user
export const fetchRecommendations = createAsyncThunk(
  'movies/fetchRecommendations',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token, user } = getState().user;
      const response = await axios.get(`${API_URL}/api/recommendations/users/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch recommendations');
    }
  }
);

// Fetch recommendations by genre
export const fetchRecommendationsByGenre = createAsyncThunk(
  'movies/fetchRecommendationsByGenre',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token, user } = getState().user;
      const response = await axios.get(`${API_URL}/api/recommendations/users/${user.id}/genre`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch genre recommendations');
    }
  }
);

// Fetch recommendations by rating
export const fetchRecommendationsByRating = createAsyncThunk(
  'movies/fetchRecommendationsByRating',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token, user } = getState().user;
      const response = await axios.get(`${API_URL}/api/recommendations/users/${user.id}/rating`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch rating recommendations');
    }
  }
);

// Fetch recommendations by similar users
export const fetchRecommendationsBySimilarUsers = createAsyncThunk(
  'movies/fetchRecommendationsBySimilarUsers',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token, user } = getState().user;
      const response = await axios.get(`${API_URL}/api/recommendations/users/${user.id}/similar-users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch similar user recommendations');
    }
  }
);

// Rate a movie
export const rateMovie = createAsyncThunk(
  'movies/rateMovie',
  async ({ movieId, rating }, { getState, rejectWithValue }) => {
    try {
      const { token, user } = getState().user;
      const response = await axios.post(
        `${API_URL}/api/reviews`,
        { movieId, rating, userId: user.id },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to rate movie');
    }
  }
);

// Get movie reviews
export const getMovieReviews = createAsyncThunk(
  'movies/getMovieReviews',
  async (movieId, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().user;
      const response = await axios.get(`${API_URL}/api/reviews/movie/${movieId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch movie reviews');
    }
  }
);

// Get average rating for movie
export const getAverageRating = createAsyncThunk(
  'movies/getAverageRating',
  async (movieId, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().user;
      const response = await axios.get(`${API_URL}/api/reviews/movie/${movieId}/average-rating`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch average rating');
    }
  }
);

const initialState = {
  movies: [],
  currentMovie: null,
  recommendations: [],
  genreRecommendations: [],
  ratingRecommendations: [],
  similarUserRecommendations: [],
  searchResults: [],
  movieReviews: [],
  averageRating: 0,
  loading: false,
  error: null
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
    clearCurrentMovie: (state) => {
      state.currentMovie = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Movies
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Movie by ID
      .addCase(fetchMovieById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentMovie = action.payload;
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Search Movies
      .addCase(searchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Recommendations
      .addCase(fetchRecommendations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecommendations.fulfilled, (state, action) => {
        state.loading = false;
        state.recommendations = action.payload.recommendedMovies || [];
      })
      .addCase(fetchRecommendations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Recommendations by Genre
      .addCase(fetchRecommendationsByGenre.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecommendationsByGenre.fulfilled, (state, action) => {
        state.loading = false;
        state.genreRecommendations = action.payload;
      })
      .addCase(fetchRecommendationsByGenre.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Recommendations by Rating
      .addCase(fetchRecommendationsByRating.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecommendationsByRating.fulfilled, (state, action) => {
        state.loading = false;
        state.ratingRecommendations = action.payload;
      })
      .addCase(fetchRecommendationsByRating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Recommendations by Similar Users
      .addCase(fetchRecommendationsBySimilarUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecommendationsBySimilarUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.similarUserRecommendations = action.payload;
      })
      .addCase(fetchRecommendationsBySimilarUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Rate Movie
      .addCase(rateMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(rateMovie.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(rateMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Movie Reviews
      .addCase(getMovieReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMovieReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.movieReviews = action.payload;
      })
      .addCase(getMovieReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Average Rating
      .addCase(getAverageRating.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAverageRating.fulfilled, (state, action) => {
        state.loading = false;
        state.averageRating = action.payload;
      })
      .addCase(getAverageRating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError, clearSearchResults, clearCurrentMovie } = movieSlice.actions;
export default movieSlice.reducer; 