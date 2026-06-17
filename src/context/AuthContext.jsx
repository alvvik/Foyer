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
const AuthContext = createContext();
import { db } from "../firebase";
export const useAuthContext = () => useContext(AuthContext);
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

  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const initAuth = async () => {
      try {
        await setPersistence(auth, browserLocalPersistence);
      } catch (error) {}
    };
    initAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => setUser(user));
    return () => unsubscribe();
  }, [auth]);
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
      await updateProfile(result.user, {
        displayName: userName,
      });
    } catch (error) {
      setError(authErrorTranslations[error.code] || error.code);
    } finally {
      setIsLoading(null);
    }
  };
  const callApiLoginWithEmail = async (email, password) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user);
      console.log(user);
    } catch (error) {
      setError(
        authErrorTranslations[error.code] ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setIsLoading(null);
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
      setIsLoading(null);
    }
  };
  const callApiLogOut = async () => {
    try {
      signOut(auth);
    } catch (error) {
      console.log(error.code);
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
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      userPicture: userPicture,
    });
  };

  
  const value = {
    user: user,
    error: error,
    isLoading: isLoading,
    callApiRegisterUserWithEmail,
    callApiLoginWithEmail,
    callApiResetPassowrd,
    callApiLogOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
