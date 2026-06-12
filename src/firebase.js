// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxNT6oDy1l_6xOnaWPO4NMnPYzKCN_Tmw",
  authDomain: "cinemaapp-55277.firebaseapp.com",
  projectId: "cinemaapp-55277",
  storageBucket: "cinemaapp-55277.firebasestorage.app",
  messagingSenderId: "574979703214",
  appId: "1:574979703214:web:b56defc81925e9c0b6083f",
  measurementId: "G-EV8YK3M68Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
