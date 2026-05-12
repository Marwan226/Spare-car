// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWIvv9hfKC38o82nCg0tOWxr9-TO-UWmA",
  authDomain: "sparecar-471d5.firebaseapp.com",
  projectId: "sparecar-471d5",
  storageBucket: "sparecar-471d5.firebasestorage.app",
  messagingSenderId: "647381188646",
  appId: "1:647381188646:web:3d5eebb67eb458c1e326e7",
  measurementId: "G-DPNH1ZGBC9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Google Provider
export const googleProvider = new GoogleAuthProvider();
