// Bollywood Movies Data
// This file contains a collection of popular Bollywood movies that can be used to populate the Movie Catalog Service

const bollywoodMovies = [
  {
    title: "3 Idiots",
    description: "Two friends are searching for their long lost companion. They revisit their college days and recall the memories of their friend who inspired them to think differently.",
    genres: ["Comedy", "Drama"],
    releaseYear: 2009,
    director: "Rajkumar Hirani",
    actors: ["Aamir Khan", "R. Madhavan", "Sharman Joshi", "Kareena Kapoor"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BNTkyOGVjMGEtNmQzZi00NzFlLTlhMzQtNmMzNjRmNjQ4MjM1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg"
  },
  {
    title: "Dangal",
    description: "Former wrestler Mahavir Singh Phogat trains his daughters Geeta and Babita to become India's first world-class female wrestlers.",
    genres: ["Biography", "Drama", "Sports"],
    releaseYear: 2016,
    director: "Nitesh Tiwari",
    actors: ["Aamir Khan", "Fatima Sana Shaikh", "Sanya Malhotra", "Sakshi Tanwar"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMTQ4MzQzMzM2Nl5BMl5BanBnXkFtZTgwMTQ1NzU3MDI@._V1_.jpg"
  },
  {
    title: "PK",
    description: "An alien on Earth loses the only device he can use to communicate with his spaceship. His innocent nature and child-like questions force the country to evaluate the impact of religion on its people.",
    genres: ["Comedy", "Drama", "Sci-Fi"],
    releaseYear: 2014,
    director: "Rajkumar Hirani",
    actors: ["Aamir Khan", "Anushka Sharma", "Sanjay Dutt", "Sushant Singh Rajput"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMTYzOTE2NjkxN15BMl5BanBnXkFtZTgwMDgzMTg0MzE@._V1_.jpg"
  },
  {
    title: "Lagaan: Once Upon a Time in India",
    description: "The people of a small village in Victorian India stake their future on a game of cricket against their ruthless British rulers.",
    genres: ["Adventure", "Drama", "Musical", "Sport"],
    releaseYear: 2001,
    director: "Ashutosh Gowariker",
    actors: ["Aamir Khan", "Gracy Singh", "Rachel Shelley", "Paul Blackthorne"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg"
  },
  {
    title: "Dilwale Dulhania Le Jayenge",
    description: "When Raj meets Simran in Europe, it isn't love at first sight but when Simran is about to get engaged to her father's choice of groom, Raj makes her realize her own choice.",
    genres: ["Comedy", "Drama", "Romance"],
    releaseYear: 1995,
    director: "Aditya Chopra",
    actors: ["Shah Rukh Khan", "Kajol", "Amrish Puri", "Farida Jalal"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMDI3ZWYtZTkUZDYtY2I5ZTZkOWU3YTM3NjM4NzZkXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg"
  },
  {
    title: "Gully Boy",
    description: "A coming-of-age story about an aspiring street rapper from the slums of Mumbai.",
    genres: ["Drama", "Music"],
    releaseYear: 2019,
    director: "Zoya Akhtar",
    actors: ["Ranveer Singh", "Alia Bhatt", "Kalki Koechlin", "Siddhant Chaturvedi"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BM2Q5YjNjZWMtYThmYy00YTUwLWEyM2UtMDM2MDZiMWM4MzQ4XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg"
  },
  {
    title: "Andhadhun",
    description: "A series of mysterious events change the life of a blind pianist, who must now report a crime that he never actually witnessed.",
    genres: ["Crime", "Drama", "Mystery", "Thriller"],
    releaseYear: 2018,
    director: "Sriram Raghavan",
    actors: ["Ayushmann Khurrana", "Tabu", "Radhika Apte", "Anil Dhawan"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BZWZhMjhhZmYtOTIzOC00MGYzLWI1OGYtNzM0NTEwNjJlYmJlXkEyXkFqcGdeQXVyODAzNzAwOTU@._V1_.jpg"
  },
  {
    title: "Queen",
    description: "A Delhi girl from a traditional family sets out on a solo honeymoon after her marriage gets cancelled.",
    genres: ["Adventure", "Comedy", "Drama"],
    releaseYear: 2014,
    director: "Vikas Bahl",
    actors: ["Kangana Ranaut", "Rajkummar Rao", "Lisa Haydon", "Jeffrey Ho"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BNWYyOWRlOWItZWM5MS00ZjJkLWI0MTUtYTE3NTI5MDAwYjgyXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg"
  },
  {
    title: "Zindagi Na Milegi Dobara",
    description: "Three friends decide to turn their fantasy vacation into reality after one of them becomes engaged.",
    genres: ["Adventure", "Comedy", "Drama"],
    releaseYear: 2011,
    director: "Zoya Akhtar",
    actors: ["Hrithik Roshan", "Farhan Akhtar", "Abhay Deol", "Katrina Kaif"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BZGE5YzVkZDUtZTY2Yi00YzE5LWE1ZTUtNTRiZjMxZGY0YzY3XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg"
  },
  {
    title: "Bajrangi Bhaijaan",
    description: "An Indian man with a magnanimous heart takes a young mute Pakistani girl back to her homeland to reunite her with her family.",
    genres: ["Action", "Comedy", "Drama"],
    releaseYear: 2015,
    director: "Kabir Khan",
    actors: ["Salman Khan", "Harshaali Malhotra", "Nawazuddin Siddiqui", "Kareena Kapoor"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMjE1NjQ5ODc2NV5BMl5BanBnXkFtZTgwOTM5NzY3NTM@._V1_.jpg"
  },
  {
    title: "Barfi!",
    description: "Three young people learn that love can neither be defined nor contained by society's definition of normal and abnormal.",
    genres: ["Comedy", "Drama", "Romance"],
    releaseYear: 2012,
    director: "Anurag Basu",
    actors: ["Ranbir Kapoor", "Priyanka Chopra", "Ileana D'Cruz", "Saurabh Shukla"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMTQzMDU5NzQ0Nl5BMl5BanBnXkFtZTcwMjM2NzY3Nw@@._V1_.jpg"
  },
  {
    title: "Piku",
    description: "A quirky father-daughter relationship, where the father's eccentricities drive his daughter crazy.",
    genres: ["Comedy", "Drama"],
    releaseYear: 2015,
    director: "Shoojit Sircar",
    actors: ["Amitabh Bachchan", "Deepika Padukone", "Irrfan Khan", "Moushumi Chatterjee"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMTUyMzgxMzE5M15BMl5BanBnXkFtZTgwMTE3MzYxNjE@._V1_.jpg"
  },
  {
    title: "Rang De Basanti",
    description: "The story of six young Indians who assist an English woman to film a documentary on the extremist freedom fighters from their past, and the events that lead them to relive the long-forgotten saga of freedom.",
    genres: ["Drama"],
    releaseYear: 2006,
    director: "Rakeysh Omprakash Mehra",
    actors: ["Aamir Khan", "Siddharth", "Sharman Joshi", "Kunal Kapoor"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMGJjY2Y0OTgtYmE3Ny00ZjlkLTk5ZjgtNjM3NWE4ZjNlMjlkXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg"
  },
  {
    title: "Taare Zameen Par",
    description: "An eight-year-old boy is thought to be a lazy trouble-maker, until the new art teacher has the patience and compassion to discover the real problem behind his struggles in school.",
    genres: ["Drama", "Family"],
    releaseYear: 2007,
    director: "Aamir Khan",
    actors: ["Darsheel Safary", "Aamir Khan", "Tisca Chopra", "Vipin Sharma"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMDhjZWViN2MtNzgxOS00NmI4LThiZDktNDI5NmYzMzFhZTM3XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg"
  },
  {
    title: "Swades",
    description: "A successful Indian scientist returns to an Indian village to take his nanny to America with him and in the process rediscovers his roots.",
    genres: ["Drama"],
    releaseYear: 2004,
    director: "Ashutosh Gowariker",
    actors: ["Shah Rukh Khan", "Gayatri Joshi", "Kishori Ballal", "Smit Sheth"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BYzExOTczNjgtZWUzNy00ZDlhLWJmNzktMmRkODU5ZjEwMmM4XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg"
  },
  {
    title: "Munna Bhai M.B.B.S.",
    description: "A gangster sets out to fulfill his father's dream of becoming a doctor.",
    genres: ["Comedy", "Drama"],
    releaseYear: 2003,
    director: "Rajkumar Hirani",
    actors: ["Sanjay Dutt", "Arshad Warsi", "Gracy Singh", "Sunil Dutt"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMGI0NzI5ZjAtNDZmNi00NmE3LThjNzQtOTYzNTMzMDMxOTc0XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg"
  },
  {
    title: "My Name is Khan",
    description: "An Indian Muslim man with Asperger's syndrome takes a challenge to speak to the President of the United States seriously and embarks on a cross-country journey.",
    genres: ["Drama", "Romance"],
    releaseYear: 2010,
    director: "Karan Johar",
    actors: ["Shah Rukh Khan", "Kajol", "Jimmy Shergill", "Zarina Wahab"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMTUyMTA4MTYzMV5BMl5BanBnXkFtZTcwMjMxMTc0Mw@@._V1_.jpg"
  },
  {
    title: "Kahaani",
    description: "A pregnant woman's search for her missing husband takes her from London to Kolkata, but everyone she questions denies having ever met him.",
    genres: ["Mystery", "Thriller"],
    releaseYear: 2012,
    director: "Sujoy Ghosh",
    actors: ["Vidya Balan", "Parambrata Chatterjee", "Indraneil Sengupta", "Nawazuddin Siddiqui"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMTQ1NDUwODU2NF5BMl5BanBnXkFtZTcwODk2OTM1OA@@._V1_.jpg"
  },
  {
    title: "Drishyam",
    description: "A man goes to extreme lengths to save his family from punishment after his family commits an accidental crime.",
    genres: ["Crime", "Drama", "Mystery", "Thriller"],
    releaseYear: 2015,
    director: "Nishikant Kamat",
    actors: ["Ajay Devgn", "Tabu", "Shriya Saran", "Ishita Dutta"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BYmJhZmJlMDItZmZlNy00MGE0LTcxNDctNjJiMjQ2NGI4Y2U1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg"
  },
  {
    title: "Gangs of Wasseypur",
    description: "A clash between Sultan and Shahid Khan leads to the expulsion of Khan from Wasseypur, and ignites a deadly blood feud spanning three generations.",
    genres: ["Action", "Crime", "Drama"],
    releaseYear: 2012,
    director: "Anurag Kashyap",
    actors: ["Manoj Bajpayee", "Richa Chadda", "Nawazuddin Siddiqui", "Tigmanshu Dhulia"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMTc5NjY4MjUwNF5BMl5BanBnXkFtZTgwODM3NzM5MzE@._V1_.jpg"
  },
  {
    title: "Udaan",
    description: "Expelled from his school, a 16-year old returns home to his abusive and oppressive father.",
    genres: ["Drama"],
    releaseYear: 2010,
    director: "Vikramaditya Motwane",
    actors: ["Rajat Barmecha", "Ronit Roy", "Manjot Singh", "Ram Kapoor"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMTc4MTc1OTMxOV5BMl5BanBnXkFtZTcwMTQxMTU2Mw@@._V1_.jpg"
  }
];

export default bollywoodMovies; 