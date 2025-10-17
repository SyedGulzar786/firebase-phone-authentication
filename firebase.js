import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBQjlm6ZK-6gAahwN_fgon8zxtSuKOOtS0",
  authDomain: "fir-assognment-1.firebaseapp.com",
  projectId: "fir-assognment-1",
  storageBucket: "fir-assognment-1.firebasestorage.app",
  messagingSenderId: "217878892831",
  appId: "1:217878892831:web:fbc75a91e56cc49f7c602a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {
  auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  RecaptchaVerifier,
  signInWithPhoneNumber
};