// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8wUx06LirzZTBpddOX6TCX8LSralFk0I",
  authDomain: "nyt-clone-3aa10.firebaseapp.com",
  projectId: "nyt-clone-3aa10",
  storageBucket: "nyt-clone-3aa10.firebasestorage.app",
  messagingSenderId: "804445296366",
  appId: "1:804445296366:web:4c654beeea439e7ce205ff",
  measurementId: "G-XYM632J0D1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Monitor authentication state
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Utente loggato:", user.email);
  } else {
    console.log("Nessun utente loggato");
  }
});

export { auth };