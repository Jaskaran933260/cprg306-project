import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAhSHVeQBzh_S13JkQmbTF0MpyB7LNf834",
    authDomain: "newsnext-306.firebaseapp.com",
    projectId: "newsnext-306",
    storageBucket: "newsnext-306.firebasestorage.app",
    messagingSenderId: "253789062329",
    appId: "1:253789062329:web:0ba3694db0769e7ea3c768"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
