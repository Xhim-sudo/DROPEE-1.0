
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, auth, db, storage };
