import { createBrowserRouter, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Layout Components
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';

// Auth Pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';

// Main Pages
import Home from '../pages/Home';
import MovieDetails from '../pages/MovieDetails';
import Search from '../pages/Search';
import Watchlist from '../pages/Watchlist';
import Profile from '../pages/Profile';
import Recommendations from '../pages/Recommendations';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'movie/:id',
        element: <MovieDetails />,
      },
      {
        path: 'search',
        element: <Search />,
      },
      {
        path: 'recommendations',
        element: (
          <ProtectedRoute>
            <Recommendations />
          </ProtectedRoute>
        ),
      },
      {
        path: 'watchlist',
        element: (
          <ProtectedRoute>
            <Watchlist />
          </ProtectedRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />,
      },
    ],
  },
]); 