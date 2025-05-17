import React, { useState } from 'react';
import { Send } from 'lucide-react';
import Button from './Button';
import { addQuestionToFirebase } from '../utils/firebaseService';

const QuestionForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    question: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const result = await addQuestionToFirebase(
        formData.question, 
        formData.name, 
        formData.email
      );
      
      if (result) {
        setFormData({
          name: '',
          email: '',
          question: '',
        });
        setSubmitted(true);
        
        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      } else {
        setError('質問の送信中に問題が発生しました。もう一度お試しください。');
      }
    } catch (error) {
      console.error('Erreur lors de la soumission de la question:', error);
      setError('エラーが発生しました。後でもう一度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-turquoise-50 via-pink-50 to-white/90 border border-turquoise-100 rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-serif font-bold text-turquoise-700 mb-6">
        ご質問はこちら
      </h2>
      <div className="w-20 h-1 bg-gradient-to-r from-turquoise-300 to-pink-200 rounded-full mb-6"></div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}
      
      {submitted ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
          ご質問ありがとうございます。スタッフが確認次第、ご回答させていただきます。
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-neutral-700 text-sm font-medium mb-1">
              お名前 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-turquoise-300 shadow-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-neutral-700 text-sm font-medium mb-1">
              メールアドレス <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-turquoise-300 shadow-sm"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              ご回答はメールでお送りします
            </p>
          </div>

          <div>
            <label htmlFor="question" className="block text-neutral-700 text-sm font-medium mb-1">
              ご質問 <span className="text-red-500">*</span>
            </label>
            <textarea
              id="question"
              name="question"
              value={formData.question}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-turquoise-300 shadow-sm"
              required
            ></textarea>
          </div>

          <div className="text-center pt-4">
            <Button
              variant="primary"
              size="lg"
              type="submit"
              disabled={isSubmitting}
              className="shadow-md hover:shadow-lg transform transition hover:-translate-y-1"
            >
              {isSubmitting ? '送信中...' : '質問を送信する'} {!isSubmitting && <Send className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default QuestionForm; 