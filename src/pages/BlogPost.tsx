import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, Tag, MessageCircle, ArrowLeft, Edit, Trash2, Send } from 'lucide-react';
import Container from '../components/Container';
import Section from '../components/Section';
import Button from '../components/Button';
import Seo from '../components/Seo';
import { BlogPost as BlogPostType, Comment } from '../types/blog';
import { loadBlogPostFromFirebase, addCommentToFirebase } from '../utils/firebaseService';
import ReactMarkdown from 'react-markdown';

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [commentForm, setCommentForm] = useState({
    name: '',
    email: '',
    content: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) {
        setError('記事IDが指定されていません。');
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const fetchedPost = await loadBlogPostFromFirebase(id);
        
        if (fetchedPost) {
          setPost(fetchedPost);
        } else {
          setError('記事が見つかりませんでした。');
        }
      } catch (error) {
        console.error('記事の読み込み中にエラーが発生しました:', error);
        setError('記事の読み込み中にエラーが発生しました。');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPost();
  }, [id]);

  // Gestion du formulaire de commentaire
  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCommentForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post || !post.id) return;

    setSubmitting(true);
    try {
      const result = await addCommentToFirebase(
        post.id,
        commentForm.name,
        commentForm.email,
        commentForm.content
      );
      
      if (result) {
        setCommentForm({
          name: '',
          email: '',
          content: ''
        });
        setCommentSubmitted(true);
        setTimeout(() => {
          setCommentSubmitted(false);
        }, 5000);

        // Recharger l'article pour afficher le nouveau commentaire
        const updatedPost = await loadBlogPostFromFirebase(post.id);
        if (updatedPost) {
          setPost(updatedPost);
        }
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout du commentaire:', error);
    } finally {
      setSubmitting(false);
    }
  };

  // Formater la date pour l'affichage
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Schema.org pour SEO
  const blogPostSchema = post ? {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': post.title,
    'description': post.content.substring(0, 150) + '...',
    'image': post.imageUrl,
    'datePublished': post.date,
    'author': {
      '@type': 'Person',
      'name': post.author
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Softis ピラティススタジオ',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://softis.jp/logo.png'
      }
    },
    'keywords': post.tags.join(', '),
    'comment': post.comments.filter(c => c.status === 'approved').map(comment => ({
      '@type': 'Comment',
      'author': {
        '@type': 'Person',
        'name': comment.author
      },
      'datePublished': comment.date,
      'text': comment.content
    }))
  } : {};

  if (loading) {
    return (
      <Section className="py-20">
        <Container>
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700 mx-auto"></div>
            <p className="mt-4 text-gray-600">読み込み中...</p>
          </div>
        </Container>
      </Section>
    );
  }

  if (error || !post) {
    return (
      <Section className="py-20">
        <Container>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">エラー</h2>
            <p className="text-gray-700 mb-6">{error || '記事が見つかりませんでした。'}</p>
            <Link 
              to="/blog" 
              className="inline-flex items-center px-4 py-2 bg-purple-600 rounded-lg text-white hover:bg-purple-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              ブログトップに戻る
            </Link>
          </div>
        </Container>
      </Section>
    );
  }

  const approvedComments = post.comments.filter(c => c.status === 'approved');

  return (
    <>
      <Seo 
        title={`${post.title} - ピラティススタジオSoftis`}
        description={post.content.substring(0, 160)}
        keywords={`${post.tags.join(', ')}, ピラティス, ブログ, Softis`}
        structuredData={blogPostSchema}
      />

      {/* Header with featured image */}
      <div className="relative pt-32 pb-16 text-white">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat" 
          style={{ 
            backgroundImage: post.imageUrl ? `url(${post.imageUrl})` : 'none',
            backgroundColor: post.imageUrl ? undefined : 'rgba(147, 51, 234, 0.9)' // Purple-700 equivalent with opacity
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/70 to-purple-900/90"></div>
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-200 text-purple-800"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-4">
              {post.title}
            </h1>
            
            <div className="flex items-center text-purple-100 text-sm mt-4">
              <div className="flex items-center mr-4">
                <User className="h-4 w-4 mr-1" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </div>
              <div className="flex items-center ml-4">
                <MessageCircle className="h-4 w-4 mr-1" />
                <span>{approvedComments.length} コメント</span>
              </div>
            </div>
          </motion.div>
        </Container>
      </div>

      {/* Article content */}
      <Section className="bg-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            {/* Article content */}
            <motion.div
              className="prose prose-lg prose-purple mx-auto mb-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <ReactMarkdown>
                {post.content}
              </ReactMarkdown>
            </motion.div>
            
            {/* Comments section */}
            <motion.div
              className="border-t border-gray-200 pt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h3 className="text-2xl font-serif font-bold text-gray-800 mb-8">
                コメント ({approvedComments.length})
              </h3>
              
              {approvedComments.length > 0 ? (
                <div className="space-y-8 mb-12">
                  {approvedComments.map((comment, index) => (
                    <div 
                      key={comment.id}
                      className="bg-purple-50 rounded-lg p-6"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center">
                            <User className="h-5 w-5 text-purple-700" />
                          </div>
                          <div className="ml-3">
                            <p className="font-medium text-gray-900">{comment.author}</p>
                            <p className="text-xs text-gray-500">{formatDate(comment.date)}</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 text-gray-800">
                        {comment.content}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center bg-gray-50 p-8 rounded-lg mb-12">
                  <MessageCircle className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                  <p>まだコメントがありません。最初のコメントを残しましょう！</p>
                </div>
              )}
              
              {/* Comment form */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h4 className="text-xl font-bold text-gray-800 mb-4">
                  コメントを残す
                </h4>
                
                {commentSubmitted ? (
                  <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6">
                    コメントありがとうございます！管理者の承認後に表示されます。
                  </div>
                ) : (
                  <form onSubmit={handleCommentSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          お名前 <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={commentForm.name}
                          onChange={handleCommentChange}
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
                          value={commentForm.email}
                          onChange={handleCommentChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                        コメント <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="content"
                        name="content"
                        rows={4}
                        value={commentForm.content}
                        onChange={handleCommentChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                        required
                      />
                    </div>
                    <div className="text-right">
                      <Button
                        type="submit"
                        variant="primary"
                        disabled={submitting}
                      >
                        {submitting ? '送信中...' : 'コメントを投稿'} 
                        {!submitting && <Send className="ml-2 h-4 w-4" />}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default BlogPost; 