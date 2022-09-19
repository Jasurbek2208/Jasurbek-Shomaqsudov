import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDEGmBXTzfY0dciLjKlLuLrO4bD1jP4Ik0",
  authDomain: "myportfolio-3f3dc.firebaseapp.com",
  projectId: "myportfolio-3f3dc",
  storageBucket: "myportfolio-3f3dc.appspot.com",
  messagingSenderId: "126458330665",
  appId: "1:126458330665:web:601b66a25d1e12c046e638",
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
