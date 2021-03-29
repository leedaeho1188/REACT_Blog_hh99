import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBwaeIyfVlfm-o1OIlSfUJJU3wkSl3o3vw",
  authDomain: "react-blog-hh99.firebaseapp.com",
  projectId: "react-blog-hh99",
  storageBucket: "react-blog-hh99.appspot.com",
  messagingSenderId: "533268782932",
  appId: "1:533268782932:web:f7832c9715806f1b83b2c1",
  measurementId: "G-W0V6ZMSG39"
};

firebase.initializeApp(firebaseConfig);

const apiKey = firebaseConfig.apiKey;
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();
const realtime = firebase.database();
export{auth, apiKey, firestore, storage, realtime};