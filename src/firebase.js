// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase'


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdZYm7kkCGCFq9VO8b2ICcDygus0Po7Eg",
  authDomain: "clone-1eebe.firebaseapp.com",
  projectId: "clone-1eebe",
  storageBucket: "clone-1eebe.appspot.com",
  messagingSenderId: "655631335156",
  appId: "1:655631335156:web:9e4a862e4660342c0f28a1",
  measurementId: "G-L535FD35MD"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
export {db,auth};