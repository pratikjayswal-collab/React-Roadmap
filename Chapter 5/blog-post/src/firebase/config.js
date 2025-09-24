// src/firebase.js

// Import the functions you need from the Firebase SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Import specific service functions for Firestore, Storage, and Authentication
import { getFirestore, connectFirestoreEmulator} from "firebase/firestore"; // For Cloud Firestore
import { getStorage, connectStorageEmulator } from "firebase/storage";     // For Cloud Storage for Firebase
import { getAuth, connectAuthEmulator } from "firebase/auth";           // For Firebase Authentication

// Your web app's Firebase configuration
// (This is the exact object you provided)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
}

const app = initializeApp(firebaseConfig)

export const analytics = getAnalytics(app)

// Initialize and export the other Firebase services you'll use:
export const db = getFirestore(app);      // This is your Cloud Firestore instance
export const storage = getStorage(app);  // This is your Cloud Storage instance
export const auth = getAuth(app);        // This is your Firebase Authentication instance

// Now you can import `app`, `analytics`, `db`, `storage`, and `auth`
// into any of your React components or utility files.

if (location.hostname === "localhost") {
  connectFirestoreEmulator(db, "localhost", 8080);
  connectStorageEmulator(storage, "localhost", 9199);
  connectAuthEmulator(auth, "http://localhost:9099");
}