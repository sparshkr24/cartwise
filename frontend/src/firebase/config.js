
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

export const firebaseConfig = {
  apiKey: "AIzaSyA7xzObPnvAEh50LwOx0UFibx8rziVH-G8",
  authDomain: "eshop-1589a.firebaseapp.com",
  projectId: "eshop-1589a",
  storageBucket: "eshop-1589a.appspot.com",
  messagingSenderId: "461768616164",
  appId: "1:461768616164:web:5a3f0d4fdc33b424f7a4f1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth= getAuth(app)
export const db= getFirestore(app)
export const storage= getStorage(app)
export default app