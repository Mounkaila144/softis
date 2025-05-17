import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Tag as TagIcon, X, Plus } from 'lucide-react';
import Container from '../components/Container';
import Section from '../components/Section';
import Button from '../components/Button';
import Seo from '../components/Seo';
import { addBlogPostToFirebase } from '../utils/firebaseService';

const NewBlogPost: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    email: '',
    imageUrl: '',
    tags: ['ピラティス'] // Tag par défaut
  });
  const [newTag, setNewTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Gestion des changements dans le formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Ajouter un tag
  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  // Supprimer un tag
  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  // Soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const post = await addBlogPostToFirebase(
        formData.title,
        formData.content,
        formData.author,
        formData.email,
        formData.tags,
        formData.imageUrl || undefined
      );
      
      if (post) {
        // Rediriger vers l'article créé
        navigate(`/blog/${post.id}`);
      } else {
        setError('記事の作成中にエラーが発生しました。もう一度お試しください。');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Erreur lors de la création de l\'article:', error);
      setError('記事の作成中にエラーが発生しました。後でもう一度お試しください。');
      setIsSubmitting(false);
    }
  };

  // Prévisualisation du contenu Markdown (simulation)
  const getPreview = () => {
    if (!formData.content) return <p className="text-gray-400">プレビューはここに表示されます...</p>;
    
    // Simple transformation pour la démo (dans une vraie app, utiliser ReactMarkdown)
    const previewContent = formData.content
      .replace(/#{1,6} (.+)$/gm, '<strong>$1</strong>')
      .split('\n\n')
      .map((paragraph, i) => <p key={i} className="mb-4">{paragraph}</p>);
    
    return previewContent;
  };

  return (
    <>
      <Seo 
        title="新しい記事を書く - ピラティススタジオSoftis"
        description="ピラティス、姿勢改善、健康に関する新しい記事を投稿します。"
        keywords="ピラティス, ブログ投稿, 記事作成, Softis"
      />

      {/* En-tête */}
      <div className="relative pt-32 pb-16 text-white">
        <div className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-r from-pink-600 to-purple-700">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute transform rotate-45 -translate-x-1/4 -translate-y-1/4 -left-1/4 -top-1/4 w-1/2 h-1/2 bg-white/20 rounded-full blur-3xl"></div>
            <div className="absolute transform -rotate-12 translate-x-1/4 translate-y-1/4 right-1/4 bottom-1/4 w-1/2 h-1/2 bg-white/20 rounded-full blur-3xl"></div>
          </div>
        </div>
        
        <Container className="relative z-10">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-purple-200 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            ブログトップに戻る
          </Link>
          
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              新しい記事を書く
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full mx-auto mb-4"></div>
            <p className="text-white text-xl max-w-3xl mx-auto">
              ピラティスや健康に関する知識を共有しましょう
            </p>
          </motion.div>
        </Container>
      </div>

      <Section className="bg-gray-50">
        <Container>
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg m-6">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="p-8">
              {/* Titre */}
              <div className="mb-6">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  タイトル <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 text-lg"
                  placeholder="魅力的なタイトルを入力してください"
                  required
                />
              </div>
              
              {/* Information auteur */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                    著者名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    メールアドレス <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                    required
                  />
                </div>
              </div>
              
              {/* Image URL */}
              <div className="mb-6">
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  画像URL (オプション)
                </label>
                <input
                  type="url"
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              {/* Tags */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  タグ <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {formData.tags.map(tag => (
                    <div 
                      key={tag} 
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800"
                    >
                      <TagIcon className="h-3 w-3 mr-1" />
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 text-purple-600 hover:text-purple-800"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  
                  <div className="inline-flex">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      className="px-3 py-1 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-purple-300 w-32"
                      placeholder="新しいタグ"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="px-3 py-1 bg-purple-600 text-white rounded-r-lg hover:bg-purple-700"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Contenu */}
              <div className="mb-6">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                  内容 <span className="text-red-500">*</span>
                  <span className="text-xs ml-2 text-gray-500">Markdown形式に対応しています</span>
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 font-mono"
                  rows={10}
                  placeholder="# 見出し\n\n段落テキスト\n\n## 小見出し\n\n- リストアイテム\n- リストアイテム"
                  required
                />
              </div>
              
              {/* Prévisualisation */}
              <div className="mb-8">
                <h3 className="text-sm font-medium text-gray-700 mb-1">プレビュー</h3>
                <div className="p-4 border border-gray-300 rounded-lg bg-gray-50 min-h-[100px] prose max-w-none">
                  {getPreview()}
                </div>
              </div>
              
              {/* Boutons d'action */}
              <div className="flex justify-end space-x-4">
                <Link 
                  to="/blog"
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  キャンセル
                </Link>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? '保存中...' : '記事を公開する'} 
                  {!isSubmitting && <Save className="ml-2 h-4 w-4" />}
                </Button>
              </div>
            </form>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default NewBlogPost; 