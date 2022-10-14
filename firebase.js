import firebase from "firebase/compat/app";
import  'firebase/compat/auth';
import   'firebase/compat/firestore';
import   'firebase/compat/storage';
const firebaseConfig = {
    apiKey: "AIzaSyCg4fWtJbzh1L_0s0JfNWxBJQQuz3pD0gU",
    authDomain: "webchat-f9041.firebaseapp.com",
    projectId: "webchat-f9041",
    storageBucket: "webchat-f9041.appspot.com",
    messagingSenderId: "963291022702",
    appId: "1:963291022702:web:34f6d23831e0fa7b6e2d7f",
    measurementId: "G-KKRHXTQ6W6"
  }; 
  
  
  
  const app = firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();

  const db = app.firestore();

  const googleProvider = new firebase.auth.GoogleAuthProvider();

  export {auth, googleProvider};

  export default db;