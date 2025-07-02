import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { fetchTranslations } from '../utils/translationService';

// Chargement initial des ressources statiques
import frStatic from './locales/fr.json';
import enStatic from './locales/en.json';
import jaStatic from './locales/ja.json';

// Fonction pour recharger les traductions depuis Firestore
export const reloadTranslations = async () => {
  try {
    const translations = await fetchTranslations(true);
    
    // Mise à jour des ressources i18n
    Object.keys(translations).forEach(lang => {
      i18n.addResourceBundle(lang, 'translation', translations[lang], true, true);
    });
    
    return true;
  } catch (error) {
    console.error('Erreur lors du rechargement des traductions:', error);
    return false;
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: frStatic },
      en: { translation: enStatic },
      ja: { translation: jaStatic }
    },
    fallbackLng: 'ja',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false
    }
  });

// Charger les traductions depuis Firestore au démarrage
reloadTranslations().then(() => {
  console.log('Traductions chargées depuis Firestore');
});

export default i18n; 