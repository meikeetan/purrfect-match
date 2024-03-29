import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgx8LWTK1tA-z6TQRgGLVJypZSVQ_5L6M",
  authDomain: "house-marketplace-app-d5b92.firebaseapp.com",
  projectId: "house-marketplace-app-d5b92",
  storageBucket: "house-marketplace-app-d5b92.appspot.com",
  messagingSenderId: "439523446868",
  appId: "1:439523446868:web:9a5a0c5775917661ba5dc1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()