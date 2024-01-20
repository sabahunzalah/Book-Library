import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth,signInWithEmailAndPassword,createUserWithEmailAndPassword ,
  onAuthStateChanged ,signOut} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {  doc, setDoc , getFirestore,getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyBqY0-UWfiH2VL_ngP8eBW3jzh5S3gUHfI",
  authDomain: "book-library-432d4.firebaseapp.com",
  projectId: "book-library-432d4",
  storageBucket: "book-library-432d4.appspot.com",
  messagingSenderId: "630834194595",
  appId: "1:630834194595:web:d619b9ad012391bcf93716",
  measurementId: "G-JG79678TRG"
};
  // // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  export{
    auth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    doc, 
    setDoc, 
    db,
    getDoc
  }