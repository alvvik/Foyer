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

          // BONUS: Jeśli email w Firebase Auth zmienił się (użytkownik kliknął link),
          // a w Firestore jest stary, zaktualizuj go automatycznie tutaj!
          if (docSnap.data().email !== firebaseUser.email) {
            await updateDoc(docRef, { email: firebaseUser.email });
          }
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
        photoURL: "", // NAPRAWIONE: Usunięto nieistniejącą zmienną photoURL
      });
    } catch (error) {
      console.error("Błąd podczas rejestracji:", error);
      setError(error.message || "Wystąpił błąd podczas rejestracji.");
    } finally {
      setIsLoading(false);
    }
  };

  const callApiLogOut = async () => {
    try {
      setIsLoading(true);
      await signOut(auth);
    } catch (error) {
      console.error(error);
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
      throw new Error("Wpisz inny adres email.");
    }

    try {
      // Zmienia email natychmiast w bazie Firebase Auth, bez wysyłania linków!
      await updateEmail(auth.currentUser, email);
      console.log("Email zmieniony pomyślnie!");
    } catch (error) {
      console.error("Błąd podczas bezpośredniej zmiany email:", error);
      throw error;
    }
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
        lastUpdate: currentTimestamp,
        lastUpdate: serverTimestamp(),
      });

      const updatedSnap = await getDoc(docRef);
      if (updatedSnap.exists()) {
        setDbData(updatedSnap.data());
      }
    } catch (error) {
      console.error("Błąd podczas edycji profilu:", error);
      setError(error.message || "Nie udało się zaktualizować profilu.");
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
