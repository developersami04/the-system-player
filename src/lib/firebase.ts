import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "system-ascent",
  appId: "1:145955106382:web:e35988ebadc2ffb2a31d1f",
  storageBucket: "system-ascent.firebasestorage.app",
  apiKey: "AIzaSyBVTeurWbsOgsLIQ-GzuVdoE442N5YlXMg",
  authDomain: "system-ascent.firebaseapp.com",
  messagingSenderId: "145955106382"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
