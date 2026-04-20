import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Edit2, Trash2, LogOut, Download, Upload, CheckCircle, 
  Clock, User, Mail, MessageCircle, Tag, Grid, List, Filter
} from 'lucide-react';
import Container from '../components/Container';
import Section from '../components/Section';
import Button from '../components/Button';
import AdminNavBar from '../components/AdminNavBar';
import { isAuthenticated, logout } from '../utils/authService';
import { 
  loadBlogPostsFromFirebase, 
  deleteBlogPostFromFirebase, 
  approveCommentInFirebase, 
  deleteCommentFromFirebase 
} from '../utils/firebaseService';
import { BlogPost, Comment } from '../types/blog';

const BlogAdmin: React.FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [pendingComments, setPendingComments] = useState<{postId: string, comment: Comment}[]>([]);
  const [filter, setFilter] = useState<'all' | 'draft' | 'published'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/admin-login');
      return;
    }

    loadBlogPostsFromServer();
  }, [navigate]);

  // Charger les articles de blog
  const loadBlogPostsFromServer = async () => {
    try {
      setLoading(true);
      const loadedPosts = await loadBlogPostsFromFirebase();
      setPosts(loadedPosts);
      
      // Extraire tous les commentaires en attente
      const commentsAwaitingApproval: {postId: string, comment: Comment}[] = [];
      loadedPosts.forEach(post => {
        post.comments
          .filter(comment => comment.status === 'pending')
          .forEach(comment => {
            commentsAwaitingApproval.push({
              postId: post.id,
              comment
            });
          });
      });
      setPendingComments(commentsAwaitingApproval);
    } catch (error) {
      console.error("Erreur lors du chargement des articles:", error);
    } finally {
      setLoading(false);
    }
  };

  // Gestion de la déconnexion
  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  // Supprimer un article
  const handleDeletePost = async (id: string) => {
    if (window.confirm('Cette article sera supprimé définitivement. Continuer ?')) {
      try {
        setLoading(true);
        const success = await deleteBlogPostFromFirebase(id);
        if (success) {
          await loadBlogPostsFromServer();
          if (selectedPost?.id === id) {
            setSelectedPost(null);
          }
        } else {
          alert('Erreur lors de la suppression de l\'article');
        }
      } catch (error) {
        console.error("Erreur lors de la suppression:", error);
        alert('Erreur lors de la suppression de l\'article');
      } finally {
        setLoading(false);
      }
    }
  };

  // Sélectionner un article
  const handleSelectPost = (post: BlogPost) => {
    setSelectedPost(post);
  };

  // Approuver un commentaire
  const handleApproveComment = async (postId: string, commentId: string) => {
    try {
      setLoading(true);
      const success = await approveCommentInFirebase(postId, commentId);
      if (success) {
        await loadBlogPostsFromServer();
      } else {
        alert('Erreur lors de l\'approbation du commentaire');
      }
    } catch (error) {
      console.error("Erreur lors de l'approbation du commentaire:", error);
      alert('Erreur lors de l\'approbation du commentaire');
    } finally {
      setLoading(false);
    }
  };

  // Supprimer un commentaire
  const handleDeleteComment = async (postId: string, commentId: string) => {
    if (window.confirm('Ce commentaire sera supprimé définitivement. Continuer ?')) {
      try {
        setLoading(true);
        const success = await deleteCommentFromFirebase(postId, commentId);
        if (success) {
          await loadBlogPostsFromServer();
        } else {
          alert('Erreur lors de la suppression du commentaire');
        }
      } catch (error) {
        console.error("Erreur lors de la suppression du commentaire:", error);
        alert('Erreur lors de la suppression du commentaire');
      } finally {
        setLoading(false);
      }
    }
  };

  // Exporter les données du blog
  const handleExport = async () => {
    try {
      setLoading(true);
      const blogData = await loadBlogPostsFromFirebase();
      const jsonString = JSON.stringify(blogData, null, 2);
      
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `softis-blog-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erreur lors de l'exportation:", error);
      alert('Erreur lors de l\'exportation des données');
    } finally {
      setLoading(false);
    }
  };

  // Importer les données du blog
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (importBlogData(content)) {
        alert('ブログのデータが正常にインポートされました。');
        loadBlogPostsFromServer();
      } else {
        alert('ブログのデータのインポート中にエラーが発生しました。');
      }
    };
    reader.readAsText(file);
  };

  // Filtrer les articles
  const filteredPosts = posts.filter(post => {
    if (filter === 'all') return true;
    return post.status === filter;
  });

  // Formater la date pour l'affichage
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ja-JP');
  };

  // Tronquer le texte
  const truncateText = (text: string, length: number) => {
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
  };

  return (
    <>
      {/* En-tête */}
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
              ブログ管理
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
              <div className="text-xl font-bold">{posts.filter(p => p.status === 'draft').length}</div>
              <div className="text-xs opacity-70">下書き</div>
            </div>
            
            <div className="bg-white/10 rounded-lg px-4 py-3 backdrop-blur-sm">
              <div className="text-xl font-bold">{posts.filter(p => p.status === 'published').length}</div>
              <div className="text-xs opacity-70">公開済み</div>
            </div>
            
            <div className="bg-white/10 rounded-lg px-4 py-3 backdrop-blur-sm">
              <div className="text-xl font-bold">{pendingComments.length}</div>
              <div className="text-xs opacity-70">承認待ちコメント</div>
            </div>
          </motion.div>
        </Container>
      </div>

      {/* Contenu principal */}
      <Section>
        <Container>
          <AdminNavBar onLogout={handleLogout} />
          
          <div className="mb-6 flex flex-col sm:flex-row flex-wrap justify-between items-center gap-4">
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <h2 className="text-2xl font-bold text-gray-800">記事一覧</h2>
              <Link 
                to="/blog/new" 
                className="ml-4 px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700"
              >
                新規作成
              </Link>
            </div>
            <div className="flex items-center space-x-4 w-full sm:w-auto justify-end">
              <div className="flex items-center space-x-2 p-2 border border-gray-300 rounded-lg bg-white">
                <button 
                  className={`p-1 rounded ${filter === 'all' ? 'bg-purple-100 text-purple-600' : 'text-gray-500'}`}
                  onClick={() => setFilter('all')}
                >
                  <Filter className="h-4 w-4" />
                </button>
                <button 
                  className={`p-1 rounded ${filter === 'published' ? 'bg-purple-100 text-purple-600' : 'text-gray-500'}`}
                  onClick={() => setFilter('published')}
                >
                  公開
                </button>
                <button 
                  className={`p-1 rounded ${filter === 'draft' ? 'bg-purple-100 text-purple-600' : 'text-gray-500'}`}
                  onClick={() => setFilter('draft')}
                >
                  下書き
                </button>
              </div>
              <div className="flex items-center space-x-2 p-2 border border-gray-300 rounded-lg bg-white">
                <button 
                  className={`p-1 rounded ${viewMode === 'list' ? 'bg-purple-100 text-purple-600' : 'text-gray-500'}`}
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </button>
                <button 
                  className={`p-1 rounded ${viewMode === 'grid' ? 'bg-purple-100 text-purple-600' : 'text-gray-500'}`}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Affichage des articles */}
          {filteredPosts.length > 0 ? (
            viewMode === 'list' ? (
              <div className="bg-white rounded-xl shadow overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">タイトル</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">著者</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">日付</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ステータス</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">コメント</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">アクション</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredPosts.map(post => (
                        <tr key={post.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleSelectPost(post)}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900 truncate max-w-xs">{post.title}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                            <div className="text-sm text-gray-500">{post.author}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                            <div className="text-sm text-gray-500">{formatDate(post.date)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              post.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {post.status === 'published' ? '公開' : '下書き'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                            <div className="text-sm text-gray-500">
                              {post.comments.length} 
                              <span className="ml-1 text-xs">
                                ({post.comments.filter(c => c.status === 'pending').length} 未承認)
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center justify-end space-x-2">
                              <Link 
                                to={`/blog/${post.id}/edit`} 
                                className="text-indigo-600 hover:text-indigo-900"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Edit2 className="h-4 w-4" />
                              </Link>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeletePost(post.id);
                                }}
                                className="text-red-600 hover:text-red-900"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map(post => (
                  <div 
                    key={post.id}
                    className="bg-white rounded-lg shadow overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleSelectPost(post)}
                  >
                    {post.imageUrl && (
                      <div className="h-40 relative overflow-hidden">
                        <img 
                          src={post.imageUrl} 
                          alt={post.title} 
                          className="w-full h-full object-cover absolute top-0 left-0"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-medium text-gray-900 truncate">{post.title}</h3>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          post.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {post.status === 'published' ? '公開' : '下書き'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(post.date).toLocaleDateString('ja-JP')}
                        </div>
                        <div className="flex items-center">
                          <MessageCircle className="h-3 w-3 mr-1" />
                          {post.comments.length}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {post.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-purple-100 text-purple-800">
                            <Tag className="h-2 w-2 mr-1" />
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-800">
                            +{post.tags.length - 3}
                          </span>
                        )}
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <span className="text-xs text-gray-500">{post.author}</span>
                        <div className="flex items-center space-x-2">
                          <Link 
                            to={`/blog/${post.id}/edit`} 
                            className="p-1 text-indigo-600 hover:text-indigo-900"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeletePost(post.id);
                            }}
                            className="p-1 text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="bg-white rounded-xl shadow p-6 text-center">
              <p className="text-gray-500">記事がありません。新しい記事を作成してください。</p>
            </div>
          )}

          {/* Section des commentaires en attente */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">承認待ちコメント ({pendingComments.length})</h2>
            
            {pendingComments.length > 0 ? (
              <div className="bg-white rounded-xl shadow overflow-hidden">
                <div className="max-h-[500px] overflow-y-auto">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 sticky top-0 z-10">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">投稿者</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">記事</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">コメント</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">日付</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">アクション</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {pendingComments.map(({postId, comment}) => {
                          const post = posts.find(p => p.id === postId);
                          
                          return (
                            <tr key={comment.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
                                    <User className="h-4 w-4 text-gray-500" />
                                  </div>
                                  <div className="ml-3">
                                    <div className="text-sm font-medium text-gray-900">{comment.author}</div>
                                    <div className="text-xs text-gray-500 truncate max-w-[150px]">{comment.email}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 hidden md:table-cell">
                                <div className="text-sm text-gray-900 truncate max-w-xs">
                                  {post?.title || '不明な記事'}
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="text-sm text-gray-500 line-clamp-2">{truncateText(comment.content, 100)}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                                <div className="text-sm text-gray-500">{formatDate(comment.date)}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div className="flex items-center justify-end space-x-2">
                                  <button
                                    onClick={() => handleApproveComment(postId, comment.id)}
                                    className="text-green-600 hover:text-green-900"
                                  >
                                    <CheckCircle className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteComment(postId, comment.id)}
                                    className="text-red-600 hover:text-red-900"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow p-6 text-center">
                <p className="text-gray-500">承認待ちのコメントはありません。</p>
              </div>
            )}
          </div>

          {/* Outils d'import/export */}
          <div className="mt-12 bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">データ管理</h2>
            <div className="flex flex-wrap gap-4">
              <button 
                className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                onClick={handleExport}
              >
                <Download className="h-4 w-4 mr-2" /> ブログをエクスポート
              </button>
              
              <label className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer">
                <Upload className="h-4 w-4 mr-2" /> ブログをインポート
                <input 
                  type="file" 
                  accept=".json" 
                  onChange={handleImport} 
                  className="hidden" 
                />
              </label>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default BlogAdmin; 