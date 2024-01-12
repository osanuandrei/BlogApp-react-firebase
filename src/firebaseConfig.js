import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxH68ozA_BIYukqCE3rqqG0Nig4gc8uGc",
  authDomain: "blogapp-8993d.firebaseapp.com",
  projectId: "blogapp-8993d",
  storageBucket: "blogapp-8993d.appspot.com",
  messagingSenderId: "1022155031926",
  appId: "1:1022155031926:web:ce3675c91c0f67f3abe657"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);

