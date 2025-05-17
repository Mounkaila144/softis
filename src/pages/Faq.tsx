import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '../components/Container';
import Section from '../components/Section';
import Seo from '../components/Seo';
import { ChevronDown, ChevronUp, Clock, Users, Sparkles, MapPin, HelpCircle, AlertCircle, Dumbbell, Shirt, Calendar, MessageCircle } from 'lucide-react';
import { loadQuestionsFromFirebase } from '../utils/firebaseService';
import { Question } from '../types/questions';
import { Link } from 'react-router-dom';

// Map pour convertir les noms d'icônes en composants Lucide
const iconMap: Record<string, React.ElementType> = {
  Sparkles, HelpCircle, Shirt, Clock, AlertCircle, Calendar, Users, Dumbbell, MessageCircle
};

const Faq: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [faqItems, setFaqItems] = useState<Array<{
    id: string;
    question: string;
    answer: React.ReactNode | string;
    icon: React.ElementType;
  }>>([]);
  const [userAnsweredQuestions, setUserAnsweredQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Charger les données des questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const allQuestions = await loadQuestionsFromFirebase();
        
        // Extraire les questions FAQ
        const faqQuestions = allQuestions
          .filter(q => q.id.startsWith('faq-'))
          .map(q => ({
            id: q.id,
            question: q.question,
            answer: q.answer,
            icon: iconMap[q.id.includes('faq-') ? 'HelpCircle' : 'MessageCircle'] || HelpCircle
          }));
        
        setFaqItems(faqQuestions);
        
        // Extraire les questions utilisateurs répondues
        setUserAnsweredQuestions(allQuestions.filter(q => q.status === 'answered' && !q.id.startsWith('faq-')));
      } catch (error) {
        console.error("Erreur lors du chargement des questions:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchQuestions();
  }, []);

  const toggleQuestion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Schema.org データ構造を作成 - Inclure toutes les questions
  const allQuestions = [
    ...faqItems.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: typeof item.answer === 'string' ? item.answer : 'お問い合わせください'
      }
    })),
    ...userAnsweredQuestions.map(q => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer || ''
      }
    }))
  ];
  
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allQuestions
  };

  return (
      <>
        <Seo 
          title="よくある質問 - ピラティススタジオSoftis"
          description="Softisピラティススタジオに関するよくある質問をまとめました。レッスンの予約、持ち物、キャンセル方法などについてご案内します。"
          keywords="ピラティス, よくある質問, FAQ, 初心者, 予約方法, キャンセル, 持ち物, Softis, ピラティススタジオ"
          structuredData={faqSchema}
        />
        {/* En-tête avec fond dégradé au lieu d'une image */}
        <div className="relative pt-32 pb-16 text-white">
          <div className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-r from-turquoise-700 to-turquoise-500">
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
                よくある質問
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-turquoise-300 to-pink-200 rounded-full mx-auto mb-4"></div>
              <p className="text-white text-xl max-w-3xl mx-auto">
                Softisに関するご質問にお答えします
              </p>
            </motion.div>
          </Container>
        </div>

        <Section className="bg-turquoise-50">
          <Container>
            <div className="max-w-3xl mx-auto">
              {loading ? (
                <div className="text-center p-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-turquoise-700 mx-auto"></div>
                  <p className="mt-4 text-gray-600">FAQを読み込んでいます...</p>
                </div>
              ) : (
                <>
                  {/* FAQ公式の質問 */}
                  <h2 className="text-2xl font-serif font-bold text-gray-800 mb-8 text-center">
                    スタッフからの回答
                  </h2>
                  {faqItems.length > 0 ? (
                    <div className="space-y-4">
                      {faqItems.map((item, index) => {
                        const Icon = item.icon;
                        const isActive = activeIndex === index;
                        
                        return (
                          <motion.div
                            key={index}
                            className={`bg-gradient-to-br from-turquoise-50 via-pink-50 to-white/90 border ${isActive ? 'border-turquoise-300' : 'border-turquoise-100'} rounded-xl shadow-lg hover:shadow-xl transition-all duration-300`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.01 }}
                          >
                            <button
                              className="w-full text-left p-6 focus:outline-none"
                              onClick={() => toggleQuestion(index)}
                              aria-expanded={isActive}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                  <div className={`flex-shrink-0 w-12 h-12 ${isActive ? 'bg-turquoise-200' : 'bg-turquoise-100'} rounded-full flex items-center justify-center shadow-inner transition-colors duration-300`}>
                                    <Icon className={`h-6 w-6 ${isActive ? 'text-turquoise-600' : 'text-turquoise-500'} transition-colors duration-300`} />
                                  </div>
                                  <h3 className={`text-xl font-bold ${isActive ? 'text-turquoise-700' : 'text-turquoise-600'} transition-colors duration-300`}>
                                    {item.question}
                                  </h3>
                                </div>
                                <div className={`flex-shrink-0 w-6 h-6 bg-${isActive ? 'turquoise' : 'gray'}-100 rounded-full flex items-center justify-center`}>
                                  {isActive ? (
                                    <ChevronUp className="h-4 w-4 text-turquoise-600" />
                                  ) : (
                                    <ChevronDown className="h-4 w-4 text-gray-600" />
                                  )}
                                </div>
                              </div>
                            </button>
                            
                            <AnimatePresence>
                              {isActive && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="px-6 pb-6 pt-0"
                                >
                                  <div className="text-gray-800 bg-white/80 p-4 rounded-lg shadow-sm leading-relaxed border-l-4 border-turquoise-300">
                                    {item.answer}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center p-8 bg-white/80 rounded-lg shadow-sm mb-12">
                      <HelpCircle className="h-12 w-12 text-turquoise-400 mx-auto mb-4" />
                      <p className="text-gray-600">FAQデータがありません。</p>
                    </div>
                  )}
                  
                  {/* ユーザーからの回答済み質問 */}
                  {userAnsweredQuestions.length > 0 && (
                    <>
                      <h2 className="text-2xl font-serif font-bold text-gray-800 mb-8 text-center mt-16">
                        お客様からよくある質問
                      </h2>
                      <div className="space-y-4">
                        {userAnsweredQuestions.map((q, index) => {
                          const questionIndex = index + faqItems.length;
                          const isActive = activeIndex === questionIndex;
                          
                          return (
                            <motion.div
                              key={q.id}
                              className={`bg-gradient-to-br from-turquoise-50 via-pink-50 to-white/90 border ${isActive ? 'border-turquoise-300' : 'border-turquoise-100'} rounded-xl shadow-lg hover:shadow-xl transition-all duration-300`}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: index * 0.1 }}
                              whileHover={{ scale: 1.01 }}
                            >
                              <button
                                className="w-full text-left p-6 focus:outline-none"
                                onClick={() => toggleQuestion(questionIndex)}
                                aria-expanded={isActive}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-4">
                                    <div className={`flex-shrink-0 w-12 h-12 ${isActive ? 'bg-turquoise-200' : 'bg-turquoise-100'} rounded-full flex items-center justify-center shadow-inner transition-colors duration-300`}>
                                      <MessageCircle className={`h-6 w-6 ${isActive ? 'text-turquoise-600' : 'text-turquoise-500'} transition-colors duration-300`} />
                                    </div>
                                    <h3 className={`text-xl font-bold ${isActive ? 'text-turquoise-700' : 'text-turquoise-600'} transition-colors duration-300`}>
                                      {q.question}
                                    </h3>
                                  </div>
                                  <div className={`flex-shrink-0 w-6 h-6 bg-${isActive ? 'turquoise' : 'gray'}-100 rounded-full flex items-center justify-center`}>
                                    {isActive ? (
                                      <ChevronUp className="h-4 w-4 text-turquoise-600" />
                                    ) : (
                                      <ChevronDown className="h-4 w-4 text-gray-600" />
                                    )}
                                  </div>
                                </div>
                              </button>
                              
                              <AnimatePresence>
                                {isActive && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="px-6 pb-6 pt-0"
                                  >
                                    <div className="text-gray-800 bg-white/80 p-4 rounded-lg shadow-sm leading-relaxed border-l-4 border-turquoise-300">
                                      {q.answer}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </motion.div>
                          );
                        })}
                      </div>
                    </>
                  )}
                </>
              )}
              
              {/* Section pour d'autres questions */}
              <motion.div
                className="mt-12 text-center p-6 bg-gradient-to-br from-turquoise-50 via-pink-50 to-white/90 border border-turquoise-100 rounded-xl shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-turquoise-100 rounded-full flex items-center justify-center shadow-inner">
                    <MessageCircle className="h-8 w-8 text-turquoise-500" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-turquoise-700 mb-3">
                  まだ質問がありますか？
                </h3>
                <p className="text-gray-800 mb-6">
                  他にわからないことがあれば、お気軽にお問い合わせください。
                </p>
                <Link 
                  to="/questions"
                  className="inline-flex items-center px-6 py-3 bg-turquoise-500 text-white font-medium rounded-lg shadow-md hover:bg-turquoise-600 transition-colors duration-300"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  質問を投稿する
                </Link>
              </motion.div>
            </div>
          </Container>
        </Section>
      </>
  );
};

export default Faq;