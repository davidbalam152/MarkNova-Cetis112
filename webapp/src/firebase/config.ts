
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAorSZr44Hk-710MW-YnZDtplf01xsoFAI",
  authDomain: "marknova-web-32494893-b7cd3.firebaseapp.com",
  projectId: "marknova-web-32494893-b7cd3",
  storageBucket: "marknova-web-32494893-b7cd3.firebasestorage.app",
  messagingSenderId: "962581983800",
  appId: "1:962581983800:web:3a47f2792d70dc98eaeccd"
};
// Inicialización robusta de Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
