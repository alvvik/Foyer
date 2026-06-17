
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";





const firebaseConfig = {
  apiKey: "AIzaSyCxNT6oDy1l_6xOnaWPO4NMnPYzKCN_Tmw",
  authDomain: "cinemaapp-55277.firebaseapp.com",
  projectId: "cinemaapp-55277",
  storageBucket: "cinemaapp-55277.firebasestorage.app",
  messagingSenderId: "574979703214",
  appId: "1:574979703214:web:b56defc81925e9c0b6083f",
  measurementId: "G-EV8YK3M68Q",
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
