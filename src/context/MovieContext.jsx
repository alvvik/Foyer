import { createContext, useState, useContext, useEffect } from "react";
import { getPopularMovies, searchMovies } from "../services/api";
const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const storedFavs = localStorage.getItem("favorites");

    return storedFavs ? JSON.parse(storedFavs) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);
  const addToFavorites = (movie) => {
    setFavorites((prev) =>
      prev.some((favorite) => favorite.id === movie.id)
        ? prev
        : [...prev, movie],
    );
  };

  const removeFromFavorites = (movieId) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const isFavorite = (movieId) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  const fetchMoviesByQuery = async (query) => {
    setIsLoading(true);
    setError(null);
    try {
      const searchResult = await searchMovies(query);
      setMovies(searchResult);
    } catch (err) {
      setError("Failed to search movies...");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const loadPopularMovies = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        setError(`Failed to load movies...`);
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadPopularMovies();
  }, []);
  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    movies,
    isLoading,
    error,
    fetchMoviesByQuery,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};
