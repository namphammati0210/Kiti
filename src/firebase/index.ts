// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYkrTwJ462kvTf-nOM8WGfDn9GmPRmYRA",
  authDomain: "kiti-cb5ce.firebaseapp.com",
  projectId: "kiti-cb5ce",
  storageBucket: "kiti-cb5ce.appspot.com",
  messagingSenderId: "536918764200",
  appId: "1:536918764200:web:054576c157acaf6559709d",
  measurementId: "G-S0NXYYHNKY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const storage = getStorage(app);
