// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//     apiKey: "AIzaSyDEsvEAGUe6FIENvim-zMW9FGI42oqKWwo",
//     authDomain: "seedinov-10c6d.firebaseapp.com",
//     projectId: "seedinov-10c6d",
//     storageBucket: "seedinov-10c6d.appspot.com",
//     messagingSenderId: "236955398977",
//     appId: "1:236955398977:web:a3720758783694be06e7c0",
//     measurementId: "G-BMPF4GQYBL"
// };
const firebaseConfig = {
    apiKey: "AIzaSyDd3_99ah89KHWcfqZ5Cq-61X0RbiYXFWA",
    authDomain: "resturant-project-78f0c.firebaseapp.com",
    databaseURL: "https://resturant-project-78f0c-default-rtdb.firebaseio.com",
    projectId: "resturant-project-78f0c",
    storageBucket: "resturant-project-78f0c.appspot.com",
    messagingSenderId: "378428046233",
    appId: "1:378428046233:web:fe785e15fb796b74def108"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;