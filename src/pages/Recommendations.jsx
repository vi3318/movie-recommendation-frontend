import { useState, useEffect } from 'react';
import { recommendationApi } from '../services/api';
import authService from '../services/authService';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { Tab } from '@headlessui/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Recommendations = () => {
  const [user, setUser] = useState(null);
  const [personalizedRecommendations, setPersonalizedRecommendations] = useState([]);
  const [genreRecommendations, setGenreRecommendations] = useState([]);
  const [ratingRecommendations, setRatingRecommendations] = useState([]);
  const [similarUserRecommendations, setSimilarUserRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    
    if (currentUser && currentUser.id) {
      fetchAllRecommendations(currentUser.id);
    } else {
      setLoading(false);
      setError('Please log in to get personalized recommendations.');
    }
  }, []);

  const fetchAllRecommendations = async (userId) => {
    setLoading(true);
    setError('');
    
    try {
      // Fetch all types of recommendations in parallel
      const [personalizedResponse, genreResponse, ratingResponse, similarUserResponse] = await Promise.all([
        recommendationApi.getRecommendationsForUser(userId),
        recommendationApi.getRecommendationsByGenre(userId),
        recommendationApi.getRecommendationsByRating(userId),
        recommendationApi.getRecommendationsBySimilarUsers(userId)
      ]);
      
      setPersonalizedRecommendations(personalizedResponse.recommendedMovies || []);
      setGenreRecommendations(genreResponse || []);
      setRatingRecommendations(ratingResponse || []);
      setSimilarUserRecommendations(similarUserResponse || []);
    } catch (err) {
      console.error('Error fetching recommendations:', err);
      setError(err.message || 'Failed to fetch recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  const categories = {
    'For You': personalizedRecommendations,
    'Based on Genres': genreRecommendations,
    'Popular & Highly Rated': ratingRecommendations,
    'People Like You Enjoyed': similarUserRecommendations
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Recommended for You</h1>
        <p className="mt-2 text-sm text-gray-600">
          Personalized movie recommendations based on your preferences and activity
        </p>
      </div>

      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white text-blue-700 shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.values(categories).map((movies, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}
            >
              {movies && movies.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No recommendations available
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Try updating your preferences or rating more movies to get better recommendations.
                  </p>
                </div>
              )}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default Recommendations; 