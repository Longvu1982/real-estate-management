import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "house-map-71f60.firebaseapp.com",
  projectId: "house-map-71f60",
  storageBucket: "house-map-71f60.appspot.com",
  messagingSenderId: "1027001393456",
  appId: "1:1027001393456:web:c57f7ed32a72b6cc79a8f5",
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export default db;
