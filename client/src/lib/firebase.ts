// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCx3vx0F1UVYvTAis6F6lVcXTfV9TJZIyM",
    authDomain: "farmtotable-2b296.firebaseapp.com",
    projectId: "farmtotable-2b296",
    storageBucket: "farmtotable-2b296.appspot.com",
    messagingSenderId: "398179539747",
    appId: "1:398179539747:web:c1741cbaa4b1605dde8a96"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
