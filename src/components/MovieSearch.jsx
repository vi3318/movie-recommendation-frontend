import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchMovies, clearSearchResults } from '../redux/slices/movieSlice';
import MovieCard from './MovieCard';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const MovieSearch = () => {
  const dispatch = useDispatch();
  const { searchResults, loading, error } = useSelector(state => state.movies);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams, setSearchParams] = useState({
    title: '',
    genres: [],
    releaseYear: '',
    director: '',
    actors: []
  });
  
  const [activeFilter, setActiveFilter] = useState('title');
  const [genreInput, setGenreInput] = useState('');
  const [actorInput, setActorInput] = useState('');
  
  useEffect(() => {
    return () => {
      dispatch(clearSearchResults());
    };
  }, [dispatch]);
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    
    if (searchQuery.trim()) {
      dispatch(searchMovies({ title: searchQuery }));
    }
  };
  
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({
      ...searchParams,
      [name]: value
    });
  };
  
  const handleAddGenre = () => {
    if (genreInput.trim() && !searchParams.genres.includes(genreInput.trim())) {
      setSearchParams({
        ...searchParams,
        genres: [...searchParams.genres, genreInput.trim()]
      });
      setGenreInput('');
    }
  };
  
  const handleRemoveGenre = (genre) => {
    setSearchParams({
      ...searchParams,
      genres: searchParams.genres.filter(g => g !== genre)
    });
  };
  
  const handleAddActor = () => {
    if (actorInput.trim() && !searchParams.actors.includes(actorInput.trim())) {
      setSearchParams({
        ...searchParams,
        actors: [...searchParams.actors, actorInput.trim()]
      });
      setActorInput('');
    }
  };
  
  const handleRemoveActor = (actor) => {
    setSearchParams({
      ...searchParams,
      actors: searchParams.actors.filter(a => a !== actor)
    });
  };
  
  const handleAdvancedSearch = (e) => {
    e.preventDefault();
    dispatch(searchMovies(searchParams));
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Search Movies</h2>
      
      <div className="mb-8">
        <form onSubmit={handleSearchSubmit} className="flex">
          <input
            type="text"
            placeholder="Search by title..."
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Search
          </button>
        </form>
      </div>
      
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            className={`px-3 py-1 rounded-md ${
              activeFilter === 'title'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => handleFilterChange('title')}
          >
            Title
          </button>
          <button
            className={`px-3 py-1 rounded-md ${
              activeFilter === 'genre'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => handleFilterChange('genre')}
          >
            Genre
          </button>
          <button
            className={`px-3 py-1 rounded-md ${
              activeFilter === 'year'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => handleFilterChange('year')}
          >
            Year
          </button>
          <button
            className={`px-3 py-1 rounded-md ${
              activeFilter === 'director'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => handleFilterChange('director')}
          >
            Director
          </button>
          <button
            className={`px-3 py-1 rounded-md ${
              activeFilter === 'actor'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => handleFilterChange('actor')}
          >
            Actor
          </button>
        </div>
        
        <form onSubmit={handleAdvancedSearch} className="space-y-4">
          {activeFilter === 'title' && (
            <div>
              <label htmlFor="title" className="block text-gray-700 mb-2">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchParams.title}
                onChange={handleInputChange}
              />
            </div>
          )}
          
          {activeFilter === 'genre' && (
            <div>
              <label htmlFor="genre" className="block text-gray-700 mb-2">Genre</label>
              <div className="flex mb-2">
                <input
                  type="text"
                  id="genre"
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={genreInput}
                  onChange={(e) => setGenreInput(e.target.value)}
                  placeholder="Add a genre"
                />
                <button
                  type="button"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={handleAddGenre}
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {searchParams.genres.map((genre, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm flex items-center"
                  >
                    {genre}
                    <button
                      type="button"
                      className="ml-2 text-indigo-600 hover:text-indigo-800"
                      onClick={() => handleRemoveGenre(genre)}
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {activeFilter === 'year' && (
            <div>
              <label htmlFor="releaseYear" className="block text-gray-700 mb-2">Release Year</label>
              <input
                type="number"
                id="releaseYear"
                name="releaseYear"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchParams.releaseYear}
                onChange={handleInputChange}
                min="1900"
                max={new Date().getFullYear()}
              />
            </div>
          )}
          
          {activeFilter === 'director' && (
            <div>
              <label htmlFor="director" className="block text-gray-700 mb-2">Director</label>
              <input
                type="text"
                id="director"
                name="director"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchParams.director}
                onChange={handleInputChange}
              />
            </div>
          )}
          
          {activeFilter === 'actor' && (
            <div>
              <label htmlFor="actor" className="block text-gray-700 mb-2">Actor</label>
              <div className="flex mb-2">
                <input
                  type="text"
                  id="actor"
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={actorInput}
                  onChange={(e) => setActorInput(e.target.value)}
                  placeholder="Add an actor"
                />
                <button
                  type="button"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={handleAddActor}
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {searchParams.actors.map((actor, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm flex items-center"
                  >
                    {actor}
                    <button
                      type="button"
                      className="ml-2 text-indigo-600 hover:text-indigo-800"
                      onClick={() => handleRemoveActor(actor)}
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <button
            type="submit"
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Search
          </button>
        </form>
      </div>
      
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : searchResults && searchResults.length > 0 ? (
        <div>
          <h3 className="text-xl font-semibold mb-4">Search Results</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {searchResults.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      ) : searchResults && searchResults.length === 0 ? (
        <div className="text-center p-8">
          <p className="text-gray-600">No movies found matching your search criteria.</p>
        </div>
      ) : null}
    </div>
  );
};

export default MovieSearch; 