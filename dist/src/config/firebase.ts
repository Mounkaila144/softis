import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Votre configuration Firebase
const firebaseConfig = {
  // Remplacez ces valeurs par celles de votre projet
  apiKey: "AIzaSyDjbHcvCVl8kUKJgDdQtO-eyVoLYkTy1Bw",
  authDomain: "softis-a8ac1.firebaseapp.com",
  projectId: "softis-a8ac1",
  storageBucket: "softis-a8ac1.appspot.com",
  messagingSenderId: "686422979347",
  appId: "1:686422979347:web:28a018d0610f29ef6b0f0a"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Initialiser Firestore
const db = getFirestore(app);

export { db };
export default app; 