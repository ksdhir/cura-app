// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyAbVrgXQEyGfD8UFnOLdt3nZbFcQZ9A4A0",
  authDomain: "cura-5aa30.firebaseapp.com",
  projectId: "cura-5aa30",
  storageBucket: "cura-5aa30.appspot.com",
  messagingSenderId: "547674373172",
  appId: "1:547674373172:web:a41f5e7b00c702fce21e61",
  measurementId: "G-GPWKN9GL0N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Client ID
// IOS: 636016776817-tfb4aa52f4qcacggp3ba54a8t40dl3a3.apps.googleusercontent.com
// Android: 636016776817-dnlogoh0m9aesah3d5a10b9oprl012sd.apps.googleusercontent.com
