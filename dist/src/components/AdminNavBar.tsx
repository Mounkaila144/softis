import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HelpCircle, BookOpen, Database, LogOut, Globe } from 'lucide-react';
import { useTranslation, LanguageSelector } from '../i18n/useTranslation';

interface AdminNavBarProps {
  onLogout: () => void;
}

const AdminNavBar: React.FC<AdminNavBarProps> = ({ onLogout }) => {
  const location = useLocation();
  const { t } = useTranslation();
  
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between bg-white rounded-xl shadow p-2 mb-6">
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 sm:pb-0">
      <Link 
          to="/admin/translations" 
          className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${location.pathname === '/admin/translations' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          <Globe className="h-4 w-4" />
          <span>{t('admin.translations')}</span>
        </Link>
        <Link 
          to="/admin" 
          className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${location.pathname === '/admin' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          <HelpCircle className="h-4 w-4" />
          <span>{t('admin.faq')}</span>
        </Link>
        
        <Link 
          to="/admin/blog" 
          className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${location.pathname === '/admin/blog' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          <BookOpen className="h-4 w-4" />
          <span>{t('admin.blog')}</span>
        </Link>
     
        
     
      </div>
      
      <div className="flex items-center space-x-3">
        <div className="border border-gray-200 rounded-lg p-1 mr-2">
          <LanguageSelector />
        </div>
        
        <button 
          onClick={onLogout}
          className="px-4 py-2 rounded-lg flex items-center space-x-2 bg-red-50 text-red-600 hover:bg-red-100"
        >
          <LogOut className="h-4 w-4" />
          <span>{t('admin.logout')}</span>
        </button>
      </div>
    </div>
  );
};

export default AdminNavBar; 