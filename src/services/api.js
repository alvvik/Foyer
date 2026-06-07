const API_KEY = "473c81fcac9ec776f750f5ef0fa52953";
const BASE_URL = "https://api.themoviedb.org/3";
export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await response.json();

  return data.results;
};
export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`,
  );
  const data = await response.json();

  return data.results;
};
export const callMovieDetails = async (id) => {
  const [resDetails, resImages] = await Promise.all([
    fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`),
    fetch(`${BASE_URL}/movie/${id}/images?api_key=${API_KEY}`),
  ]);
  const details = await resDetails.json();
  const images = await resImages.json();
  return { details, images };
};
//https://api.themoviedb.org/3/movie/1057265?api_key=473c81fcac9ec776f750f5ef0fa52953
