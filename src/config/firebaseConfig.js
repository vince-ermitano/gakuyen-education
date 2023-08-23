import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfigString = process.env.REACT_APP_FIREBASE_CONFIG;
const firebaseConfig = JSON.parse(firebaseConfigString);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);