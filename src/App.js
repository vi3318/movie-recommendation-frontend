import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserPreferences } from './redux/slices/userSlice';

// Components
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import MovieRecommendations from './components/MovieRecommendations';
import OnboardingQuestionnaire from './components/OnboardingQuestionnaire';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, hasCompletedOnboarding, user } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      dispatch(getUserPreferences());
    }
  }, [dispatch, isAuthenticated, user?.id]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/" />} />
          
          <Route
            path="/"
            element={
              <PrivateRoute>
                {!hasCompletedOnboarding ? (
                  <Navigate to="/onboarding" />
                ) : (
                  <MovieRecommendations />
                )}
              </PrivateRoute>
            }
          />
          
          <Route
            path="/onboarding"
            element={
              <PrivateRoute>
                {hasCompletedOnboarding ? (
                  <Navigate to="/" />
                ) : (
                  <OnboardingQuestionnaire />
                )}
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App; 