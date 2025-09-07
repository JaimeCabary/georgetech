// src/services/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyA1mmE7z7FmuIUC2g4Gl7BVal7tFKYx6-I",
  authDomain: "bazlinga.firebaseapp.com",
  projectId: "bazlinga",
  storageBucket: "bazlinga.firebasestorage.app",
  messagingSenderId: "67405953126",
  appId: "1:67405953126:web:024039120917dadab2d5a7",
  measurementId: "G-HH87VVRL8W"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;