# Movie Recommendation Platform - Frontend

A modern React frontend for the Movie Recommendation Platform that interfaces with Spring Boot microservices.

## Features

- User authentication and authorization
- Movie browsing and searching
- Personalized movie recommendations
- User preferences management
- Watchlist functionality
- Movie reviews and ratings
- Responsive design with Tailwind CSS

## Tech Stack

- React 18
- Vite
- Redux Toolkit
- Tailwind CSS
- Framer Motion
- Axios

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Spring Boot microservices running locally

## Getting Started

1. Clone the repository:
```bash
git clone <your-repo-url>
cd movie-recommendation-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following content:
```env
VITE_API_URL=http://localhost:8080
VITE_AUTH_SERVICE_URL=http://localhost:8081
VITE_MOVIE_SERVICE_URL=http://localhost:8082
VITE_RECOMMENDATION_SERVICE_URL=http://localhost:8083
VITE_REVIEW_SERVICE_URL=http://localhost:8084
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/     # Reusable UI components
├── features/       # Redux slices and features
├── pages/         # Page components
├── services/      # API services
├── config/        # Configuration files
└── App.jsx        # Main application component
```

## API Integration

The frontend communicates with the following microservices:

- Auth Service (Port 8081)
- Movie Service (Port 8082)
- Recommendation Service (Port 8083)
- Review Service (Port 8084)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
