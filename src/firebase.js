import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBGgZjc9z0XHWX_2PnyTQwlWDzSkVzBKyA",
  authDomain: "prime-holding-assignment.firebaseapp.com",
  projectId: "prime-holding-assignment",
  storageBucket: "prime-holding-assignment.appspot.com",
  messagingSenderId: "624431466628",
  appId: "1:624431466628:web:d1df97a82200ab540e5ad1",
  measurementId: "G-SQ69Z243VE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
