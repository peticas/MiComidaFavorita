// Import the functions you need from the SDKs you need
import '@expo/metro-runtime';
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnoxKvyKxyH9TchcGGygXSxb3EJf_G58U",
  authDomain: "micomidafavorita-43cb4.firebaseapp.com",
  projectId: "micomidafavorita-43cb4",
  storageBucket: "micomidafavorita-43cb4.firebasestorage.app",
  messagingSenderId: "501374352282",
  appId: "1:501374352282:web:bcf21de1adf6c0be18d823",
  measurementId: "G-B7CDJEPG03"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);