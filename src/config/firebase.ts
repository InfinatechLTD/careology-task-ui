import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGxNCZky6BAmPOaTlHyoFiao_ds8jP6nY",
  authDomain: "careology-task-api.firebaseapp.com",
  projectId: "careology-task-api",
  storageBucket: "careology-task-api.appspot.com",
  messagingSenderId: "643780966794",
  appId: "1:643780966794:web:0f7712f1194be17615b073",
  measurementId: "G-C3Y59EB7E6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app); // Firebase Authentication

// Export Firebase services for use throughout your application
export { app, auth };
