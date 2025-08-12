// src/lib/firebase.js
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// Firebase configuration (keep as-is for now; later move to .env)
const firebaseConfig = {
  apiKey: "AIzaSyDHd5397ki8W_fJd16wGERkGm14G_6Xz_A",
  authDomain: "mehndibysimra-1103b.firebaseapp.com",
  projectId: "mehndibysimra-1103b",
  storageBucket: "mehndibysimra-1103b.appspot.com", // Fixed bucket domain
  messagingSenderId: "1062330587910",
  appId: "1:1062330587910:web:54935950b69e7af347dc87",
  measurementId: "G-2S4FGE30LY",
};

// Ensure only one app instance is created (avoids duplicate initialization in dev)
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

// Firestore instance (for reviews collection, etc.)
export const db = getFirestore(app);

// Optional: Analytics (only if supported + client environment)
let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((ok) => {
    if (ok) analytics = getAnalytics(app);
  });
}

export { app, analytics };
