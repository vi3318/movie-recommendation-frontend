import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

// Register user
export const register = createAsyncThunk(
  'user/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/register`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Registration failed');
    }
  }
);

// Login user
export const login = createAsyncThunk(
  'user/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, credentials);
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Login failed');
    }
  }
);

// Get user profile
export const getUserProfile = createAsyncThunk(
  'user/getProfile',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().user;
      const response = await axios.get(`${API_URL}/api/users/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch user profile');
    }
  }
);

// Update user profile
export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (userData, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().user;
      const response = await axios.put(`${API_URL}/api/users/profile`, userData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update user profile');
    }
  }
);

// Get user preferences
export const getUserPreferences = createAsyncThunk(
  'user/getPreferences',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token, user } = getState().user;
      const response = await axios.get(`${API_URL}/api/users/${user.id}/preferences`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch user preferences');
    }
  }
);

// Set user preferences
export const setUserPreferences = createAsyncThunk(
  'user/setPreferences',
  async (preferences, { getState, rejectWithValue }) => {
    try {
      const { token, user } = getState().user;
      const response = await axios.post(`${API_URL}/api/users/${user.id}/preferences`, preferences, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update user preferences');
    }
  }
);

// Get watch history
export const getWatchHistory = createAsyncThunk(
  'user/getWatchHistory',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token, user } = getState().user;
      const response = await axios.get(`${API_URL}/api/users/${user.id}/watchhistory`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch watch history');
    }
  }
);

// Add to watch history
export const addToWatchHistory = createAsyncThunk(
  'user/addToWatchHistory',
  async (movieId, { getState, rejectWithValue }) => {
    try {
      const { token, user } = getState().user;
      const response = await axios.post(
        `${API_URL}/api/users/${user.id}/watchhistory`,
        { movieId },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to add to watch history');
    }
  }
);

// Add preferred genre
export const addPreferredGenre = createAsyncThunk(
  'user/addPreferredGenre',
  async (genre, { getState, rejectWithValue }) => {
    try {
      const { token, user } = getState().user;
      const response = await axios.post(
        `${API_URL}/api/users/${user.id}/genres`,
        { genre },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to add preferred genre');
    }
  }
);

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: false,
  error: null,
  preferences: null,
  watchHistory: [],
  hasCompletedOnboarding: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.preferences = null;
      state.watchHistory = [];
      state.hasCompletedOnboarding = false;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.hasCompletedOnboarding = action.payload.hasCompletedOnboarding;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get User Profile
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.hasCompletedOnboarding = action.payload.hasCompletedOnboarding;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update User Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get User Preferences
      .addCase(getUserPreferences.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserPreferences.fulfilled, (state, action) => {
        state.loading = false;
        state.preferences = action.payload;
        state.hasCompletedOnboarding = true;
      })
      .addCase(getUserPreferences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Set User Preferences
      .addCase(setUserPreferences.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setUserPreferences.fulfilled, (state, action) => {
        state.loading = false;
        state.preferences = action.payload;
        state.hasCompletedOnboarding = true;
      })
      .addCase(setUserPreferences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Watch History
      .addCase(getWatchHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWatchHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.watchHistory = action.payload;
      })
      .addCase(getWatchHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add to Watch History
      .addCase(addToWatchHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToWatchHistory.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && !state.watchHistory.includes(action.payload)) {
          state.watchHistory.push(action.payload);
        }
      })
      .addCase(addToWatchHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add Preferred Genre
      .addCase(addPreferredGenre.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPreferredGenre.fulfilled, (state, action) => {
        state.loading = false;
        if (state.preferences && state.preferences.preferredGenres) {
          if (!state.preferences.preferredGenres.includes(action.payload)) {
            state.preferences.preferredGenres.push(action.payload);
          }
        }
      })
      .addCase(addPreferredGenre.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { logout, clearError } = userSlice.actions;
export default userSlice.reducer; 