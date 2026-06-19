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
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

const auth = getAuth();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [dbData, setDbData] = useState(null);
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

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setDbData(null);
        setIsLoading(false);
        return;
      }

      setUser(firebaseUser);
      setIsLoading(false);

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

  const callApiRegisterUserWithEmail = async (
    email,
    password,
    firstName,
    lastName,
    userName,
  ) => {
    try {
      setIsLoading(true);
      setError(null);

      // 1. Rejestracja użytkownika w Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const firebaseUser = userCredential.user;

      await updateProfile(firebaseUser, {
        displayName: userName,
        photoURL: "",
      });

      // 3. Zapis dodatkowych danych do Firestore do kolekcji "users"
      await setDoc(doc(db, "users", firebaseUser.uid), {
        uid: firebaseUser.uid,
        email: email,
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        photoURL: photoURL || "",
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Błąd podczas rejestracji:", error);
      setError(error.message || "Wystąpił błąd podczas rejestracji.");
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

  const editProfile = async ({
    email,
    firstName,
    lastName,
    userName,
    photoURL,
  }) => {
    try {
      setIsLoading(true);
      setError(null);

      if (!auth.currentUser) throw new Error("Użytkownik nie jest zalogowany.");

      // Aktualizacja profilu Firebase Auth
      await updateProfile(auth.currentUser, {
        displayName: userName || auth.currentUser.displayName,
        photoURL: photoURL || auth.currentUser.photoURL || "",
      });

      // Aktualizacja Firestore (zabezpieczenie przed undefined za pomocą operatora || "")
      const docRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(docRef, {
        email: email || dbData?.email || "",
        firstName: firstName || "",
        lastName: lastName || "",
        userName: userName || "",
        photoURL: photoURL || "",
      });

      // Pobranie świeżych danych do stanu aplikacji
      const updatedSnap = await getDoc(docRef);
      if (updatedSnap.exists()) {
        setDbData(updatedSnap.data());
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Błąd podczas edycji profilu:", error);
      setError(error.message || "Nie udało się zaktualizować profilu.");
      setIsLoading(false);
    }
  };
  // Przekazujemy oba stany oraz nową funkcję rejestracji do aplikacji
  const value = {
    user,
    dbData,
    isLoading,
    error,
    callApiLoginWithEmail,
    callApiRegisterUserWithEmail, // <--- Dodane tutaj
    callApiLogOut,
    editProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
