import firebase from "firebase/app";
import "firebase/firestore"
import "firebase/auth"

firebase.initializeApp({
  apiKey: "AIzaSyALnQpF5YfJnVoGSSaCRLlPpuvxEptJuH8",
  authDomain: "to-do-list-ff102.firebaseapp.com",
  projectId: "to-do-list-ff102",
  storageBucket: "to-do-list-ff102.appspot.com",
  messagingSenderId: "41070404754",
  appId: "1:41070404754:web:561208489a7ce3a09bf24b",
  measurementId: "G-YPV9MJDGCM",
});

const db = firebase.firestore();

export const auth = firebase.auth();
export { db };
