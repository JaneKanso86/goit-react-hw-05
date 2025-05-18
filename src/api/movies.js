import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const TOKEN =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNmM1NTFkNmFjOGI3MWJlMTY2M2MzNGYyNjIxZGViYSIsIm5iZiI6MTc0NzM5NTc4NC42MTEsInN1YiI6IjY4MjcyNGM4OTdhNWUyY2U2MTJkMmZjMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1Uzkff_HSpyEY-6AGjfrfJaWDcFBGc01ifs_i0qOWb8';

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: TOKEN,
  },
});

export const fetchTrendingMovies = async () => {
  const response = await instance.get('/trending/movie/day');
  return response.data.results;
};

export const searchMovies = async (query) => {
  const response = await instance.get('/search/movie', {
    params: {
      query,
      include_adults: false,
      language: 'en-US',
      page: 1,
    },
  });
  return response.data.results;
};

export const fetchMovieDetails = async (movieId) => {
  const response = await instance.get(`/movie/${movieId}`);
  return response.data;
};

export const fetchMovieCast = async (movieId) => {
  const response = await instance.get(`/movie/${movieId}/credits`);
  return response.data.cast;
};

export const fetchMovieReviews = async (movieId) => {
  const response = await instance.get(`/movie/${movieId}/reviews`);
  return response.data.results;
};
