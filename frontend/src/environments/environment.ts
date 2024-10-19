// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoq4KOOID6PuFETi-SideQHX78mJvpnbY",
  authDomain: "vgu-attendance-management.firebaseapp.com",
  projectId: "vgu-attendance-management",
  storageBucket: "vgu-attendance-management.appspot.com",
  messagingSenderId: "251948816899",
  appId: "1:251948816899:web:c8e6124bfb11bf8a914c36",
  measurementId: "G-W39BVMLVST"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);