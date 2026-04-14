import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDuwehvOsCiGG7NU3PMta6dQ-J59t_5TbQ",
  authDomain: "portfolio-77cc6.firebaseapp.com",
  projectId: "portfolio-77cc6",
  storageBucket: "portfolio-77cc6.firebasestorage.app",
  messagingSenderId: "57169203932",
  appId: "1:57169203932:web:175152d3a6b3d49b9b1a19",
  measurementId: "G-BT24HQBX7D"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
const analytics = getAnalytics(app);