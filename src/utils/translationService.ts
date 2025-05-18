/**
 * Service de gestion des traductions
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc, collection, addDoc } from 'firebase/firestore';
import app from '../config/firebase';

// Initialize Firebase
const db = getFirestore(app);

/**
 * Récupère les traductions depuis Firestore ou les fichiers statiques
 */
export const fetchTranslations = async (forceReload = false) => {
  try {
    console.log('Tentative de chargement des traductions depuis Firestore...');
    
    // Si forceReload est vrai, on ajoute un paramètre de timestamp pour éviter le cache
    const cacheBuster = forceReload ? `?_=${new Date().getTime()}` : '';
    
    // D'abord, essayer de charger depuis Firestore
    const latestDoc = await getDoc(doc(db, 'translations', 'latest'));
    
    if (latestDoc.exists() && latestDoc.data().fr && latestDoc.data().en && latestDoc.data().ja) {
      console.log('Traductions chargées depuis Firestore avec succès');
      const data = latestDoc.data();
      return {
        fr: JSON.parse(data.fr),
        en: JSON.parse(data.en),
        ja: JSON.parse(data.ja)
      };
    }
    
    console.log('Aucune donnée trouvée dans Firestore, chargement des fichiers statiques...');
    // Si pas de données dans Firestore, charger depuis les fichiers
    const frResponse = await fetch(`/src/i18n/locales/fr.json${cacheBuster}`);
    const enResponse = await fetch(`/src/i18n/locales/en.json${cacheBuster}`);
    const jaResponse = await fetch(`/src/i18n/locales/ja.json${cacheBuster}`);
    
    const fr = await frResponse.json();
    const en = await enResponse.json();
    const ja = await jaResponse.json();
    
    console.log('Traductions chargées depuis les fichiers statiques');
    return { fr, en, ja };
  } catch (error) {
    console.error('Erreur lors du chargement des traductions:', error);
    
    // En cas d'erreur, essayer de charger depuis les fichiers statiques
    try {
      console.log('Tentative de chargement depuis les fichiers statiques après erreur...');
      const cacheBuster = forceReload ? `?_=${new Date().getTime()}` : '';
      const frResponse = await fetch(`/src/i18n/locales/fr.json${cacheBuster}`);
      const enResponse = await fetch(`/src/i18n/locales/en.json${cacheBuster}`);
      const jaResponse = await fetch(`/src/i18n/locales/ja.json${cacheBuster}`);
      
      const fr = await frResponse.json();
      const en = await enResponse.json();
      const ja = await jaResponse.json();
      
      return { fr, en, ja };
    } catch (secondError) {
      console.error('Échec total du chargement des traductions:', secondError);
      throw error;
    }
  }
};

/**
 * Met à jour les fichiers de traduction
 */
export const updateTranslations = async (translations: { fr: any, en: any, ja: any }) => {
  try {
    console.log('Début de la sauvegarde des traductions...');
    
    // Vérifier si des données existantes sont disponibles dans Firestore
    let existingData = { fr: {}, en: {}, ja: {} };
    try {
      const latestDoc = await getDoc(doc(db, 'translations', 'latest'));
      if (latestDoc.exists()) {
        console.log('Données existantes trouvées dans Firestore');
        const data = latestDoc.data();
        existingData = {
          fr: JSON.parse(data.fr || '{}'),
          en: JSON.parse(data.en || '{}'),
          ja: JSON.parse(data.ja || '{}')
        };
      }
    } catch (fetchError) {
      console.error('Erreur lors de la récupération des données existantes:', fetchError);
      // Continuer même en cas d'erreur de lecture
    }
    
    // Fusionner avec les données existantes si les traductions ne sont que partielles
    const isPartialUpdate = Object.keys(translations.fr).length < 10 && 
                           Object.keys(translations.en).length < 10 && 
                           Object.keys(translations.ja).length < 10;
                           
    if (isPartialUpdate) {
      console.log('Mise à jour partielle détectée, fusion avec les données existantes...');
      
      // Fonction de fusion récursive d'objets
      const deepMerge = (target: any, source: any) => {
        Object.keys(source).forEach(key => {
          if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
            if (!target[key]) target[key] = {};
            deepMerge(target[key], source[key]);
          } else {
            target[key] = source[key];
          }
        });
        return target;
      };
      
      translations.fr = deepMerge(existingData.fr, translations.fr);
      translations.en = deepMerge(existingData.en, translations.en);
      translations.ja = deepMerge(existingData.ja, translations.ja);
      
      console.log('Fusion terminée');
    }
    
    // Créer des JSON string formatés pour le stockage
    const frJson = JSON.stringify(translations.fr);
    const enJson = JSON.stringify(translations.en);
    const jaJson = JSON.stringify(translations.ja);
    
    // Sauvegarder la version timestamp dans Firestore
    const timestamp = new Date().toISOString();
    
    console.log('Sauvegarde dans Firestore...');
    
    // Document "latest" contient la version la plus récente
    await setDoc(doc(db, 'translations', 'latest'), {
      timestamp,
      updatedBy: 'admin',
      numChanges: Object.keys(translations.fr).length + 
                  Object.keys(translations.en).length + 
                  Object.keys(translations.ja).length,
      fr: frJson,
      en: enJson,
      ja: jaJson
    });
    
    // Ajouter aux entrées d'historique
    await addDoc(collection(db, 'translations_history'), {
      timestamp,
      updatedBy: 'admin',
      fr: frJson,
      en: enJson,
      ja: jaJson
    });
    
    console.log('Traductions sauvegardées avec succès dans Firestore!');
    return true;
  } catch (error) {
    console.error('Erreur lors de la mise à jour des traductions:', error);
    console.error('Détails de l\'erreur:', error.message);
    
    // Solution de secours: sauvegarde locale
    try {
      console.log('Tentative de sauvegarde locale...');
      localStorage.setItem('translations_backup_fr', JSON.stringify(translations.fr));
      localStorage.setItem('translations_backup_en', JSON.stringify(translations.en));
      localStorage.setItem('translations_backup_ja', JSON.stringify(translations.ja));
      console.log('Sauvegarde locale réussie');
    } catch (localError) {
      console.error('Échec également de la sauvegarde locale:', localError);
    }
    
    return false;
  }
};

/**
 * Récupère l'historique des modifications des traductions
 */
export const getTranslationsHistory = async () => {
  try {
    const historyRef = collection(db, 'translations_history');
    const historySnap = await getDoc(doc(db, 'translations', 'latest'));
    
    if (historySnap.exists()) {
      const data = historySnap.data();
      return [
        {
          timestamp: data.timestamp,
          updatedBy: data.updatedBy || 'admin',
          numChanges: data.numChanges || 0
        }
      ];
    }
    
    return [];
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'historique des traductions:', error);
    return [];
  }
}; 