// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5lXPhp97_X6BbSv68uP9wpG08TjhX4Xs",
  authDomain: "travelapp-35043.firebaseapp.com",
  projectId: "travelapp-35043",
  storageBucket: "travelapp-35043.firebasestorage.app",
  messagingSenderId: "903006564753",
  appId: "1:903006564753:web:f749001d1772f75dfdaa30"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };