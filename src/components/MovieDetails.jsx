import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { StarIcon } from '@heroicons/react/24/solid';
import { fetchMovieDetails, addToWatchHistory } from '../redux/slices/movieSlice';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const MovieDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedMovie, loading, error } = useSelector((state) => state.movies);
  const { user } = useSelector((state) => state.auth);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  useEffect(() => {
    dispatch(fetchMovieDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (user && selectedMovie) {
      dispatch(addToWatchHistory({ userId: user.id, movieId: selectedMovie.id }));
    }
  }, [dispatch, user, selectedMovie]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!selectedMovie) return <ErrorMessage message="Movie not found" />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3">
            <img
              src={selectedMovie.posterUrl || 'https://via.placeholder.com/300x450?text=No+Poster'}
              alt={selectedMovie.title}
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="md:w-2/3 p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {selectedMovie.title}
            </h1>
            <p className="text-gray-600 mb-4">{selectedMovie.releaseYear}</p>
            
            <div className="flex items-center mb-4">
              <StarIcon className="h-6 w-6 text-yellow-400 mr-1" />
              <span className="text-xl font-semibold">
                {selectedMovie.averageRating?.toFixed(1) || 'N/A'}
              </span>
              <span className="mx-2">•</span>
              <span className="text-gray-600">
                {selectedMovie.reviewCount || 0} reviews
              </span>
            </div>

            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Genres</h2>
              <div className="flex flex-wrap gap-2">
                {selectedMovie.genres.map((genre, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="text-gray-700">{selectedMovie.description}</p>
            </div>

            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Director</h2>
              <p className="text-gray-700">{selectedMovie.director}</p>
            </div>

            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Cast</h2>
              <div className="flex flex-wrap gap-2">
                {selectedMovie.actors.map((actor, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full"
                  >
                    {actor}
                  </span>
                ))}
              </div>
            </div>

            {user && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-4">Write a Review</h2>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        onClick={() => setRating(value)}
                        className={`p-2 rounded-full ${
                          rating >= value
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      >
                        <StarIcon className="h-6 w-6" />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Review</label>
                  <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    rows="4"
                    placeholder="Write your review here..."
                  />
                </div>
                <button
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                  onClick={() => {
                    // TODO: Implement review submission
                    console.log('Submit review:', { rating, review });
                  }}
                >
                  Submit Review
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails; 