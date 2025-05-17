import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HelpCircle, Edit2, Trash2, LogOut, Save, Download, Upload, PlusCircle, CheckCircle, Clock, User, Mail, Database } from 'lucide-react';
import Container from '../components/Container';
import Section from '../components/Section';
import Button from '../components/Button';
import AdminNavBar from '../components/AdminNavBar';
import { isAuthenticated, logout } from '../utils/authService';
import { loadQuestionsFromFirebase, deleteQuestionFromFirebase, answerQuestionInFirebase, updateQuestionInFirebase } from '../utils/firebaseService';
import { Question } from '../types/questions';

const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [answer, setAnswer] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'answered'>('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/admin-login');
      return;
    }

    loadQuestionsFromServer();
  }, [navigate]);

  const loadQuestionsFromServer = async () => {
    try {
      setLoading(true);
      setError(null);
      const loadedQuestions = await loadQuestionsFromFirebase();
      setQuestions(loadedQuestions);
    } catch (err) {
      console.error('Erreur lors du chargement des questions:', err);
      setError('Erreur lors du chargement des questions. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('この質問を削除してもよろしいですか？')) {
      try {
        setLoading(true);
        const success = await deleteQuestionFromFirebase(id);
        if (success) {
          await loadQuestionsFromServer();
          if (selectedQuestion?.id === id) {
            setSelectedQuestion(null);
            setAnswer('');
          }
        } else {
          setError('質問の削除中にエラーが発生しました。');
        }
      } catch (err) {
        console.error('Erreur lors de la suppression de la question:', err);
        setError('質問の削除中にエラーが発生しました。');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSelectQuestion = (question: Question) => {
    setSelectedQuestion(question);
    setAnswer(question.answer || '');
    setEditMode(false);
  };

  const handleEditQuestion = () => {
    setEditMode(true);
  };

  const handleSaveAnswer = async () => {
    if (!selectedQuestion) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const success = await answerQuestionInFirebase(selectedQuestion.id, answer);
      
      if (success) {
        await loadQuestionsFromServer();
        
        // Mettre à jour le selectedQuestion avec la nouvelle réponse
        const updatedQuestions = await loadQuestionsFromFirebase();
        const updatedQuestion = updatedQuestions.find(q => q.id === selectedQuestion.id);
        
        if (updatedQuestion) {
          setSelectedQuestion(updatedQuestion);
        }
        
        setEditMode(false);
      } else {
        setError('質問への回答の保存中にエラーが発生しました。');
      }
    } catch (err) {
      console.error('Erreur lors de la réponse à la question:', err);
      setError('質問への回答の保存中にエラーが発生しました。');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEdit = async () => {
    if (!selectedQuestion) return;
    
    try {
      setLoading(true);
      setError(null);
      
      // Fonction à implémenter dans firebaseService
      const success = await updateQuestionInFirebase(selectedQuestion);
      
      if (success) {
        await loadQuestionsFromServer();
        
        // Mettre à jour le selectedQuestion
        const updatedQuestions = await loadQuestionsFromFirebase();
        const updatedQuestion = updatedQuestions.find(q => q.id === selectedQuestion.id);
        
        if (updatedQuestion) {
          setSelectedQuestion(updatedQuestion);
        }
        
        setEditMode(false);
      } else {
        setError('質問の更新中にエラーが発生しました。');
      }
    } catch (err) {
      console.error('Erreur lors de la mise à jour de la question:', err);
      setError('質問の更新中にエラーが発生しました。');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      setLoading(true);
      const questionsData = await loadQuestionsFromFirebase();
      const jsonString = JSON.stringify(questionsData, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `softis-questions-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Erreur lors de l\'export des questions:', err);
      setError('質問のエクスポート中にエラーが発生しました。');
    } finally {
      setLoading(false);
    }
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const data = JSON.parse(content);
        
        // Afficher un message indiquant que l'import via Firebase n'est pas encore implémenté
        alert('Firebase経由でのインポート機能は現在開発中です。FirebaseAdminページから直接データを管理してください。');
        
      } catch (err) {
        console.error('Erreur lors de l\'import des questions:', err);
        setError('質問のインポート中にエラーが発生しました。');
      }
    };
    reader.readAsText(file);
  };

  const filteredQuestions = questions.filter(q => {
    if (filter === 'all') return true;
    if (filter === 'pending') return q.status === 'pending';
    return q.status === 'answered';
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ja-JP');
  };

  if (loading && questions.length === 0) {
    return (
      <div className="pt-32 pb-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700 mx-auto"></div>
          <p className="mt-4 text-gray-600">質問を読み込んでいます...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="relative pt-32 pb-16 text-white">
        <div className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-r from-purple-700 to-indigo-500">
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
              管理ダッシュボード
            </motion.h1>
            
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 flex gap-4"
          >
            <div className="bg-white/10 rounded-lg px-4 py-3 backdrop-blur-sm">
              <div className="text-xl font-bold">{questions.filter(q => q.status === 'pending').length}</div>
              <div className="text-xs opacity-70">未回答</div>
            </div>
            
            <div className="bg-white/10 rounded-lg px-4 py-3 backdrop-blur-sm">
              <div className="text-xl font-bold">{questions.filter(q => q.status === 'answered').length}</div>
              <div className="text-xs opacity-70">回答済み</div>
            </div>
            
            <div className="bg-white/10 rounded-lg px-4 py-3 backdrop-blur-sm">
              <div className="text-xl font-bold">{questions.length}</div>
              <div className="text-xs opacity-70">合計</div>
            </div>
          </motion.div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md"
            >
              {error}
            </motion.div>
          )}
        </Container>
      </div>

      {/* Main Content */}
      <Section>
        <Container>
          <AdminNavBar onLogout={handleLogout} />
          
          <div className="mb-6 flex flex-wrap justify-between items-center">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Filters */}
              <div className="bg-white rounded-lg shadow p-5 mb-6">
                <h2 className="text-lg font-bold text-gray-700 mb-4">フィルター</h2>
                <div className="flex flex-wrap gap-2">
                  <button 
                    className={`px-4 py-2 rounded-lg text-sm ${filter === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    onClick={() => setFilter('all')}
                  >
                    全て
                  </button>
                  <button 
                    className={`px-4 py-2 rounded-lg text-sm ${filter === 'pending' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    onClick={() => setFilter('pending')}
                  >
                    未回答
                  </button>
                  <button 
                    className={`px-4 py-2 rounded-lg text-sm ${filter === 'answered' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    onClick={() => setFilter('answered')}
                  >
                    回答済み
                  </button>
                </div>
              </div>

              {/* Questions List */}
              <div className="bg-white rounded-lg shadow h-[500px] overflow-y-auto">
                <div className="p-4 border-b">
                  <h2 className="text-lg font-bold text-gray-700">質問一覧</h2>
                </div>
                
                {loading && (
                  <div className="flex justify-center items-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-700"></div>
                  </div>
                )}

                {!loading && filteredQuestions.length > 0 ? (
                  <div className="divide-y">
                    {filteredQuestions.map(question => (
                      <div 
                        key={question.id} 
                        className={`p-4 cursor-pointer hover:bg-gray-50 ${selectedQuestion?.id === question.id ? 'bg-purple-50' : ''}`}
                        onClick={() => handleSelectQuestion(question)}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${question.status === 'answered' ? 'bg-green-100' : 'bg-yellow-100'}`}>
                            {question.status === 'answered' ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              <Clock className="h-4 w-4 text-yellow-600" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-800 truncate">
                              {question.question}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatDate(question.date)}
                            </p>
                          </div>
                          <button 
                            className="text-red-500 hover:text-red-700"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(question.id);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : !loading ? (
                  <div className="p-8 text-center text-gray-500">
                    <HelpCircle className="h-10 w-10 mx-auto mb-2 text-gray-300" />
                    <p>質問がありません</p>
                  </div>
                ) : null}
              </div>

              {/* Import/Export */}
              <div className="bg-white rounded-lg shadow p-5 mt-6">
                <h2 className="text-lg font-bold text-gray-700 mb-4">データ管理</h2>
                <div className="space-y-3">
                  <button 
                    className="flex items-center w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                    onClick={handleExport}
                    disabled={loading}
                  >
                    <Download className="h-4 w-4 mr-2" /> 質問をエクスポート
                    {loading && (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-700 ml-2"></div>
                    )}
                  </button>
                  
                  <label className="flex items-center w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer">
                    <Upload className="h-4 w-4 mr-2" /> 質問をインポート
                    <input 
                      type="file" 
                      accept=".json" 
                      onChange={handleImport} 
                      className="hidden" 
                      disabled={loading}
                    />
                  </label>
                  
                  <button 
                    className="flex items-center w-full px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                    onClick={() => navigate('/admin/firebase')}
                    disabled={loading}
                  >
                    <Database className="h-4 w-4 mr-2" /> Firebase管理
                  </button>
                </div>
              </div>
            </div>
            
            {/* Question Detail */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow h-full">
                {selectedQuestion ? (
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-6">
                      <h2 className="text-xl font-bold text-gray-800">質問詳細</h2>
                      
                      <div className="space-x-2">
                        {!editMode && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleEditQuestion}
                            disabled={loading}
                          >
                            <Edit2 className="h-4 w-4 mr-1" /> 編集
                          </Button>
                        )}
                        {editMode && (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={handleSaveEdit}
                            disabled={loading}
                          >
                            <Save className="h-4 w-4 mr-1" /> 保存
                            {loading && (
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white ml-2"></div>
                            )}
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      {/* User Info */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-gray-500 mb-3">
                          ユーザー情報
                        </h3>
                        <div className="flex flex-wrap gap-y-3 gap-x-6">
                          <div className="flex items-center">
                            <User className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-700">{selectedQuestion.name}</span>
                          </div>
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-700">{selectedQuestion.email}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-700">{formatDate(selectedQuestion.date)}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Question */}
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-2">
                          質問内容
                        </h3>
                        {editMode ? (
                          <textarea
                            value={selectedQuestion.question}
                            onChange={(e) => setSelectedQuestion({...selectedQuestion, question: e.target.value})}
                            className="w-full p-3 border rounded-lg focus:ring focus:ring-purple-200 focus:outline-none"
                            rows={4}
                          />
                        ) : (
                          <p className="p-4 bg-purple-50 rounded-lg text-gray-700">
                            {selectedQuestion.question}
                          </p>
                        )}
                      </div>
                      
                      {/* Answer */}
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-2">
                          回答
                        </h3>
                        {editMode || selectedQuestion.status === 'pending' ? (
                          <div className="space-y-3">
                            <textarea
                              value={answer}
                              onChange={(e) => setAnswer(e.target.value)}
                              className="w-full p-3 border rounded-lg focus:ring focus:ring-purple-200 focus:outline-none"
                              rows={6}
                              placeholder="回答を入力してください..."
                              disabled={loading}
                            />
                            {selectedQuestion.status === 'pending' && (
                              <div className="flex justify-end">
                                <Button
                                  variant="primary"
                                  onClick={handleSaveAnswer}
                                  disabled={!answer.trim() || loading}
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" /> 回答を公開する
                                  {loading && (
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white ml-2"></div>
                                  )}
                                </Button>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="p-4 bg-green-50 rounded-lg text-gray-700">
                            {selectedQuestion.answer || '回答がありません'}
                            {selectedQuestion.answerDate && (
                              <div className="mt-2 text-xs text-gray-500">
                                回答日時: {formatDate(selectedQuestion.answerDate)}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 h-full flex flex-col items-center justify-center text-gray-500">
                    <HelpCircle className="h-16 w-16 mb-4 text-gray-300" />
                    <p className="mb-2">質問を選択してください</p>
                    <p className="text-sm text-gray-400">
                      左側のリストから表示する質問を選びます
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default AdminPage; 