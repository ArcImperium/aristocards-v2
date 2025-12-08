// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQT0bUuEJLPe0i-FleeqeZLr1-1V31mJw",
  authDomain: "aristocards.firebaseapp.com",
  projectId: "aristocards",
  storageBucket: "aristocards.firebasestorage.app",
  messagingSenderId: "409068644568",
  appId: "1:409068644568:web:b5cf6c7bb4dc6347788fad",
  measurementId: "G-4XS5M6Y1WM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app)