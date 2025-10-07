// src/firebase.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get instances of the services you'll use
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// ******************************************************
// * ENABLE THIS SECTION TO CONNECT TO FIREBASE EMULATORS  *
// ******************************************************
if (location.hostname === "localhost") {
  console.log("🔥 Connecting to Firebase Emulators..."); // Added for clarity
  // Connect Auth Emulator (port 9099)
  connectAuthEmulator(auth, "http://localhost:9099");
  // Connect Firestore Emulator (port 8080 or the one you set if different)
  connectFirestoreEmulator(db, "localhost", 8080);
}
// ******************************************************


// Export the initialized services so you can use them throughout your app
export { app, analytics, auth, db };
