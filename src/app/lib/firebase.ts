/* eslint-disable @typescript-eslint/no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDv6elUl1Q1S9QD_Iw53nKTYqBc9Yiu8GI",
    authDomain: "telegram-task-af808.firebaseapp.com",
    projectId: "telegram-task-af808",
    storageBucket: "telegram-task-af808.firebasestorage.app",
    messagingSenderId: "295344938884",
    appId: "1:295344938884:web:9b8ab2f0d8d1ba983fc7d1",
    measurementId: "G-CL83Z6ZWZR"
};

// Initialize Firebase
let app;
let db: Firestore;

if (typeof window !== 'undefined') {
    app = initializeApp(firebaseConfig)
    db = getFirestore(app)
}

export { db };
