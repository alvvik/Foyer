import { createContext, useState, useContext, useEffect } from "react";
import { getPopularMovies, searchMovies } from "../services/api";
import {
  doc,
  getDoc,
  updateDoc,
  setDoc,
  collection,
  getDocs,
  serverTimestamp
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
const [watchlists, setWatchlists] = useState([]);
  useEffect(() => {
    if (!user) {
      setFavorites([]);
      return;
    }
    const getFilms = async () => {
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
         setFavorites(docSnap.data().favorites_id || []);
        }
      } catch (error) {
        console.error("Błąd podczas pobierania ulubionych:", error);
      }
    };
    getFilms();
  }, [user]);


  const addToFavorites = async (movie) => {
    if (!user) throw new Error("You need to be logged in!");
    
 
    if (favorites.some((fav) => fav.id === movie.id)) return;

    const updatedFavorites = [...favorites, movie];
    
   setFavorites(updatedFavorites);

   try {
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, { favorites_id: updatedFavorites });
    } catch (error) {
      console.error("Błąd zapisu ulubionego w DB:", error);
   }
  };

 const removeFromFavorites = async (movieId) => {
    if (!user) return;

    const updatedFavorites = favorites.filter((movie) => movie.id !== movieId);
    setFavorites(updatedFavorites);

    try {
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, { favorites_id: updatedFavorites });
    } catch (error) {
      console.error("Błąd usuwania ulubionego z DB:", error);
    }
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
      console.error(err);
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
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadPopularMovies();
  }, []);

  // --- Watchlists ---

  useEffect(() => {
    if (!user) {
      setWatchlists([]);
      console.error("You need to be logged in!");
    }
    const fetchLists = async () => {
      try {
        const colRef = collection(db, "users", user.uid, "watchlists");
        const snap = await getDocs(colRef);
        const lists = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setWatchlists(lists);
      }
    catch (err) {
      console.error("Error fetching watchlists:", err);
    }
    }
    fetchLists();
  }, [user]);
  const createWatchlist = async (name,desc) => {
    if (!user) return;
    try{
      const docRef = doc(db, "users", user.uid, "watchlists",name);
      const newList = {
        watchListName: name,
        watchListDesc: desc,
        createdAt: serverTimestamp(),
      };
      await setDoc(docRef, newList)
    setWatchlists((prev) => [...prev, { id: name, ...newList }]);
    }

    catch (err) {
      console.error("Error creating watchlist:", err);
    }
  }

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    movies,
    isLoading,
    error,
    fetchMoviesByQuery,
    
    watchlists,
    createWatchlist,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};