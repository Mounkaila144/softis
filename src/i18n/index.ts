import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import des fichiers de traduction
import fr from './locales/fr.json';
import en from './locales/en.json';
import ja from './locales/ja.json';

// Configuration de i18next
i18n
  // Détection automatique de la langue du navigateur
  .use(LanguageDetector)
  // Intégration avec React
  .use(initReactI18next)
  // Configuration
  .init({
    resources: {
      fr: {
        translation: fr
      },
      en: {
        translation: en
      },
      ja: {
        translation: ja
      }
    },
    // Langue par défaut
    fallbackLng: 'ja',
    // Débuggage
    debug: process.env.NODE_ENV === 'development',
    // Options d'interpolation
    interpolation: {
      escapeValue: false // non nécessaire pour React
    }
  });

export default i18n; 