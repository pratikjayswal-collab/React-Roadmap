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
  apiKey: "AIzaSyAHnwK5qaKs8nxBmjbymKGU6dL43-dzN50",
  authDomain: "blog-post-e1c7a.firebaseapp.com",
  projectId: "blog-post-e1c7a",
  storageBucket: "blog-post-e1c7a.firebasestorage.app",
  messagingSenderId: "1083314331640",
  appId: "1:1083314331640:web:9965eee196f1238fa5c00d",
  measurementId: "G-F6XJ6F8YS2"
};

const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);

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