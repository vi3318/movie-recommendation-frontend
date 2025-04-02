import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchWatchlist, removeFromWatchlist } from '../features/slices/watchlistSlice';

const Watchlist = () => {
  const dispatch = useDispatch();
  const { movies, loading } = useSelector((state) => state.watchlist);

  useEffect(() => {
    dispatch(fetchWatchlist());
  }, [dispatch]);

  const handleRemoveFromWatchlist = (movieId) => {
    dispatch(removeFromWatchlist(movieId));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Your Watchlist
        </h1>
        <Link
          to="/"
          className="btn btn-secondary"
        >
          Browse Movies
        </Link>
      </div>

      {movies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="group relative overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-lg"
            >
              <div className="aspect-w-2 aspect-h-3">
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white text-lg font-semibold">
                    {movie.title}
                  </h3>
                  <p className="text-white/80 text-sm">{movie.releaseYear}</p>
                  <div className="mt-4 flex space-x-2">
                    <Link
                      to={`/movie/${movie.id}`}
                      className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors duration-200 text-center"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => handleRemoveFromWatchlist(movie.id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors duration-200"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            Your watchlist is empty
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Start adding movies to your watchlist to keep track of what you want to watch.
          </p>
          <Link
            to="/"
            className="btn btn-primary"
          >
            Browse Movies
          </Link>
        </div>
      )}
    </motion.div>
  );
};

export default Watchlist; 