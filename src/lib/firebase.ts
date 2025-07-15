// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth , GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBhmZ9pBhmNtmQbLqL0B5YJ8dSaICknr54",
  authDomain: "borm-3b23d.firebaseapp.com",
  projectId: "borm-3b23d",
  storageBucket: "borm-3b23d.firebasestorage.app",
  messagingSenderId: "859647236775",
  appId: "1:859647236775:web:7c5fccb6b7d45208ee5982",
  measurementId: "G-JMB36F8SMN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();