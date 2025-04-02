import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { fetchMovieDetails, clearSelectedMovie } from '../features/slices/movieSlice';
import { fetchMovieReviews, submitReview } from '../features/slices/reviewSlice';
import { addToWatchlist, removeFromWatchlist } from '../features/slices/watchlistSlice';

const ReviewForm = ({ movieId, onSubmit }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ movieId, rating, comment });
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Rating
        </label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
        >
          {[5, 4, 3, 2, 1].map((value) => (
            <option key={value} value={value}>
              {value} {value === 1 ? 'Star' : 'Stars'}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Comment
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
          required
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary"
      >
        Submit Review
      </button>
    </form>
  );
};

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentMovie, loading: movieLoading } = useSelector(
    (state) => state.movies
  );
  const { reviews, loading: reviewsLoading } = useSelector(
    (state) => state.reviews
  );
  const { movies: watchlistMovies } = useSelector((state) => state.watchlist);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchMovieDetails(id));
    dispatch(fetchMovieReviews(id));

    return () => {
      dispatch(clearSelectedMovie());
    };
  }, [dispatch, id]);

  const isInWatchlist = watchlistMovies.some((movie) => movie.id === id);

  const handleWatchlistToggle = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (isInWatchlist) {
      dispatch(removeFromWatchlist(id));
    } else {
      dispatch(addToWatchlist(id));
    }
  };

  const handleReviewSubmit = (reviewData) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    dispatch(submitReview(reviewData));
  };

  if (movieLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!currentMovie) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Movie not found
        </h2>
        <button
          onClick={() => navigate('/')}
          className="mt-4 btn btn-primary"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Movie Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            {currentMovie.title}
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            {currentMovie.releaseYear} • {currentMovie.genre}
          </p>
          <p className="mt-4 text-gray-700 dark:text-gray-200">
            {currentMovie.description}
          </p>
          <div className="mt-6 flex space-x-4">
            <button
              onClick={handleWatchlistToggle}
              className={`btn ${
                isInWatchlist ? 'btn-secondary' : 'btn-primary'
              }`}
            >
              {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
            </button>
          </div>
        </div>
        <div className="relative">
          <img
            src={currentMovie.posterUrl}
            alt={currentMovie.title}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Trailer Section */}
      {currentMovie.trailerUrl && (
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            src={currentMovie.trailerUrl}
            title={`${currentMovie.title} Trailer`}
            className="w-full h-full rounded-lg"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {/* Reviews Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Reviews
        </h2>

        {/* Review Form */}
        {isAuthenticated && (
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
            <ReviewForm movieId={id} onSubmit={handleReviewSubmit} />
          </div>
        )}

        {/* Reviews List */}
        {reviewsLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        ) : reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="card"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{review.userName}</p>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, index) => (
                        <svg
                          key={index}
                          className={`h-5 w-5 ${
                            index < review.rating
                              ? 'text-yellow-400'
                              : 'text-gray-300 dark:text-gray-600'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <p className="mt-4 text-gray-700 dark:text-gray-200">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            No reviews yet. Be the first to review this movie!
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default MovieDetails; 