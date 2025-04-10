import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserPreferences } from '../redux/slices/userSlice';

const OnboardingQuestionnaire = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState({
    genres: [],
    favoriteActors: [],
    favoriteDirectors: [],
    preferredLanguages: [],
    movieTypes: []
  });

  const genres = [
    'Action', 'Comedy', 'Drama', 'Romance', 'Thriller', 
    'Sci-Fi', 'Horror', 'Documentary', 'Animation', 'Musical'
  ];

  const languages = ['Hindi', 'English', 'Tamil', 'Telugu', 'Bengali'];
  const movieTypes = ['Classic', 'Modern', 'Independent', 'Mainstream'];

  const handleGenreSelection = (genre) => {
    setPreferences(prev => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter(g => g !== genre)
        : [...prev.genres, genre]
    }));
  };

  const handleLanguageSelection = (language) => {
    setPreferences(prev => ({
      ...prev,
      preferredLanguages: prev.preferredLanguages.includes(language)
        ? prev.preferredLanguages.filter(l => l !== language)
        : [...prev.preferredLanguages, language]
    }));
  };

  const handleMovieTypeSelection = (type) => {
    setPreferences(prev => ({
      ...prev,
      movieTypes: prev.movieTypes.includes(type)
        ? prev.movieTypes.filter(t => t !== type)
        : [...prev.movieTypes, type]
    }));
  };

  const handleActorInput = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      setPreferences(prev => ({
        ...prev,
        favoriteActors: [...prev.favoriteActors, e.target.value.trim()]
      }));
      e.target.value = '';
    }
  };

  const handleDirectorInput = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      setPreferences(prev => ({
        ...prev,
        favoriteDirectors: [...prev.favoriteDirectors, e.target.value.trim()]
      }));
      e.target.value = '';
    }
  };

  const handleSubmit = async () => {
    try {
      await dispatch(setUserPreferences(preferences)).unwrap();
      navigate('/recommendations');
    } catch (error) {
      console.error('Failed to save preferences:', error);
    }
  };

  const removeItem = (list, item, setter) => {
    setPreferences(prev => ({
      ...prev,
      [list]: prev[list].filter(i => i !== item)
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Tell us about your movie preferences
            </h3>
            
            {step === 1 && (
              <div className="mt-5">
                <h4 className="text-md font-medium text-gray-700 mb-3">Select your favorite genres</h4>
                <div className="grid grid-cols-2 gap-3">
                  {genres.map(genre => (
                    <button
                      key={genre}
                      onClick={() => handleGenreSelection(genre)}
                      className={`p-2 rounded-md ${
                        preferences.genres.includes(genre)
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="mt-5">
                <h4 className="text-md font-medium text-gray-700 mb-3">Select preferred languages</h4>
                <div className="grid grid-cols-2 gap-3">
                  {languages.map(language => (
                    <button
                      key={language}
                      onClick={() => handleLanguageSelection(language)}
                      className={`p-2 rounded-md ${
                        preferences.preferredLanguages.includes(language)
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {language}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="mt-5">
                <h4 className="text-md font-medium text-gray-700 mb-3">Select preferred movie types</h4>
                <div className="grid grid-cols-2 gap-3">
                  {movieTypes.map(type => (
                    <button
                      key={type}
                      onClick={() => handleMovieTypeSelection(type)}
                      className={`p-2 rounded-md ${
                        preferences.movieTypes.includes(type)
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="mt-5">
                <h4 className="text-md font-medium text-gray-700 mb-3">Add your favorite actors</h4>
                <input
                  type="text"
                  onKeyPress={handleActorInput}
                  placeholder="Type actor name and press Enter"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <div className="mt-3 flex flex-wrap gap-2">
                  {preferences.favoriteActors.map(actor => (
                    <span
                      key={actor}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                    >
                      {actor}
                      <button
                        onClick={() => removeItem('favoriteActors', actor)}
                        className="ml-1 text-indigo-600 hover:text-indigo-900"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="mt-5">
                <h4 className="text-md font-medium text-gray-700 mb-3">Add your favorite directors</h4>
                <input
                  type="text"
                  onKeyPress={handleDirectorInput}
                  placeholder="Type director name and press Enter"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <div className="mt-3 flex flex-wrap gap-2">
                  {preferences.favoriteDirectors.map(director => (
                    <span
                      key={director}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                    >
                      {director}
                      <button
                        onClick={() => removeItem('favoriteDirectors', director)}
                        className="ml-1 text-indigo-600 hover:text-indigo-900"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-between">
              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Previous
                </button>
              )}
              {step < 5 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  className="ml-auto inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="ml-auto inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Finish
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingQuestionnaire; 