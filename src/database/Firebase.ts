import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// ~~~~~~~~~ skafe-ttime-PROD ~~~~~~~~~
const firebaseConfigSkafe = {
  apiKey: "AIzaSyAIIcpllk34NoiKzNMWM3UKPDCbQxhJ3B4",
  authDomain: "pos-skafe-d9d45.firebaseapp.com",
  projectId: "pos-skafe-d9d45",
  storageBucket: "pos-skafe-d9d45.appspot.com",
  messagingSenderId: "932308642463",
  appId: "1:932308642463:web:9ccd551d104dacdd51d0aa",
  measurementId: "G-38PD1BS5LdwM",
};

// Initialize Firebase and Firestore
const firebase = initializeApp(firebaseConfigSkafe);
const db = getFirestore(firebase);
const auth = getAuth(firebase);
const storage = getStorage(firebase);
export { db, firebase, auth, storage };
