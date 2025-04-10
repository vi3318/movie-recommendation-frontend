import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieById, rateMovie, getMovieReviews, getAverageRating } from '../redux/slices/movieSlice';
import { addToWatchHistory } from '../redux/slices/userSlice';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { currentMovie, movieReviews, averageRating, loading, error } = useSelector(state => state.movies);
  const { isAuthenticated, user } = useSelector(state => state.user);
  
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    if (id) {
      dispatch(fetchMovieById(id));
      dispatch(getMovieReviews(id));
      dispatch(getAverageRating(id));
    }
  }, [dispatch, id]);
  
  const handleRatingChange = (value) => {
    setRating(value);
  };
  
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };
  
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await dispatch(rateMovie({ movieId: id, rating, comment })).unwrap();
      await dispatch(getMovieReviews(id));
      await dispatch(getAverageRating(id));
      await dispatch(addToWatchHistory(id));
      
      setRating(0);
      setComment('');
    } catch (error) {
      console.error('Failed to submit review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (error) {
    return <ErrorMessage message={error} />;
  }
  
  if (!currentMovie) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold mb-4">Movie Not Found</h2>
        <p className="text-gray-600">The movie you are looking for does not exist.</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <img 
            src={currentMovie.posterUrl || 'https://via.placeholder.com/300x450?text=No+Poster'} 
            alt={currentMovie.title} 
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold mb-2">{currentMovie.title}</h1>
          <p className="text-gray-600 mb-4">{currentMovie.releaseYear}</p>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="ml-1 text-lg font-semibold">{averageRating ? averageRating.toFixed(1) : 'N/A'}</span>
            </div>
            <span className="mx-2 text-gray-400">|</span>
            <span className="text-gray-600">{movieReviews?.length || 0} reviews</span>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{currentMovie.description}</p>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Genres</h2>
            <div className="flex flex-wrap gap-2">
              {currentMovie.genres?.map((genre, index) => (
                <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                  {genre}
                </span>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Cast & Crew</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-gray-700">Director</h3>
                <p>{currentMovie.director}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Actors</h3>
                <p>{currentMovie.actors?.join(', ')}</p>
              </div>
            </div>
          </div>
          
          {isAuthenticated && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Rate this Movie</h2>
              <form onSubmit={handleSubmitReview}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Rating</label>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        type="button"
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          rating >= value ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                        onClick={() => handleRatingChange(value)}
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="comment" className="block text-gray-700 mb-2">Comment (Optional)</label>
                  <textarea
                    id="comment"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    rows="3"
                    value={comment}
                    onChange={handleCommentChange}
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            </div>
          )}
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Reviews</h2>
            {movieReviews && movieReviews.length > 0 ? (
              <div className="space-y-4">
                {movieReviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-4">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    {review.comment && <p className="text-gray-700">{review.comment}</p>}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No reviews yet. Be the first to review this movie!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail; 