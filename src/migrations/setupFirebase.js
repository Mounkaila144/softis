/**
 * Script de migration pour configurer Firebase
 * 
 * Ce script doit être exécuté pour initialiser correctement Firebase avec 
 * les règles de sécurité et les collections nécessaires.
 * 
 * Pour exécuter:
 * 1. Assurez-vous d'être connecté à Firebase CLI: firebase login
 * 2. Exécutez: node setupFirebase.js
 */

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Charger le fichier de configuration
const serviceAccountPath = join(__dirname, '../serviceAccountKey.json');
const serviceAccountJson = JSON.parse(
  await readFile(new URL(serviceAccountPath, import.meta.url))
);

// Initialiser l'application Firebase Admin
initializeApp({
  credential: cert(serviceAccountJson)
});

const db = getFirestore();

async function setupFirebase() {
  try {
    console.log("Initialisation de Firebase...");
    
    // Créer la collection translations avec un document latest
    const latestRef = db.collection('translations').doc('latest');
    await latestRef.set({
      timestamp: new Date().toISOString(),
      updatedBy: 'admin',
      numChanges: 0
    });
    console.log("Document 'latest' créé dans la collection 'translations'");
    
    // Créer le document history avec un tableau d'entrées vide
    const historyRef = db.collection('translations').doc('history');
    await historyRef.set({
      entries: []
    });
    console.log("Document 'history' créé dans la collection 'translations'");
    
    console.log("Configuration Firebase terminée avec succès!");
  } catch (error) {
    console.error("Erreur lors de la configuration Firebase:", error);
  } finally {
    process.exit(0);
  }
}

setupFirebase(); 