import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyA8r--EUx-GRi7la-9fmNcC6BJIAR9Z45o",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "boringbizaiv2.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "boringbizaiv2",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "boringbizaiv2.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "148226404679",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:148226404679:web:2d94b17b0df77639119c62",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-QHDG1W2E02",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Initialize analytics only on client side
if (typeof window !== "undefined") {
  isSupported().then(yes => {
    if (yes) {
      getAnalytics(app);
    }
  });
}

export default app;
