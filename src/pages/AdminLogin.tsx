import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, Shield } from 'lucide-react';
import Container from '../components/Container';
import Button from '../components/Button';
import { login, isAuthenticated } from '../utils/authService';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      const success = login(password);
      
      if (success) {
        navigate('/admin');
      } else {
        setError('パスワードが正しくありません');
        setIsLoading(false);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-50 flex flex-col justify-center">
      <Container className="pt-24 pb-16">
        <motion.div 
          className="max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="bg-purple-600 p-6 text-center">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">Softis 管理者ログイン</h1>
            </div>
            
            <div className="p-6">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                    パスワード
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="管理者パスワード"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    デモ用パスワード: admin123
                  </p>
                </div>
                
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? 'ログイン中...' : 'ログイン'} {!isLoading && <LogIn className="ml-2 h-4 w-4" />}
                </Button>
              </form>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <button
              className="text-purple-600 hover:text-purple-800 text-sm"
              onClick={() => navigate('/')}
            >
              サイトに戻る
            </button>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default AdminLogin; 