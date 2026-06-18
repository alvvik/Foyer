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
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

const auth = getAuth();

const authErrorTranslations = {
  "auth/email-already-in-use":
    "This email address is already registered to another account.",
  "auth/weak-password":
    "The password is too weak. It must be at least 6 characters long.",
  "auth/invalid-email": "The provided email address format is invalid.",
  "auth/wrong-password": "Invalid email or password.",
  "auth/user-not-found": "Invalid email or password.",
  "auth/invalid-credential": "Invalid email or password.",
  "auth/user-disabled": "This account has been disabled by an administrator.",
  "auth/too-many-requests": "Too many failed requests. Please try again later.",
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

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

    // onAuthStateChanged sam w sobie pilnuje aktualnego użytkownika
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

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

      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      await addUserToDb(result.user, firstName, lastName, userName);
      await updateProfile(result.user, { displayName: userName });

      setUser({ ...result.user, displayName: userName });
    } catch (error) {
      setError(authErrorTranslations[error.code] || error.code);
    } finally {
      setIsLoading(false);
    }
  };

  const callApiLoginWithEmail = async (email, password) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user);
    } catch (error) {
      setError(
        authErrorTranslations[error.code] ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const callApiResetPassowrd = async (email) => {
    try {
      setIsLoading(true);
      setError(null);
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      setError(
        authErrorTranslations[error.code] ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const callApiLogOut = async () => {
    try {
      setIsLoading(true);
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.log(error.code);
    } finally {
      setIsLoading(false);
    }
  };

  const addUserToDb = async (
    user,
    firstName = "",
    lastName = "",
    userName = "",
    userPicture = "",
  ) => {
    await setDoc(doc(db, "users", user.uid), {
      firstName,
      lastName,
      userName,
      userPicture,
    });
  };

  const value = {
    user,
    error,
    isLoading,
    callApiRegisterUserWithEmail,
    callApiLoginWithEmail,
    callApiResetPassowrd,
    callApiLogOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
