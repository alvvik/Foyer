import { createContext, useState, useContext, useEffect } from "react";
import { getPopularMovies, searchMovies } from "../services/api";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuthContext } from "./AuthContext";
const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const { user } = useAuthContext();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    if (!user) {
      setFavorites([]);
      return;
    }
    const getFilms = async () => {
      try {
        console.log(user);

        const docRef = doc(db, "users", user.uid);
        /*
      await updateDoc(docRef, {
        favorites_id: 
      });*/

        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("Dane: ", docSnap.data());
          setFavorites(docSnap.data().favorites_id);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getFilms();
  }, [user]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
    const setFavorites = async () => {
      console.log("Ulubione", favorites);

      try {
        const docRef = doc(db, "users", user.uid);
        await updateDoc(docRef, {
          favorites_id: favorites,
        });
      } catch (error) {
        console.log(error);
      }
    };
    setFavorites();
  }, [favorites]);

  const addToFavorites = (movie) => {
    if (!user) throw new Error("You need be logged in!"); // obsluzyc wyjatek w movie card i dialog do tego
    console.log(`dodano `, movie);

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
