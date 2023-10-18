import { initializeApp } from "firebase/app";
import {getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyD9_7WE3_0gRVpzv6mtfFLIfoiZ9H4jGyY",
  authDomain: "react-table-54919.firebaseapp.com",
  projectId: "react-table-54919",
  storageBucket: "react-table-54919.appspot.com",
  messagingSenderId: "422885617849",
  appId: "1:422885617849:web:0a3d9ec53461b5e7b9eb68"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);