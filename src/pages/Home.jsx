import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchMoviesByLanguage, fetchRecommendations } from '../features/slices/movieSlice';
import { fetchWatchlist } from '../features/slices/watchlistSlice';

const MovieCard = ({ movie }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="group relative overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-lg w-full"
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
        <h3 className="text-white text-lg font-semibold">{movie.title}</h3>
        <p className="text-white/80 text-sm">{movie.releaseYear}</p>
        <Link
          to={`/movie/${movie.id}`}
          className="mt-2 inline-block bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors duration-200"
        >
          View Details
        </Link>
      </div>
    </div>
  </motion.div>
);

const Home = () => {
  const dispatch = useDispatch();
  const { movies, recommendations, loading: moviesLoading } = useSelector(
    (state) => state.movies
  );
  const { movies: watchlistMovies, loading: watchlistLoading } = useSelector(
    (state) => state.watchlist
  );
  const { user, preferences } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      if (preferences?.languages?.length) {
        dispatch(fetchMoviesByLanguage(preferences.languages));
      } else {
        dispatch(fetchMoviesByLanguage(['en'])); // Default to English if no preferences
      }
      dispatch(fetchRecommendations(user.id));
      dispatch(fetchWatchlist());
    }
  }, [dispatch, user, preferences]);

  const [searchQuery, setSearchQuery] = useState('');

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full space-y-8">
      {/* Search Bar */}
      <div className="w-full max-w-2xl mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input pl-10 w-full"
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Recommendations Section */}
      {user && recommendations.length > 0 && (
        <section className="w-full">
          <h2 className="text-2xl font-bold mb-6">Recommended for You</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-6">
            {recommendations.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      )}

      {/* All Movies Section */}
      <section className="w-full">
        <h2 className="text-2xl font-bold mb-6">All Movies</h2>
        {moviesLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-6">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </section>

      {/* Watchlist Section */}
      {user && watchlistMovies.length > 0 && (
        <section className="w-full">
          <h2 className="text-2xl font-bold mb-6">Your Watchlist</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-6">
            {watchlistMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Home; 