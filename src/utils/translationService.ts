/**
 * Service de gestion des traductions
 */

import { getFirestore, doc, setDoc, getDoc, collection, addDoc } from 'firebase/firestore';
import app from '../config/firebase';

// Fichiers statiques — source de vérité pour les nouvelles clés
import frStatic from '../i18n/locales/fr.json';
import enStatic from '../i18n/locales/en.json';
import jaStatic from '../i18n/locales/ja.json';

// Initialize Firebase
const db = getFirestore(app);

/**
 * Fusion profonde : base fournit les nouvelles clés, override écrase les clés existantes.
 * Ainsi Firestore garde la priorité sur ses valeurs éditées,
 * mais toute nouvelle clé ajoutée au JSON local apparaît automatiquement.
 */
const deepMerge = (base: any, override: any): any => {
  const result = { ...base };
  for (const key of Object.keys(override)) {
    if (override[key] && typeof override[key] === 'object' && !Array.isArray(override[key])) {
      result[key] = deepMerge(base[key] || {}, override[key]);
    } else {
      result[key] = override[key];
    }
  }
  return result;
};

/**
 * Récupère les traductions depuis Firestore fusionnées avec les fichiers statiques.
 * Les nouvelles clés des fichiers locaux sont toujours visibles même si Firestore
 * ne les contient pas encore.
 */
export const fetchTranslations = async (_forceReload = false) => {
  try {
    console.log('Tentative de chargement des traductions depuis Firestore...');

    const latestDoc = await getDoc(doc(db, 'translations', 'latest'));

    if (latestDoc.exists() && latestDoc.data().fr && latestDoc.data().en && latestDoc.data().ja) {
      console.log('Traductions Firestore trouvées — fusion avec les fichiers statiques');
      const data = latestDoc.data();
      return {
        fr: deepMerge(frStatic, JSON.parse(data.fr)),
        en: deepMerge(enStatic, JSON.parse(data.en)),
        ja: deepMerge(jaStatic, JSON.parse(data.ja))
      };
    }

    console.log('Aucune donnée dans Firestore — utilisation des fichiers statiques');
    return { fr: frStatic, en: enStatic, ja: jaStatic };
  } catch (error) {
    console.error('Erreur Firestore — fallback sur les fichiers statiques:', error);
    return { fr: frStatic, en: enStatic, ja: jaStatic };
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