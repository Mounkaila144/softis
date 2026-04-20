import React, { useState } from 'react';
import { Send } from 'lucide-react';
import Button from './Button';
import { addQuestionToFirebase } from '../utils/firebaseService';
import { useTranslation } from '../i18n/useTranslation';

const QuestionForm: React.FC = () => {
  const { t } = useTranslation();
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
        setError(t('questionForm.submissionError'));
      }
    } catch (error) {
      console.error('Erreur lors de la soumission de la question:', error);
      setError(t('questionForm.generalError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-turquoise-50 via-pink-50 to-white/90 border border-turquoise-100 rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-serif font-bold text-turquoise-700 mb-6">
        {t('questionForm.title')}
      </h2>
      <div className="w-20 h-1 bg-gradient-to-r from-turquoise-300 to-pink-200 rounded-full mb-6"></div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}
      
      {submitted ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
          {t('questionForm.successMessage')}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-neutral-700 text-sm font-medium mb-1">
              {t('questionForm.name')} <span className="text-red-500">*</span>
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
              {t('questionForm.email')} <span className="text-red-500">*</span>
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
              {t('questionForm.emailNote')}
            </p>
          </div>

          <div>
            <label htmlFor="question" className="block text-neutral-700 text-sm font-medium mb-1">
              {t('questionForm.question')} <span className="text-red-500">*</span>
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
              className={`shadow-md hover:shadow-lg transform transition hover:-translate-y-1 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? t('questionForm.submitting') : t('questionForm.submit')} {!isSubmitting && <Send className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default QuestionForm; 