// src/firebase.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCw7wwVDyZQMz98pUKXyP3PhJnGHSGQTj0",
  authDomain: "note-taking-app-a6a0c.firebaseapp.com",
  projectId: "note-taking-app-a6a0c",
  storageBucket: "note-taking-app-a6a0c.firebasestorage.app",
  messagingSenderId: "1031197939380",
  appId: "1:1031197939380:web:6244b87b0691714e6e69e1",
  measurementId: "G-6259ESRKSP"
};

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
