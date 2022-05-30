import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyBkzoNei10t5oJjMLI3EOnoI_ez2qXfuDk",
  authDomain: "santasala.firebaseapp.com",
  databaseURL: "https://santasala-default-rtdb.firebaseio.com",
  projectId: "santasala",
  storageBucket: "santasala.appspot.com",
  messagingSenderId: "372949135721",
  appId: "1:372949135721:web:dec086a97123aba0a00df8",
};

const app = initializeApp(firebaseConfig);

export default app;
