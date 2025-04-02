import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { updateUserPreferences } from '../features/slices/authSlice';

const languages = [
  { id: 'en', name: 'English' },
  { id: 'es', name: 'Spanish' },
  { id: 'fr', name: 'French' },
  { id: 'de', name: 'German' },
];

const Preferences = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleLanguage = (languageId) => {
    setSelectedLanguages((prev) =>
      prev.includes(languageId)
        ? prev.filter((id) => id !== languageId)
        : [...prev, languageId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedLanguages.length === 0) {
      alert('Please select at least one language preference');
      return;
    }

    setIsSubmitting(true);
    try {
      await dispatch(updateUserPreferences({ languages: selectedLanguages })).unwrap();
      navigate('/');
    } catch (error) {
      console.error('Failed to save preferences:', error);
      alert('Failed to save preferences. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto p-6"
    >
      <h1 className="text-3xl font-bold mb-8">Select Your Movie Language Preferences</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Choose the languages you prefer to watch movies in. We'll use these preferences to show you relevant content.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {languages.map((language) => (
            <motion.button
              key={language.id}
              type="button"
              onClick={() => toggleLanguage(language.id)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                selectedLanguages.includes(language.id)
                  ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium">{language.name}</span>
                {selectedLanguages.includes(language.id) && (
                  <svg
                    className="w-6 h-6 text-primary-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
            </motion.button>
          ))}
        </div>

        <div className="flex justify-end">
          <motion.button
            type="submit"
            disabled={isSubmitting || selectedLanguages.length === 0}
            className={`px-6 py-3 rounded-lg font-medium text-white ${
              isSubmitting || selectedLanguages.length === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-primary-600 hover:bg-primary-700'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? 'Saving...' : 'Save Preferences'}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default Preferences; 