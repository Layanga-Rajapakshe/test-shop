// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNOT20VJBWm7hpt0ZAI1sXsRWLIjjQBlI",
  authDomain: "test-shop-f9652.firebaseapp.com",
  projectId: "test-shop-f9652",
  storageBucket: "test-shop-f9652.firebasestorage.app",
  messagingSenderId: "786713295768",
  appId: "1:786713295768:web:49b8d88fd10e87f855c9ed"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};