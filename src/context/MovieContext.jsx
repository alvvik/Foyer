import { createContext, useState, useContext, useEffect } from "react";
import { getPopularMovies, searchMovies } from "../services/api";

import {
  doc,
  getDoc,
  updateDoc,
  setDoc,
  collection,
  getDocs,
} from "firebase/firestore";
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
    //localStorage.setItem("favorites", JSON.stringify(favorites));
    const setFavorites = async () => {
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
    if (!user) throw new Error("You need be logged in!");
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

  // watchlists

  const addWatchListFilm = async (watchlistName, watchListDesc) => {
    console.log("Dodawanie/aktualizacja listy:", watchlistName);

    try {
      // Wskazujemy ścieżkę do konkretnego dokumentu listy
      const docRef = doc(db, "users", user.uid, "watchlists", watchlistName);

      // setDoc z { merge: true } stworzy dokument, jeśli nie istnieje,
      // lub zaktualizuje tylko podane pola, nie usuwając reszty danych.
      await setDoc(
        docRef,
        {
          watchlistName: watchlistName,
          watchListDesc: watchListDesc,
          createdAt: new Date(), // Opcjonalnie: dodaj datę utworzenia
        },
        { merge: true },
      );

      console.log("Lista została pomyślnie zapisana w bazie.");
    } catch (error) {
      console.error("Błąd podczas dodawania listy:", error);
      // Możesz tutaj dodać obsługę błędów, np. setError(...)
    }
  };
  const getWatchLists = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const colRef = collection(db, "users", user.uid, "watchlists");
      const querySnapshot = await getDocs(colRef);

      // Mapujemy dokumenty bezpośrednio na obiekty z danymi
      const lists = querySnapshot.docs.map((doc) => ({
        id: doc.id, // ID dokumentu (np. "moja_lista_1")
        ...doc.data(), // Pobiera pola 'nazwaListy' i 'desc'
      }));

      console.log("Moje listy:", lists);
      return lists;
    } catch (err) {
      console.error(err);
      setError("Failed to fetch watchlists...");
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    movies,
    isLoading,
    error,
    fetchMoviesByQuery,
    addWatchListFilm,
    getWatchLists,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};
