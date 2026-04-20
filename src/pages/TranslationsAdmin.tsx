import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, Save, Globe, Search, Check, X, ChevronDown, ChevronUp, RefreshCw, Database, ChevronRight } from 'lucide-react';
import Container from '../components/Container';
import Section from '../components/Section';
import Button from '../components/Button';
import AdminNavBar from '../components/AdminNavBar';
import { isAuthenticated, logout } from '../utils/authService';
import { updateTranslations, fetchTranslations } from '../utils/translationService';
import { useTranslation } from '../i18n/useTranslation';
import { reloadTranslations } from '../i18n/i18n';
import { initializeFirestoreTranslations } from '../utils/initializeTranslations';

interface TranslationItem {
  key: string;
  path: string;
  fr: string;
  en: string;
  ja: string;
  modified: boolean;
}

const TranslationsAdmin: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [translations, setTranslations] = useState<TranslationItem[]>([]);
  const [filteredTranslations, setFilteredTranslations] = useState<TranslationItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [expandedKey, setExpandedKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortBy, setSortBy] = useState<'key' | 'fr' | 'en' | 'ja'>('key');
  const [initializationLoading, setInitializationLoading] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<'fr' | 'en' | 'ja'>('ja');
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/admin-login');
      return;
    }

    loadTranslations();
  }, [navigate]);

  useEffect(() => {
    // Vérifier si c'est un appareil mobile
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const loadTranslations = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Chargement des traductions...');
      const data = await fetchTranslations();
      console.log('Données récupérées:', {
        frKeys: Object.keys(data.fr).length,
        enKeys: Object.keys(data.en).length,
        jaKeys: Object.keys(data.ja).length
      });
      
      // Transformer les données en tableau plat avec des chemins
      const flattenedTranslations: TranslationItem[] = [];
      const cats: Set<string> = new Set();
      
      const flattenObject = (obj: any, language: 'fr' | 'en' | 'ja', path: string = '') => {
        for (const [key, value] of Object.entries(obj)) {
          const currentPath = path ? `${path}.${key}` : key;
          
          if (typeof value === 'object' && value !== null) {
            cats.add(key);
            flattenObject(value, language, currentPath);
          } else {
            // Check if this key already exists in our flattened array
            const existingItem = flattenedTranslations.find(item => item.path === currentPath);
            
            if (existingItem) {
              existingItem[language] = value as string;
            } else {
              const newItem: TranslationItem = {
                key: currentPath.split('.').pop() || '',
                path: currentPath,
                fr: language === 'fr' ? value as string : '',
                en: language === 'en' ? value as string : '',
                ja: language === 'ja' ? value as string : '',
                modified: false
              };
              flattenedTranslations.push(newItem);
            }
          }
        }
      };
      
      console.log('Traitement des données...');
      flattenObject(data.fr, 'fr');
      flattenObject(data.en, 'en');
      flattenObject(data.ja, 'ja');
      
      console.log(`${flattenedTranslations.length} traductions chargées, ${cats.size} catégories trouvées`);
      setTranslations(flattenedTranslations);
      setFilteredTranslations(flattenedTranslations);
      setCategories(Array.from(cats).sort());
    } catch (err) {
      console.error("Erreur lors du chargement des traductions:", err);
      setError("Une erreur s'est produite lors du chargement des traductions. Vérifiez la console pour plus de détails.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    filterTranslations(query, activeCategory);
  };

  const handleCategoryClick = (category: string | null) => {
    setActiveCategory(category);
    filterTranslations(searchQuery, category);
  };

  const filterTranslations = (query: string, category: string | null) => {
    let filtered = [...translations];
    
    if (query) {
      filtered = filtered.filter(item => 
        item.path.toLowerCase().includes(query) ||
        item.fr.toLowerCase().includes(query) ||
        item.en.toLowerCase().includes(query) ||
        item.ja.toLowerCase().includes(query)
      );
    }
    
    if (category) {
      filtered = filtered.filter(item => item.path.startsWith(category));
    }
    
    setFilteredTranslations(filtered);
  };

  const handleValueChange = (index: number, language: 'fr' | 'en' | 'ja', value: string) => {
    const updatedTranslations = [...filteredTranslations];
    updatedTranslations[index][language] = value;
    updatedTranslations[index].modified = true;
    setFilteredTranslations(updatedTranslations);
    
    // Mettre également à jour le tableau principal
    const mainIndex = translations.findIndex(t => t.path === updatedTranslations[index].path);
    if (mainIndex !== -1) {
      const updatedMainTranslations = [...translations];
      updatedMainTranslations[mainIndex][language] = value;
      updatedMainTranslations[mainIndex].modified = true;
      setTranslations(updatedMainTranslations);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccessMessage(null);
      
      // S'il n'y a pas de modifications, on affiche un message
      const modifiedTranslations = translations.filter(t => t.modified);
      if (modifiedTranslations.length === 0) {
        setSuccessMessage("Aucune modification à enregistrer");
        setLoading(false);
        return;
      }
      
      console.log(`Enregistrement de toutes les traductions après ${modifiedTranslations.length} modifications...`);
      
      // Transformer TOUTES les traductions plates en structure hiérarchique
      const transformedData = {
        fr: {},
        en: {},
        ja: {}
      };
      
      // Fonction pour définir une valeur imbriquée
      const setNestedValue = (obj: any, path: string[], value: string) => {
        let current = obj;
        for (let i = 0; i < path.length - 1; i++) {
          if (!current[path[i]]) {
            current[path[i]] = {};
          }
          current = current[path[i]];
        }
        current[path[path.length - 1]] = value;
      };
      
      // On parcourt TOUTES les traductions, pas seulement les modifiées
      for (const item of translations) {
        const pathParts = item.path.split('.');
        if (item.fr) setNestedValue(transformedData.fr, pathParts, item.fr);
        if (item.en) setNestedValue(transformedData.en, pathParts, item.en);
        if (item.ja) setNestedValue(transformedData.ja, pathParts, item.ja);
      }
      
      console.log('Envoi des données à Firestore...');
      const success = await updateTranslations(transformedData);
      
      if (success) {
        console.log('Traductions sauvegardées avec succès!');
        
        // Réinitialiser le statut modifié
        const resetTranslations = translations.map(t => ({ ...t, modified: false }));
        setTranslations(resetTranslations);
        
        const resetFilteredTranslations = filteredTranslations.map(t => ({ ...t, modified: false }));
        setFilteredTranslations(resetFilteredTranslations);
        
        // Recharger les traductions dans i18n
        console.log('Rechargement des traductions dans i18n...');
        await reloadTranslations();
        
        setSuccessMessage("Toutes les traductions ont été enregistrées avec succès! Les modifications sont désormais disponibles dans l'interface.");
        
        // Recharger les traductions immédiatement pour l'admin
        console.log('Rechargement des traductions depuis Firestore...');
        await loadTranslations();
      } else {
        console.error('Échec de la sauvegarde');
        setError("Erreur lors de la sauvegarde des traductions.");
      }
    } catch (err) {
      console.error("Erreur lors de la sauvegarde des traductions:", err);
      setError("Une erreur s'est produite lors de la sauvegarde des traductions.");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleExpand = (key: string) => {
    if (expandedKey === key) {
      setExpandedKey(null);
    } else {
      setExpandedKey(key);
    }
  };

  const handleSort = (column: 'key' | 'fr' | 'en' | 'ja') => {
    const newOrder = sortBy === column && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
    setSortBy(column);
    
    const sorted = [...filteredTranslations].sort((a, b) => {
      if (newOrder === 'asc') {
        return a[column].localeCompare(b[column]);
      } else {
        return b[column].localeCompare(a[column]);
      }
    });
    
    setFilteredTranslations(sorted);
  };

  const handleInitializeFirestore = async () => {
    if (!window.confirm("Êtes-vous sûr de vouloir initialiser la base de données avec les fichiers de traduction locaux?\nCette action écrasera toutes les traductions existantes dans Firestore.")) {
      return;
    }
    
    try {
      setInitializationLoading(true);
      setError(null);
      setSuccessMessage(null);
      
      const success = await initializeFirestoreTranslations();
      
      if (success) {
        setSuccessMessage("Base de données initialisée avec succès! Les traductions ont été chargées dans Firestore.");
        
        // Recharger les traductions
        await reloadTranslations();
        await loadTranslations();
      } else {
        setError("Erreur lors de l'initialisation de la base de données.");
      }
    } catch (err) {
      console.error("Erreur:", err);
      setError("Une erreur s'est produite lors de l'initialisation.");
    } finally {
      setInitializationLoading(false);
    }
  };

  const hasModifiedTranslations = translations.some(t => t.modified);

  // Rendu de la vue mobile accordéon
  const renderMobileView = () => {
    if (loading && filteredTranslations.length === 0) {
      return (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-turquoise-700 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('admin.loading')}</p>
        </div>
      );
    }
    
    if (filteredTranslations.length === 0) {
      return (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Globe className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500">{t('admin.noResults')}</p>
        </div>
      );
    }
    
    return (
      <>
        {/* Sélecteur de langue sur mobile */}
        <div className="bg-white p-4 rounded-lg shadow mb-4 sticky top-0 z-20">
          <div className="font-medium mb-2 text-gray-700">{t('admin.editingLanguage')}:</div>
          <div className="flex gap-2">
            <button 
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium ${selectedLanguage === 'ja' ? 'bg-turquoise-600 text-white' : 'bg-gray-100 text-gray-700'}`} 
              onClick={() => setSelectedLanguage('ja')}
            >
              {t('admin.japanese')}
            </button>
            <button 
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium ${selectedLanguage === 'fr' ? 'bg-turquoise-600 text-white' : 'bg-gray-100 text-gray-700'}`} 
              onClick={() => setSelectedLanguage('fr')}
            >
              {t('admin.french')}
            </button>
            <button 
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium ${selectedLanguage === 'en' ? 'bg-turquoise-600 text-white' : 'bg-gray-100 text-gray-700'}`} 
              onClick={() => setSelectedLanguage('en')}
            >
              {t('admin.english')}
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-4">
          <div className="divide-y divide-gray-200">
            {filteredTranslations.slice(0, 50).map((item, index) => (
              <div 
                key={item.path} 
                className={`${item.modified ? 'bg-yellow-50' : ''}`}
              >
                <div className="p-4">
                  <div 
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => handleToggleExpand(item.path)}
                  >
                    <div className="flex items-center">
                      {expandedKey === item.path ? (
                        <ChevronUp className="h-5 w-5 text-turquoise-600 mr-2 flex-shrink-0" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-turquoise-600 mr-2 flex-shrink-0" />
                      )}
                      <span className={`${item.modified ? 'font-semibold text-yellow-700' : 'text-gray-700'} break-all`}>
                        {item.modified && <span className="text-yellow-500 mr-1">★</span>}
                        {item.key}
                      </span>
                    </div>
                  </div>
                  
                  {expandedKey === item.path && (
                    <div className="mt-3">
                      <div className="text-xs text-gray-500 mb-2 ml-7">
                        {item.path}
                      </div>
                      
                      <div className="mt-4 space-y-4 ml-7">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {selectedLanguage === 'ja' ? 'Japonais' : (selectedLanguage === 'fr' ? 'Français' : 'Anglais')}
                          </label>
                          <textarea
                            value={item[selectedLanguage]}
                            onChange={(e) => handleValueChange(index, selectedLanguage, e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm min-h-[100px] focus:ring-2 focus:ring-turquoise-300 focus:outline-none"
                            dir={selectedLanguage === 'ja' ? 'auto' : 'ltr'}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {filteredTranslations.length > 50 && (
          <div className="bg-gray-50 px-6 py-3 text-center rounded-lg mb-4">
            <p className="text-sm text-gray-500">
              Affichage de 50 traductions sur {filteredTranslations.length}. Utilisez la recherche pour affiner les résultats.
            </p>
          </div>
        )}
      </>
    );
  };

  // Rendu de la vue bureau avec tableau
  const renderDesktopView = () => {
    if (loading && filteredTranslations.length === 0) {
      return (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-turquoise-700 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des traductions...</p>
        </div>
      );
    }
    
    if (filteredTranslations.length === 0) {
      return (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Globe className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500">Aucune traduction trouvée</p>
        </div>
      );
    }
    
    return (
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('key')}
                >
                  <div className="flex items-center">
                    Clé
                    {sortBy === 'key' && (
                      sortOrder === 'asc' ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('ja')}
                >
                  <div className="flex items-center">
                    Japonais
                    {sortBy === 'ja' && (
                      sortOrder === 'asc' ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('fr')}
                >
                  <div className="flex items-center">
                    Français
                    {sortBy === 'fr' && (
                      sortOrder === 'asc' ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('en')}
                >
                  <div className="flex items-center">
                    Anglais
                    {sortBy === 'en' && (
                      sortOrder === 'asc' ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                    )}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTranslations.slice(0, 100).map((item, index) => (
                <tr key={item.path} className={item.modified ? 'bg-yellow-50' : ''}>
                  <td className="px-6 py-4 text-sm text-gray-500 align-top">
                    <div className="flex items-center">
                      <button
                        onClick={() => handleToggleExpand(item.path)}
                        className="text-gray-400 hover:text-gray-600 mr-2 flex-shrink-0"
                      >
                        {expandedKey === item.path ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                      <span className={`${item.modified ? 'font-semibold text-yellow-700' : ''} break-all`}>
                        {item.modified && <span className="text-yellow-500">★ </span>}
                        {item.key}
                      </span>
                    </div>
                    {expandedKey === item.path && (
                      <div className="ml-6 mt-2 text-xs text-gray-400 break-all">
                        {item.path}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm align-top">
                    <textarea
                      value={item.ja}
                      onChange={(e) => handleValueChange(index, 'ja', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm min-h-[60px] focus:ring-2 focus:ring-turquoise-300 focus:outline-none"
                      dir="auto"
                    />
                  </td>
                  <td className="px-6 py-4 text-sm align-top">
                    <textarea
                      value={item.fr}
                      onChange={(e) => handleValueChange(index, 'fr', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm min-h-[60px] focus:ring-2 focus:ring-turquoise-300 focus:outline-none"
                    />
                  </td>
                  <td className="px-6 py-4 text-sm align-top">
                    <textarea
                      value={item.en}
                      onChange={(e) => handleValueChange(index, 'en', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm min-h-[60px] focus:ring-2 focus:ring-turquoise-300 focus:outline-none"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredTranslations.length > 100 && (
          <div className="bg-gray-50 px-6 py-3 text-center">
            <p className="text-sm text-gray-500">
              Affichage de 100 traductions sur {filteredTranslations.length}. Utilisez la recherche pour affiner les résultats.
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Header */}
      <div className="relative pt-32 pb-16 text-white">
        <div className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-r from-turquoise-700 to-indigo-500">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute transform rotate-45 -translate-x-1/4 -translate-y-1/4 -left-1/4 -top-1/4 w-1/2 h-1/2 bg-white/20 rounded-full blur-3xl"></div>
            <div className="absolute transform -rotate-12 translate-x-1/4 translate-y-1/4 right-1/4 bottom-1/4 w-1/2 h-1/2 bg-white/20 rounded-full blur-3xl"></div>
          </div>
        </div>
        
        <Container className="relative z-10">
          <div className="flex justify-between items-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-serif font-bold"
            >
              {t('admin.translationManagement')}
            </motion.h1>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20"
            >
              {t('admin.logout')} <LogOut className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Container>
      </div>

      <Section>
        <Container>
          <AdminNavBar onLogout={handleLogout} />
          
          {/* Barre d'outils */}
          <div className="flex flex-wrap gap-4 mb-6 items-center">
            <div className="relative flex-grow max-w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder={t('admin.search')}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquoise-300 focus:outline-none"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              <Button
                variant={hasModifiedTranslations ? "primary" : "secondary"}
                size="md"
                onClick={handleSave}
                disabled={!hasModifiedTranslations || loading || initializationLoading}
                className={`${!hasModifiedTranslations ? 'opacity-50 cursor-not-allowed' : ''} w-full sm:w-auto`}
              >
                {loading ? t('admin.saving') : t('admin.saveChanges')}
                <Save className="ml-2 h-4 w-4" />
              </Button>
              
              <Button
                variant="secondary"
                size="md"
                onClick={async () => {
                  setLoading(true);
                  await reloadTranslations();
                  setSuccessMessage("Traductions rechargées dans l'interface!");
                  setLoading(false);
                }}
                disabled={loading || initializationLoading}
                className="w-full sm:w-auto"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                {t('admin.refreshInterface')}
              </Button>
              
              <Button
                variant="warning"
                size="md"
                onClick={handleInitializeFirestore}
                disabled={loading || initializationLoading}
                className="bg-amber-600 hover:bg-amber-700 text-white w-full sm:w-auto"
              >
                {initializationLoading ? t('admin.processing') : t('admin.initializeDatabase')}
                <Database className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Messages */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex items-center">
              <X className="h-5 w-5 mr-2 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
          
          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 flex items-center">
              <Check className="h-5 w-5 mr-2 flex-shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}
          
          {/* Catégories */}
          <div className="mb-6 flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryClick(null)}
              className={`px-3 py-1 rounded-lg text-sm ${
                activeCategory === null
                  ? 'bg-turquoise-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t('admin.all')}
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`px-3 py-1 rounded-lg text-sm ${
                  activeCategory === category
                    ? 'bg-turquoise-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Affichage conditionnel en fonction de la taille de l'écran */}
          <div className="sm:hidden">
            {renderMobileView()}
          </div>
          <div className="hidden sm:block">
            {renderDesktopView()}
          </div>
        </Container>
      </Section>
    </>
  );
};

export default TranslationsAdmin; 