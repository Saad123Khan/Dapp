import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseStack = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyD4SUWdOQiTObVBBQZeoGfGobPRe03InbE",
    authDomain: "dapp-69b90.firebaseapp.com",
    databaseURL: "https://dapp-69b90-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "dapp-69b90",
    storageBucket: "dapp-69b90.appspot.com",
    messagingSenderId: "4357494553",
    appId: "1:4357494553:web:b8ac85028b2aef11d11788",
    measurementId: "G-L3FDY1N0EK"
  };
  const app = initializeApp(firebaseConfig);
  return getDatabase(app);
};

export default firebaseStack;
