
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsMXEOh2edINufHGpqgOQTY-ZEWM3oBfU",
  authDomain: "dropee-ecom.firebaseapp.com",
  databaseURL: "https://dropee-ecom-default-rtdb.firebaseio.com",
  projectId: "dropee-ecom",
  storageBucket: "dropee-ecom.appspot.com",
  messagingSenderId: "85111869758",
  appId: "1:85111869758:web:3187d43499c6d0b4dc9c6f",
  measurementId: "G-K4X5F3905H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Set up Firestore security rules for development
// These rules allow read/write access without authentication during development
// In production, you should secure your database with proper rules
if (import.meta.env.DEV) {
  console.log("Using development mode for Firebase");
  // You can uncomment these lines if you want to use Firebase emulators
  // connectAuthEmulator(auth, "http://localhost:9099");
  // connectFirestoreEmulator(db, "localhost", 8080);
  // connectStorageEmulator(storage, "localhost", 9199);
}

export { app, analytics, auth, db, storage };
