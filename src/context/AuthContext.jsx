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
        setIsLoading(false);
        return;
      }

      // 2. Dane z bazy Firestore dociągamy w tle (asynchronicznie)
      try {
        const docRef = doc(db, "users", firebaseUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUser({
            uid: firebaseUser.uid,
            displayName: firebaseUser.displayName || docSnap.data().userName,
            ...docSnap.data(),
          });
        } else {
          setUser(firebaseUser);
        }
      } catch (err) {
        console.error("Błąd pobierania profilu z bazy:", err);
        // W razie błędu sieci/Brave i tak logujemy usera z podstawowymi danymi Auth
        setUser(firebaseUser);
      } finally {
        setIsLoading(false);
      }
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

      await addUserToDb(result.user, email, firstName, lastName, userName);
      await updateProfile(result.user, { displayName: userName });
    } catch (error) {
      setError(authErrorTranslations[error.code] || error.code);
      setIsLoading(false);
    }
  };

  const callApiLoginWithEmail = async (email, password) => {
    try {
      setIsLoading(true);
      setError(null);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(
        authErrorTranslations[error.code] ||
          "Something went wrong. Please try again.",
      );
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
    } catch (error) {
      console.error("Logout error:", error.code);
      setIsLoading(false);
    }
  };

  const addUserToDb = async (
    user,
    email = "",
    firstName = "",
    lastName = "",
    userName = "",
    userPicture = "",
    theme = "dark",
  ) => {
    await setDoc(doc(db, "users", user.uid), {
      email,
      firstName,
      lastName,
      userName,
      userPicture,
      theme,
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
