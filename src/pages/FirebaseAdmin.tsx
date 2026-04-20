import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Database, Upload, ArrowLeft, CheckCircle, AlertCircle, LogOut } from 'lucide-react';
import Container from '../components/Container';
import Section from '../components/Section';
import Button from '../components/Button';
import { migrateDataToFirebase } from '../utils/migrateToFirebase';
import { isAuthenticated, logout } from '../utils/authService';

const FirebaseAdmin: React.FC = () => {
  const navigate = useNavigate();
  const [migrationResult, setMigrationResult] = useState<{
    success: boolean;
    questionsCount: number;
    blogPostsCount: number;
    errors: string[];
  } | null>(null);
  const [isMigrating, setIsMigrating] = useState(false);
  
  // Vérifier l'authentification
  React.useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/admin-login');
    }
  }, [navigate]);
  
  // Lancer la migration
  const handleMigration = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir migrer les données de localStorage vers Firebase ? Cette opération peut prendre quelques instants.')) {
      setIsMigrating(true);
      try {
        const result = await migrateDataToFirebase();
        setMigrationResult(result);
      } catch (error) {
        console.error('Erreur lors de la migration:', error);
        setMigrationResult({
          success: false,
          questionsCount: 0,
          blogPostsCount: 0,
          errors: [(error instanceof Error) ? error.message : 'Une erreur inconnue est survenue']
        });
      } finally {
        setIsMigrating(false);
      }
    }
  };
  
  // Déconnexion
  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };
  
  return (
    <>
      <div className="relative pt-32 pb-16 text-white">
        <div className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute transform rotate-45 -translate-x-1/4 -translate-y-1/4 -left-1/4 -top-1/4 w-1/2 h-1/2 bg-white/20 rounded-full blur-3xl"></div>
            <div className="absolute transform -rotate-12 translate-x-1/4 translate-y-1/4 right-1/4 bottom-1/4 w-1/2 h-1/2 bg-white/20 rounded-full blur-3xl"></div>
          </div>
        </div>
        
        <Container className="relative z-10">
          <div className="flex justify-between items-center mb-6">
            <Link 
              to="/admin" 
              className="inline-flex items-center text-blue-200 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              管理画面に戻る
            </Link>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20"
            >
              ログアウト <LogOut className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              Firebase データ管理
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-300 to-indigo-300 rounded-full mx-auto mb-4"></div>
            <p className="text-white text-xl max-w-3xl mx-auto">
              LocalStorageからFirebaseへのデータ移行とFirebaseデータの管理
            </p>
          </motion.div>
        </Container>
      </div>

      <Section className="bg-gray-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* 移行セクション */}
            <motion.div
              className="bg-white rounded-xl shadow-md p-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Upload className="h-6 w-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  LocalStorage から Firebase への移行
                </h2>
              </div>
              
              <p className="text-gray-600 mb-6">
                現在のLocalStorageに保存されているデータ（FAQ、ブログの記事とコメント）をFirebaseに移行します。
                既存のデータは上書きされる可能性がありますのでご注意ください。
              </p>
              
              {!migrationResult ? (
                <Button
                  variant="primary"
                  onClick={handleMigration}
                  disabled={isMigrating}
                  className="w-full"
                >
                  {isMigrating ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-t-transparent border-white rounded-full mr-2"></div>
                      移行中...
                    </>
                  ) : (
                    <>移行を開始</>
                  )}
                </Button>
              ) : (
                <div className={`p-4 rounded-lg ${migrationResult.success ? 'bg-green-50' : 'bg-red-50'}`}>
                  <div className="flex items-center gap-3 mb-3">
                    {migrationResult.success ? (
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    ) : (
                      <AlertCircle className="h-6 w-6 text-red-600" />
                    )}
                    <h3 className={`text-lg font-bold ${migrationResult.success ? 'text-green-600' : 'text-red-600'}`}>
                      {migrationResult.success ? '移行成功' : '移行に問題が発生しました'}
                    </h3>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <p>移行結果:</p>
                    <ul className="list-disc ml-5">
                      <li>FAQ/質問: {migrationResult.questionsCount} 件</li>
                      <li>ブログ記事: {migrationResult.blogPostsCount} 件</li>
                    </ul>
                  </div>
                  
                  {migrationResult.errors.length > 0 && (
                    <div className="mt-4">
                      <p className="font-bold text-red-600">エラー:</p>
                      <ul className="list-disc ml-5 text-red-600">
                        {migrationResult.errors.map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="mt-6">
                    <Button
                      variant="primary"
                      onClick={() => setMigrationResult(null)}
                    >
                      閉じる
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
            
            {/* Firebase管理セクション */}
            <motion.div
              className="bg-white rounded-xl shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Database className="h-6 w-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Firebase 管理
                </h2>
              </div>
              
              <p className="text-gray-600 mb-6">
                Firebaseデータの管理はFirebaseコンソールから直接行うことができます。
                より高度なデータ管理や分析が必要な場合は、以下のリンクからFirebaseコンソールにアクセスしてください。
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="https://console.firebase.google.com/project/softis-a8ac1/firestore/data" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Database className="h-5 w-5 mr-2" />
                  Firestore データベース
                </a>
                
                <a 
                  href="https://console.firebase.google.com/project/softis-a8ac1/overview" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Firebase コンソール
                </a>
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default FirebaseAdmin; 