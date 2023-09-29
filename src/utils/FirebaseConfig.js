// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAbVrgXQEyGfD8UFnOLdt3nZbFcQZ9A4A0",
  authDomain: "cura-5aa30.firebaseapp.com",
  projectId: "cura-5aa30",
  storageBucket: "cura-5aa30.appspot.com",
  messagingSenderId: "547674373172",
  appId: "1:547674373172:web:f3419ce708a33fc6e21e61",
  measurementId: "G-V9DVPLB6ZC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
