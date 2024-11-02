// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCScqNEMRUQub27vZtICUcWfVu0UMepjvY",
  authDomain: "pairtag-39282.firebaseapp.com",
  projectId: "pairtag-39282",
  storageBucket: "pairtag-39282.appspot.com",
  messagingSenderId: "650854806089",
  appId: "1:650854806089:web:eb8d75ef110c7ad85a4598",
  measurementId: "G-G8WEW9WD22"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);