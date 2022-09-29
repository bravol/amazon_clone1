// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBkAmKh7DoT52BCy-MMM-O-srTPDqNXZ14",
  authDomain: "clone1-95815.firebaseapp.com",
  projectId: "clone1-95815",
  storageBucket: "clone1-95815.appspot.com",
  messagingSenderId: "147028391958",
  appId: "1:147028391958:web:6849f9de259131dc289d37",
  measurementId: "G-KVCGEV5BJE",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
