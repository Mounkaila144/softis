/**
 * Script pour initialiser Firestore sans nécessiter de clé de service
 * Utilise la bibliothèque Firebase standard
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, collection } from 'firebase/firestore';

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDrXjR1tuc8VCPzmZiMlLJYiSCag04gUZo",
  authDomain: "softis-a8ac1.firebaseapp.com",
  projectId: "softis-a8ac1",
  storageBucket: "softis-a8ac1.appspot.com",
  messagingSenderId: "245594840881",
  appId: "1:245594840881:web:43df4b390e88308f018e11",
  measurementId: "G-84RJR1VPGV"
};

// Initialiser l'application Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Chargement des fichiers de traduction exemple
const exampleTranslations = {
  fr: {
    common: {
      welcome: "Bienvenue",
      login: "Connexion",
      logout: "Déconnexion"
    }
  },
  en: {
    common: {
      welcome: "Welcome",
      login: "Login",
      logout: "Logout"
    }
  },
  ja: {
    common: {
      welcome: "ようこそ",
      login: "ログイン",
      logout: "ログアウト"
    }
  }
};

async function setupFirestore() {
  try {
    console.log("Initialisation des collections Firestore...");
    
    // Créer le document latest avec les traductions
    console.log("Création du document 'latest' dans la collection 'translations'...");
    await setDoc(doc(db, 'translations', 'latest'), {
      timestamp: new Date().toISOString(),
      updatedBy: 'admin',
      numChanges: 3,
      fr: JSON.stringify(exampleTranslations.fr),
      en: JSON.stringify(exampleTranslations.en),
      ja: JSON.stringify(exampleTranslations.ja)
    });
    
    console.log("✅ Configuration Firestore terminée avec succès!");
    console.log("\nVous pouvez maintenant utiliser l'interface d'administration des traductions.");
  } catch (error) {
    console.error("❌ Erreur lors de la configuration Firestore:", error);
    console.error("Détails:", error.message);
  }
}

// Exécuter la configuration
setupFirestore(); 