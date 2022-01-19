import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

/* code from our Firebase console */
export const firebaseConfig = {
    apiKey: "AIzaSyADF7gz1YNmdn24NjAcgDyH4eg6f3VakTM",
    authDomain: "essme-a1f34.firebaseapp.com",
    databaseURL: "https://essme-a1f34-default-rtdb.firebaseio.com",
    projectId: "essme-a1f34",
    storageBucket: "essme-a1f34.appspot.com",
    messagingSenderId: "866100688770",
    appId: "1:866100688770:web:22f3094f13fa05db69819b"
};

// Initialize Firebase
initializeApp(firebaseConfig);

// init firebase auth
const auth = getAuth()

export { auth }

