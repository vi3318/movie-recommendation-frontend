import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecommendations } from '../redux/slices/movieSlice';
import MovieCard from './MovieCard';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const MovieRecommendations = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { recommendations, loading, error } = useSelector((state) => state.movies);

  useEffect(() => {
    if (user) {
      dispatch(fetchRecommendations(user.id));
    }
  }, [dispatch, user]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!recommendations?.length) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">
          No recommendations available. Try rating some movies to get personalized recommendations!
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Recommended for You
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {recommendations.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieRecommendations; 