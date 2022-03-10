import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { GoogleAuthProvider } from "firebase/auth";
import firebase from "firebase/app"


/* code from our Firebase console */
export const firebaseConfig = {
    apiKey: "AIzaSyA1cT8i9c49-ZqV4Zy_DdpFzGzo5fiqKtY",
    authDomain: "newess-f2f7a.firebaseapp.com",
    projectId: "newess-f2f7a",
    storageBucket: "newess-f2f7a.appspot.com",
    messagingSenderId: "955088738310",
    appId: "1:955088738310:web:840385e6042f1fae0a4b87",
    measurementId: "G-1QXHP5NTWY"
};




// Initialize Firebase
initializeApp(firebaseConfig);
// init firebase auth

const provider = new GoogleAuthProvider();
const auth = getAuth();
export { auth, provider }



