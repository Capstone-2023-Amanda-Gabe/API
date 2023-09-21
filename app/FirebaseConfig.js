import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth } from "firebase/auth";
import * as firebaseAuth from 'firebase/auth';
        
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyD99IiB3AMUnJRtR0BXVgODWvPGFLsonsE",
  authDomain: "looklog-75258.firebaseapp.com",
  projectId: "looklog-75258",
  storageBucket: "looklog-75258.appspot.com",
  messagingSenderId: "130705174691",
  appId: "1:130705174691:web:3e24b0f6d2f6b4971a4f16",
  measurementId: "G-2YJ4W6JZCE",
};

const reactNativePersistence = (firebaseAuth).getReactNativePersistence;
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: reactNativePersistence(ReactNativeAsyncStorage),
});
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);

