import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchMovies, fetchWatchlist } from '../features/movieSlice';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
  const dispatch = useDispatch();
  const { movies, watchlist, loading } = useSelector((state) => state.movies);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchMovies());
    if (user) {
      dispatch(fetchWatchlist());
    }
  }, [dispatch, user]);

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

      {/* All Movies Section */}
      <section className="w-full">
        <h2 className="text-2xl font-bold mb-6">All Movies</h2>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-6">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} isInWatchlist={watchlist.includes(movie.id)} />
            ))}
          </div>
        )}
      </section>

      {/* Watchlist Section */}
      {user && watchlist.length > 0 && (
        <section className="w-full">
          <h2 className="text-2xl font-bold mb-6">Your Watchlist</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-6">
            {movies
              .filter((movie) => watchlist.includes(movie.id))
              .map((movie) => (
                <MovieCard key={movie.id} movie={movie} isInWatchlist={true} />
              ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Home; 