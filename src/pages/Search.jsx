import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { movieApi } from '../services/api';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (query) {
      searchMovies();
    }
  }, [query]);

  const searchMovies = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await movieApi.searchMovies(query);
      setMovies(response.data);
    } catch (err) {
      setError(err.message || 'Failed to search movies. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query.trim() });
      searchMovies();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Search Movies</h1>
        <p className="mt-2 text-sm text-gray-600">
          Find your next favorite movie
        </p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-4">
        <div className="flex-1">
          <label htmlFor="search" className="sr-only">
            Search movies
          </label>
          <input
            type="text"
            id="search"
            name="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Search by title, genre, or director..."
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Search
        </button>
      </form>

      {loading && <LoadingSpinner />}

      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <div>
          {movies.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : query ? (
            <div className="text-center py-12">
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No movies found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search query to find what you're looking for.
              </p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Search; 