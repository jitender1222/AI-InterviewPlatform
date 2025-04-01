import { getApps, getApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_KIzP_M0Mzzo_JS5OMn9JLfTBUljJTBA",
  authDomain: "prepwiseinterviewplatform.firebaseapp.com",
  projectId: "prepwiseinterviewplatform",
  storageBucket: "prepwiseinterviewplatform.firebasestorage.app",
  messagingSenderId: "765973924331",
  appId: "1:765973924331:web:00ad419418077845dc31ae",
  measurementId: "G-HLHELVQ5V8",
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
