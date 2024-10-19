import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your Firebase configuration
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
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { auth, app, analytics };
