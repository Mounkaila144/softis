import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, HelpCircle } from 'lucide-react';
import Container from '../components/Container';
import Section from '../components/Section';
import QuestionForm from '../components/QuestionForm';
import Seo from '../components/Seo';
import { loadQuestionsFromFirebase } from '../utils/firebaseService';
import { Question } from '../types/questions';

const QuestionsPage: React.FC = () => {
  const [answeredQuestions, setAnsweredQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const questions = await loadQuestionsFromFirebase();
        
        // Filtrer pour n'avoir que les questions utilisateurs répondues
        // (les FAQ sont déjà affichées sur leur propre page)
        setAnsweredQuestions(questions.filter(q => q.status === 'answered' && !q.id.startsWith('faq-')));
      } catch (error) {
        console.error("Erreur lors du chargement des questions:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchQuestions();
  }, []);

  // Schema.orgのデータ構造を作成
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': answeredQuestions.map(q => ({
      '@type': 'Question',
      'name': q.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': q.answer || ''
      }
    }))
  };

  return (
    <>
      <Seo 
        title="よくある質問 | Softis ピラティススタジオ"
        description="Softisピラティススタジオに関するよくある質問と回答。お客様から実際に寄せられた質問にお答えします。"
        keywords="ピラティス, よくある質問, FAQ, 質問と回答, Softis, ピラティススタジオ, 豊田市"
        structuredData={faqSchema}
      />
      
      {/* En-tête */}
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
              質問と回答
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-turquoise-300 to-pink-200 rounded-full mx-auto mb-4"></div>
            <p className="text-white text-xl max-w-3xl mx-auto">
              お客様から寄せられたご質問とその回答をご紹介します
            </p>
          </motion.div>
        </Container>
      </div>

      {/* Questions section */}
      <Section className="bg-turquoise-50">
        <Container>
          <div className="max-w-3xl mx-auto">
            {loading ? (
              <div className="text-center p-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-turquoise-700 mx-auto"></div>
                <p className="mt-4 text-gray-600">質問を読み込んでいます...</p>
              </div>
            ) : answeredQuestions.length > 0 ? (
              <div className="space-y-6 mb-12">
                {answeredQuestions.map((q, index) => (
                  <motion.div
                    key={q.id}
                    className="bg-gradient-to-br from-turquoise-50 via-pink-50 to-white/90 border border-turquoise-100 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex-shrink-0 w-10 h-10 bg-turquoise-100 rounded-full flex items-center justify-center">
                          <HelpCircle className="h-5 w-5 text-turquoise-600" />
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-turquoise-700">
                          {q.question}
                        </h3>
                      </div>
                      
                      <div className="ml-14 text-gray-800 bg-white/80 p-4 rounded-lg shadow-sm leading-relaxed border-l-4 border-turquoise-300">
                        {q.answer}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center p-8 bg-white/80 rounded-lg shadow-sm mb-12">
                <HelpCircle className="h-12 w-12 text-turquoise-400 mx-auto mb-4" />
                <p className="text-gray-600">まだユーザーからの回答済み質問はありません。</p>
                <p className="text-gray-600">下のフォームから質問を投稿してください。</p>
              </div>
            )}
            
            {/* Form section */}
            <QuestionForm />
          </div>
        </Container>
      </Section>
    </>
  );
};

export default QuestionsPage; 