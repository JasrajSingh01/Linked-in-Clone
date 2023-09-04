// import * as firebase from "firebase/";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyBdpceUBCfo4MjWzxPzYbpCy30xu-vBhX8",
  authDomain: "linked-in-f6397.firebaseapp.com",
  projectId: "linked-in-f6397",
  storageBucket: "linked-in-f6397.appspot.com",
  messagingSenderId: "23471486843",
  appId: "1:23471486843:web:cfa69e1a85951e650b2fde",
  measurementId: "G-JQ094KBTGZ",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };
