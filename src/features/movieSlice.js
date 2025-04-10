import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { movieApi, userApi } from '../services/api';

// Async thunks
export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (params, { rejectWithValue }) => {
    try {
      const response = await movieApi.getMovies(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch movies');
    }
  }
);

export const fetchMovieDetails = createAsyncThunk(
  'movies/fetchMovieDetails',
  async (id, { rejectWithValue }) => {
    try {
      const response = await movieApi.getMovieById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch movie details');
    }
  }
);

export const addToWatchlist = createAsyncThunk(
  'movies/addToWatchlist',
  async (movieId, { rejectWithValue }) => {
    try {
      await userApi.addToWatchlist(movieId);
      return movieId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add to watchlist');
    }
  }
);

export const removeFromWatchlist = createAsyncThunk(
  'movies/removeFromWatchlist',
  async (movieId, { rejectWithValue }) => {
    try {
      await userApi.removeFromWatchlist(movieId);
      return movieId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to remove from watchlist');
    }
  }
);

export const fetchWatchlist = createAsyncThunk(
  'movies/fetchWatchlist',
  async (_, { rejectWithValue }) => {
    try {
      const response = await userApi.getWatchlist();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch watchlist');
    }
  }
);

const initialState = {
  movies: [],
  currentMovie: null,
  watchlist: [],
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
        state.error = action.payload;
      })
      // Add to Watchlist
      .addCase(addToWatchlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToWatchlist.fulfilled, (state, action) => {
        state.loading = false;
        if (!state.watchlist.includes(action.payload)) {
          state.watchlist.push(action.payload);
        }
      })
      .addCase(addToWatchlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Remove from Watchlist
      .addCase(removeFromWatchlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromWatchlist.fulfilled, (state, action) => {
        state.loading = false;
        state.watchlist = state.watchlist.filter(id => id !== action.payload);
      })
      .addCase(removeFromWatchlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Watchlist
      .addCase(fetchWatchlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWatchlist.fulfilled, (state, action) => {
        state.loading = false;
        state.watchlist = action.payload;
      })
      .addCase(fetchWatchlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = movieSlice.actions;
export default movieSlice.reducer; 