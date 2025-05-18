import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useTranslation as useI18nTranslation } from 'react-i18next';
import i18n from './index';

// Type pour le contexte
type LanguageContextType = {
  language: string;
  changeLanguage: (lang: string) => void;
  t: (key: string, options?: any) => string;
};

// Création du contexte
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Props pour le provider
interface LanguageProviderProps {
  children: ReactNode;
}

// Provider component
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState(i18n.language || 'ja');
  const { t } = useI18nTranslation();

  // Fonction pour changer de langue
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  // Écouter les changements de langue
  useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      setLanguage(lng);
    };

    i18n.on('languageChanged', handleLanguageChanged);

    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, []);

  // Définir la langue par défaut au chargement si elle n'est pas déjà définie
  useEffect(() => {
    if (!i18n.language || i18n.language === 'dev') {
      i18n.changeLanguage('ja');
    }
  }, []);

  const value = {
    language,
    changeLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation doit être utilisé à l\'intérieur d\'un LanguageProvider');
  }
  return context;
};

// Export du sélecteur de langue
export const LanguageSelector: React.FC = () => {
  const { language, changeLanguage } = useTranslation();

  return (
    <div className="language-selector">
      <button 
        className={`language-btn ${language === 'fr' ? 'active' : ''}`} 
        onClick={() => changeLanguage('fr')}
      >
        FR
      </button>
      <button 
        className={`language-btn ${language === 'en' ? 'active' : ''}`} 
        onClick={() => changeLanguage('en')}
      >
        EN
      </button>
      <button 
        className={`language-btn ${language === 'ja' ? 'active' : ''}`} 
        onClick={() => changeLanguage('ja')}
      >
        JP
      </button>
    </div>
  );
}; 