/**
 * Script pour initialiser la base de données Firestore avec les traductions locales
 */

import { doc, setDoc, addDoc, collection } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import app from '../config/firebase';

// Importer les fichiers de traduction statiques
import frTranslations from '../i18n/locales/fr.json';
import enTranslations from '../i18n/locales/en.json';
import jaTranslations from '../i18n/locales/ja.json';

const db = getFirestore(app);

/**
 * Initialise la base de données Firestore avec les fichiers de traduction locaux
 */
export const initializeFirestoreTranslations = async () => {
  try {
    console.log('Début de l\'initialisation des traductions dans Firestore...');
    
    // Convertir les objets JSON en chaînes
    const frJson = JSON.stringify(frTranslations);
    const enJson = JSON.stringify(enTranslations);
    const jaJson = JSON.stringify(jaTranslations);
    
    const timestamp = new Date().toISOString();
    
    // Créer le document "latest" qui contient la version la plus récente
    await setDoc(doc(db, 'translations', 'latest'), {
      timestamp,
      updatedBy: 'system_initialization',
      numChanges: Object.keys(frTranslations).length + 
                  Object.keys(enTranslations).length + 
                  Object.keys(jaTranslations).length,
      fr: frJson,
      en: enJson,
      ja: jaJson
    });
    
    // Ajouter également dans l'historique
    await addDoc(collection(db, 'translations_history'), {
      timestamp,
      updatedBy: 'system_initialization',
      fr: frJson,
      en: enJson,
      ja: jaJson
    });
    
    console.log('Base de données Firestore initialisée avec succès avec les traductions locales!');
    return true;
  } catch (error) {
    console.error('Erreur lors de l\'initialisation des traductions dans Firestore:', error);
    return false;
  }
}; 