import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  browserLocalPersistence,
  updateProfile,
  getAuth,
  onAuthStateChanged,
  setPersistence,
  signOut,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

const auth = getAuth();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [dbData, setDbData] = useState(null); // Osobny stan na dane z Firestore!
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      try {
        await setPersistence(auth, browserLocalPersistence);
      } catch (error) {
        console.error("Persistence error:", error);
      }
    };
    initAuth();

    // Słuchacz sesji zajmuje się WYŁĄCZNIE kontem Firebase, nie dotyka obiektów
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setDbData(null);
        setIsLoading(false);
        return;
      }

      // Ustawiamy TYLKO czysty obiekt Firebase i natychmiast wyłączamy loader.
      // To daje 100% gwarancji, że strona przestanie wisieć!
      setUser(firebaseUser);
      setIsLoading(false);

      // Dane z Firestore dociągamy bezpiecznie obok
      try {
        const docRef = doc(db, "users", firebaseUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setDbData(docSnap.data());
        }
      } catch (err) {
        console.error("Błąd pobierania Firestore:", err);
      }
    });

    return () => unsubscribe();
  }, []);

  const callApiLoginWithEmail = async (email, password) => {
    try {
      setIsLoading(true);
      setError(null);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError("Invalid email or password.");
      setIsLoading(false);
    }
  };

  const callApiLogOut = async () => {
    try {
      setIsLoading(true);
      await signOut(auth);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  // Przekazujemy oba stany do aplikacji
  const value = {
    user,
    dbData,
    isLoading,
    error,
    callApiLoginWithEmail,
    callApiLogOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
