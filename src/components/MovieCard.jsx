import React from 'react';
import { Link } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/24/solid';

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movies/${movie.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative pb-[150%]">
          <img
            src={movie.posterUrl || 'https://via.placeholder.com/300x450?text=No+Poster'}
            alt={movie.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
            {movie.title}
          </h3>
          <p className="text-sm text-gray-600 mb-2">{movie.releaseYear}</p>
          <div className="flex flex-wrap gap-1 mb-2">
            {movie.genres.slice(0, 3).map((genre, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full"
              >
                {genre}
              </span>
            ))}
            {movie.genres.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                +{movie.genres.length - 3} more
              </span>
            )}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <StarIcon className="h-4 w-4 text-yellow-400 mr-1" />
            <span>{movie.averageRating?.toFixed(1) || 'N/A'}</span>
            <span className="mx-1">•</span>
            <span>{movie.reviewCount || 0} reviews</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard; 