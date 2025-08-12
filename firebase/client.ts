// Import the functions you need from the SDKs you need
import { initializeApp,getApp,getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {

  apiKey: "AIzaSyAr2xYrUkE4_rC_57-iwi4hpSHrvyYsFxU",
  authDomain: "mock-interviews-9e751.firebaseapp.com",
  projectId: "mock-interviews-9e751",
  storageBucket: "mock-interviews-9e751.firebasestorage.app",
  messagingSenderId: "182790806544",
  appId: "1:182790806544:web:6650f0a829da977b557e95",
  measurementId: "G-LRVWZG7E18"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
