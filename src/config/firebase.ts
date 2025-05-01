
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

export { app, analytics };
