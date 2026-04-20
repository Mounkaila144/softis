import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Tag, MessageCircle, ChevronRight } from 'lucide-react';
import Container from '../components/Container';
import Section from '../components/Section';
import Seo from '../components/Seo';
import { BlogPost } from '../types/blog';
import { loadBlogPostsFromFirebase } from '../utils/firebaseService';
import { useTranslation } from '../i18n/useTranslation';

const Blog: React.FC = () => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Charger les articles de blog depuis Firebase
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const blogPosts = await loadBlogPostsFromFirebase();
        setPosts(blogPosts);
        
        // Extraire tous les tags uniques
        const tags = new Set<string>();
        blogPosts.forEach(post => {
          post.tags.forEach(tag => tags.add(tag));
        });
        setAllTags(Array.from(tags));
      } catch (error) {
        console.error('Erreur lors du chargement des articles:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, []);

  // Filtrer les articles par tag si nécessaire
  const filteredPosts = selectedTag 
    ? posts.filter(post => post.tags.includes(selectedTag))
    : posts;

  // Formater la date pour l'affichage
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Générer l'extrait de l'article
  const getExcerpt = (content: string, maxLength = 150) => {
    // Supprimer les balises Markdown
    const plainText = content.replace(/#{1,6} |[*_`~]/g, '');
    if (plainText.length <= maxLength) return plainText;
    return plainText.substring(0, maxLength) + '...';
  };

  // Schéma pour SEO
  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    'headline': t('blog.schemaHeadline'),
    'description': t('blog.schemaDescription'),
    'author': {
      '@type': 'Organization',
      'name': t('blog.schemaAuthorName'),
      'url': 'https://softis.jp'
    },
    'publisher': {
      '@type': 'Organization',
      'name': t('blog.schemaPublisherName'),
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://softis.jp/logo.png'
      }
    },
    'blogPost': posts.map(post => ({
      '@type': 'BlogPosting',
      'headline': post.title,
      'description': getExcerpt(post.content),
      'datePublished': post.date,
      'author': {
        '@type': 'Person',
        'name': post.author
      },
      'keywords': post.tags.join(', ')
    }))
  };

  return (
    <>
      <Seo 
        title={t('blog.seoTitle')}
        description={t('blog.seoDescription')}
        keywords={t('blog.seoKeywords')}
        structuredData={blogSchema}
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
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              {t('blog.title')}
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full mx-auto mb-4"></div>
            <p className="text-white text-xl max-w-3xl mx-auto">
              {t('blog.subtitle')}
            </p>
          </motion.div>
        </Container>
      </div>

      <Section className="bg-gray-50">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar avec tags */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-serif font-bold text-gray-800 mb-4">
                  {t('blog.categories')}
                </h2>
                <div className="space-y-2">
                  <button
                    className={`block w-full text-left px-3 py-2 rounded-lg transition ${selectedTag === null ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'}`}
                    onClick={() => setSelectedTag(null)}
                  >
                    {t('blog.allCategories')}
                  </button>
                  {allTags.map(tag => (
                    <button
                      key={tag}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition ${selectedTag === tag ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'}`}
                      onClick={() => setSelectedTag(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Liste des articles */}
            <div className="lg:col-span-3">
              {loading ? (
                <div className="text-center p-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700 mx-auto"></div>
                  <p className="mt-4 text-gray-600">{t('blog.loading')}</p>
                </div>
              ) : filteredPosts.length > 0 ? (
                <div className="space-y-8">
                  {filteredPosts.map((post, index) => (
                    <motion.article
                      key={post.id}
                      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="md:flex">
                        {post.imageUrl && (
                          <div className="md:flex-shrink-0 h-48 md:h-auto md:w-48 relative overflow-hidden">
                            <img
                              className="w-full h-full object-cover absolute top-0 left-0"
                              src={post.imageUrl}
                              alt={post.title}
                            />
                          </div>
                        )}
                        <div className="p-6 flex flex-col justify-between flex-1">
                          <div>
                            <div className="flex flex-wrap gap-2 mb-2">
                              {post.tags.map(tag => (
                                <span
                                  key={tag}
                                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                                  onClick={() => setSelectedTag(tag)}
                                >
                                  <Tag className="w-3 h-3 mr-1" />
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <Link to={`/blog/${post.id}`} className="block">
                              <h2 className="text-xl font-serif font-bold text-gray-900 hover:text-purple-600 transition">
                                {post.title}
                              </h2>
                            </Link>
                            <div className="mt-3 flex items-center text-sm text-gray-500">
                              <Calendar className="h-4 w-4 mr-1" />
                              <time dateTime={post.date}>{formatDate(post.date)}</time>
                              <span className="mx-1">•</span>
                              <span>{post.author}</span>
                            </div>
                            <p className="mt-3 text-gray-600">
                              {getExcerpt(post.content)}
                            </p>
                          </div>
                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center text-sm text-gray-500">
                              <MessageCircle className="h-4 w-4 mr-1" />
                              <span>{post.comments.filter(c => c.status === 'approved').length} {t('blog.comments')}</span>
                            </div>
                            <Link
                              to={`/blog/${post.id}`}
                              className="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-800"
                            >
                              {t('blog.readMore')}
                              <ChevronRight className="h-4 w-4 ml-1" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              ) : (
                <div className="bg-white p-8 rounded-xl shadow-md text-center">
                  <p className="text-gray-600">{t('blog.noPostsFound')}</p>
                </div>
              )}
              
              {/* Bouton pour créer un nouvel article */}
              <div className="mt-10 text-center">
                <Link
                  to="/blog/new"
                  className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-medium rounded-lg shadow-md hover:bg-purple-700 transition-colors duration-300"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  {t('blog.writeNewPost')}
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default Blog; 