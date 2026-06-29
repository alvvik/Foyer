import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  browserLocalPersistence,
  updateProfile,
  getAuth,
  onAuthStateChanged,
  setPersistence,
  signOut,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

const auth = getAuth();
const errorMap = {
  // --- SIGN IN & SIGN UP (General) ---
  "auth/invalid-email": "The email address is poorly formatted.",
  "auth/user-disabled":
    "This user account has been disabled by an administrator.",
  "auth/user-not-found": "There is no user corresponding to this email.",
  "auth/wrong-password": "Incorrect password. Please try again.",

  // --- SIGN UP (Account Creation) ---
  "auth/email-already-in-use":
    "An account already exists with this email address.",
  "auth/operation-not-allowed":
    "Email/password accounts are not enabled for this project.",
  "auth/weak-password":
    "The password is too weak. It must be at least 6 characters long.",

  // --- SECURITY, SESSIONS & NETWORK ---
  "auth/too-many-requests":
    "Too many unsuccessful login attempts. Access to this account has been temporarily disabled. Please try again later.",
  "auth/requires-recent-login":
    "This operation is sensitive and requires recent authentication. Please log in again.",
  "auth/network-request-failed":
    "A network error occurred. Please check your internet connection.",

  // --- MODERN FIREBASE CORE ERROR (v9/v10+) ---
  // Firebase often uses this generic error now to prevent email enumeration (security best practice)
  "auth/invalid-credential":
    "Invalid email or password. Please check your credentials and try again.",
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
      } catch (err) {
        const friendlyMessage =
          errorMap[err.code] || err.message || "An error occurred.";
        setError(friendlyMessage);
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

          if (docSnap.data().email !== firebaseUser.email) {
            await updateDoc(docRef, { email: firebaseUser.email });
          }
        }
      } catch (err) {
        const friendlyMessage =
          errorMap[err.code] || err.message || "An error occurred.";
        setError(friendlyMessage);
      }
    });

    return () => unsubscribe();
  }, []);

  const callApiLoginWithEmail = async (email, password) => {
    try {
      setIsLoading(true);
      setError(null);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      const friendlyMessage =
        errorMap[err.code] || err.message || "An error occurred.";
      setError(friendlyMessage);
      throw new Error(friendlyMessage);
    } finally {
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

      await setDoc(doc(db, "users", firebaseUser.uid), {
        uid: firebaseUser.uid,
        email: email,
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        photoURL: "",
        favorites_id: [],
      });
      // POPRAWNIE dla setDoc (musisz podać nazwę/ID listy):
      const listName = "Moje Ulubione";
      const listRef = doc(
        db,
        "users",
        firebaseUser.uid,
        "watchlists",
        listName,
      );
      await setDoc(listRef, {
        id: 0,
        watchlistName: listName,
        watchListDesc: "Moja domyślna lista ulubionych filmów.",
        createdAt: serverTimestamp(), // Użyj serverTimestamp
      });
    } catch (err) {
      const friendlyMessage =
        errorMap[err.code] || err.message || "An error occurred.";
      setError(friendlyMessage);
      throw new Error(friendlyMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const callApiLogOut = async () => {
    try {
      setIsLoading(true);
      await signOut(auth);
    } catch (err) {
      const friendlyMessage =
        errorMap[err.code] || err.message || "An error occurred.";
      setError(friendlyMessage);
      throw new Error(friendlyMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const changePassword = async ({ newPassword, confirmPassword }) => {
    if (newPassword !== confirmPassword) {
      throw new Error("Passwords do not match!");
    }
    await updatePassword(auth.currentUser, newPassword);
  };

  const changeEmail = async ({ email }) => {
    if (email === auth.currentUser.email) {
      throw new Error("Type another email!");
    }

    await updateEmail(auth.currentUser, email);
  };
  const editProfile = async ({
    email,
    firstName,
    lastName,
    userName,
    photoURL,
    currentPassword,
    newPassword,
    confirmPassword,
    currentTimestamp,
  }) => {
    try {
      setIsLoading(true);
      setError(null);

      if (!auth.currentUser) throw new Error("Użytkownik nie jest zalogowany.");

      // Reautentykacja (wymagana dla zmiany maila/hasła)

      if (!currentPassword) throw new Error("Enter your current password!");

      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        currentPassword,
      );
      await reauthenticateWithCredential(auth.currentUser, credential);

      // Zmiana hasła
      if (newPassword) {
        await changePassword({ newPassword, confirmPassword });
      }

      // Zmiana adresu email
      let emailVerifying = false;
      if (email && email !== auth.currentUser.email) {
        await changeEmail({ email });
        emailVerifying = true;
        // Informujemy użytkownika, że musi sprawdzić skrzynkę
        setError(
          "Zgłoszenie zmiany email przyjęte. Sprawdź nową skrzynkę pocztową, aby potwierdzić.",
        );
      }

      // Aktualizacja profilu Firebase Auth (display name i photo)
      await updateProfile(auth.currentUser, {
        displayName: userName || auth.currentUser.displayName,
        photoURL: photoURL || auth.currentUser.photoURL || "",
      });

      // Aktualizacja danych w Firestore
      const docRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(docRef, {
        // Ważne: Zapisujemy stary email z auth, dopóki nowy nie zostanie zweryfikowany kliknięciem w link!
        email: emailVerifying
          ? auth.currentUser.email
          : email || dbData?.email || "",
        firstName: firstName || "",
        lastName: lastName || "",
        userName: userName || "",
        photoURL: photoURL || "",

        lastUpdate: serverTimestamp(),
      });

      const updatedSnap = await getDoc(docRef);
      if (updatedSnap.exists()) {
        setDbData(updatedSnap.data());
      }
    } catch (err) {
      const friendlyMessage =
        errorMap[err.code] || err.message || "An error occurred.";
      setError(friendlyMessage);
      throw new Error(friendlyMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    dbData,
    isLoading,
    error,
    callApiLoginWithEmail,
    callApiRegisterUserWithEmail,
    callApiLogOut,
    editProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
