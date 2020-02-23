import firebase from "firebase/app";
import 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOJsL-deiYtBT7avrrIENWhp1ynKjkorw",
  authDomain: "notes-list-a8d83.firebaseapp.com",
  databaseURL: "https://notes-list-a8d83.firebaseio.com",
  projectId: "notes-list-a8d83",
  storageBucket: "notes-list-a8d83.appspot.com",
  messagingSenderId: "436541022356",
  appId: "1:436541022356:web:0b07c828155242f5e31481"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;