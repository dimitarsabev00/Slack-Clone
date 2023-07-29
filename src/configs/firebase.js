// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8jC-SctNV2HSHh_mXt2VgrD4bD1QdakY",
  authDomain: "slack-clone-93b9e.firebaseapp.com",
  projectId: "slack-clone-93b9e",
  storageBucket: "slack-clone-93b9e.appspot.com",
  messagingSenderId: "1018292863959",
  appId: "1:1018292863959:web:dfdd252b009c6d0d7d0192",
  measurementId: "G-N7B7T0MG4G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
