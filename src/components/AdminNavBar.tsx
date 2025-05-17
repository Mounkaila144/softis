import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HelpCircle, BookOpen, Database, LogOut } from 'lucide-react';

interface AdminNavBarProps {
  onLogout: () => void;
}

const AdminNavBar: React.FC<AdminNavBarProps> = ({ onLogout }) => {
  const location = useLocation();
  
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between bg-white rounded-xl shadow p-2 mb-6">
      <div className="flex items-center space-x-2">
        <Link 
          to="/admin" 
          className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${location.pathname === '/admin' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          <HelpCircle className="h-4 w-4" />
          <span>FAQ Admin</span>
        </Link>
        
        <Link 
          to="/admin/blog" 
          className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${location.pathname === '/admin/blog' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          <BookOpen className="h-4 w-4" />
          <span>Blog Admin</span>
        </Link>
        
        <Link 
          to="/admin/firebase" 
          className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${location.pathname === '/admin/firebase' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          <Database className="h-4 w-4" />
          <span>Firebase</span>
        </Link>
      </div>
      
      <button 
        onClick={onLogout}
        className="px-4 py-2 rounded-lg flex items-center space-x-2 bg-red-50 text-red-600 hover:bg-red-100"
      >
        <LogOut className="h-4 w-4" />
        <span>Déconnexion</span>
      </button>
    </div>
  );
};

export default AdminNavBar; 