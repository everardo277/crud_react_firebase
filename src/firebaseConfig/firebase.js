
import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyCmwIYuWkt2bpZKkjtRRTUb1JOt0wVwGOk",
  authDomain: "crud-fire-react-1f314.firebaseapp.com",
  projectId: "crud-fire-react-1f314",
  storageBucket: "crud-fire-react-1f314.appspot.com",
  messagingSenderId: "610543547793",
  appId: "1:610543547793:web:8378fde69d72112aef9630"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)