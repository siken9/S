// ============================================
// FIREBASE CONFIGURATION
// ============================================
// GANTI dengan config Anda dari Firebase Console!

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

// TODO: Ganti dengan Firebase Config Anda
const firebaseConfig = {
  apiKey: "AIzaSyD9-2283yESq7s5gcjomOzIPCFY7F1CWt4",
  authDomain: "siken9-402ff.firebaseapp.com",
  projectId: "siken9-402ff",
  storageBucket: "siken9-402ff.appspot.com",
  messagingSenderId: "196080912502",
  appId: "1:196080912502:web:838c9862e21d994c4ef757",
  measurementId: "G-HTL1FL69CZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Export untuk digunakan di file lain
export { app, db, auth };
