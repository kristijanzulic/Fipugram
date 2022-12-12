import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut, onAuthStateChanged  } from "firebase/auth";
import { getStorage} from 'firebase/storage';
import { getFirestore, collection, addDoc, getDocs,getDoc, setDoc, doc, query, where, orderBy, limit  } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAA_UTKF4YvC23xWdAiguan2zgzJ8KVouI",
  authDomain: "fipugram-30c71.firebaseapp.com",
  projectId: "fipugram-30c71",
  storageBucket: "fipugram-30c71.appspot.com",
  messagingSenderId: "767904272027",
  appId: "1:767904272027:web:6c0edaf930e5b78af9c03e",
  measurementId: "G-5QZ3QTE1Z3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export {
  getAuth,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  storage, 
  collection, 
  getDocs,
  signOut,
  onAuthStateChanged,
  db,
  addDoc,
  setDoc,
  doc,
  query,
  where,
  getDoc,
  orderBy,
  limit
}


