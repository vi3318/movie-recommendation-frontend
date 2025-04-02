import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import movieService from '../../services/movieService';

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (_, { rejectWithValue }) => {
    try {
      return await movieService.getAllMovies();
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchMoviesByLanguage = createAsyncThunk(
  'movies/fetchMoviesByLanguage',
  async (languages, { rejectWithValue }) => {
    try {
      return await movieService.getMoviesByLanguage(languages);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchMovieDetails = createAsyncThunk(
  'movies/fetchMovieDetails',
  async (movieId, { rejectWithValue }) => {
    try {
      return await movieService.getMovieDetails(movieId);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchRecommendations = createAsyncThunk(
  'movies/fetchRecommendations',
  async (userId, { rejectWithValue }) => {
    try {
      return await movieService.getRecommendations(userId);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addToWatchlist = createAsyncThunk(
  'movies/addToWatchlist',
  async (movieId, { rejectWithValue }) => {
    try {
      return await movieService.addToWatchlist(movieId);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeFromWatchlist = createAsyncThunk(
  'movies/removeFromWatchlist',
  async (movieId, { rejectWithValue }) => {
    try {
      return await movieService.removeFromWatchlist(movieId);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  movies: [],
  currentMovie: null,
  recommendations: [],
  loading: false,
  error: null,
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedMovie: (state) => {
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
        state.error = action.payload?.message || 'Failed to fetch movies';
      })
      // Fetch Movies by Language
      .addCase(fetchMoviesByLanguage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMoviesByLanguage.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMoviesByLanguage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch movies by language';
      })
      // Fetch Movie Details
      .addCase(fetchMovieDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentMovie = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch movie details';
      })
      // Fetch Recommendations
      .addCase(fetchRecommendations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecommendations.fulfilled, (state, action) => {
        state.loading = false;
        state.recommendations = action.payload;
      })
      .addCase(fetchRecommendations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch recommendations';
      })
      // Add to Watchlist
      .addCase(addToWatchlist.fulfilled, (state, action) => {
        const movie = state.movies.find((m) => m.id === action.payload.movieId);
        if (movie) {
          movie.isInWatchlist = true;
        }
        if (state.currentMovie?.id === action.payload.movieId) {
          state.currentMovie.isInWatchlist = true;
        }
      })
      // Remove from Watchlist
      .addCase(removeFromWatchlist.fulfilled, (state, action) => {
        const movie = state.movies.find((m) => m.id === action.payload.movieId);
        if (movie) {
          movie.isInWatchlist = false;
        }
        if (state.currentMovie?.id === action.payload.movieId) {
          state.currentMovie.isInWatchlist = false;
        }
      });
  },
});

export const { clearError, clearSelectedMovie } = movieSlice.actions;
export default movieSlice.reducer; 