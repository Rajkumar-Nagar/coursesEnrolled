
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDGjWGep7XbAnLrFY1O3gb0s7a-FuU4tq8",
    authDomain: "assignement-dfebf.firebaseapp.com",
    projectId: "assignement-dfebf",
    storageBucket: "assignement-dfebf.appspot.com",
    messagingSenderId: "290777069645",
    appId: "1:290777069645:web:2bfaece964c0e933b6c404",
    measurementId: "G-4MHW02XPF0"
  };

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {db};

