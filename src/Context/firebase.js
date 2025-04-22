// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // for database
import { getAuth } from "firebase/auth"; // for auth (login/signup)
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASZ_4SYtPaqraTflX27bXbgzK9jMag2L8",
  authDomain: "khally-beddings.firebaseapp.com",
  projectId: "khally-beddings",
  storageBucket: "khally-beddings.firebasestorage.app",
  messagingSenderId: "457761861233",
  appId: "1:457761861233:web:e7604d669a041bcb5675d0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);