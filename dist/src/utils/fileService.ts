import { Question } from '../types/questions';
import questionData from '../data/questions.json';
import { v4 as uuidv4 } from 'uuid';

interface QuestionDataFile {
  faq: {
    id: string;
    question: string;
    answer: string;
    icon: string;
  }[];
  userQuestions: Question[];
}

// Variable en mémoire pour stocker les données
let questionDataCache: QuestionDataFile;

// Fonction pour initialiser le cache de données
const initDataCache = (): void => {
  try {
    const storedData = localStorage.getItem('questionData');
    if (storedData) {
      questionDataCache = JSON.parse(storedData);
    } else {
      questionDataCache = {
        faq: [...questionData.faq],
        userQuestions: [...questionData.userQuestions]
      };
      // Sauvegarde initiale
      saveDataToFile();
    }
  } catch (error) {
    console.error('Erreur lors de l\'initialisation du cache:', error);
    questionDataCache = {
      faq: [...questionData.faq],
      userQuestions: [...questionData.userQuestions]
    };
  }
};

// Initialisation du cache au chargement du module
initDataCache();

// En environnement de production, cette fonction ferait un appel API
// Mais pour la démonstration, nous utilisons localStorage
const saveDataToFile = (): void => {
  // Sauvegarde dans le localStorage
  try {
    localStorage.setItem('questionData', JSON.stringify(questionDataCache));
    console.log('Données sauvegardées dans localStorage');
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des données:', error);
  }
  
  // Dans un vrai environnement de production, on ferait un appel API ici
  // Exemple: await fetch('/api/questions', { method: 'POST', body: JSON.stringify(questionDataCache) });
};

// Fonction pour charger les questions
export const loadQuestions = (): Question[] => {
  // Conversion des questions FAQ en format Question
  const faqQuestions = questionDataCache.faq.map(item => ({
    id: item.id,
    name: 'Softis スタッフ',
    email: 'info@softis.jp',
    question: item.question,
    answer: item.answer,
    date: new Date().toISOString(), // Pas de date initiale pour les FAQ
    status: 'answered' as 'answered',
    answerDate: new Date().toISOString() // Pas de date de réponse pour les FAQ
  }));
  
  // Concaténation avec les questions des utilisateurs
  return [...faqQuestions, ...questionDataCache.userQuestions];
};

// Fonction pour ajouter une nouvelle question
export const addQuestion = (name: string, email: string, question: string): Question => {
  const newQuestion: Question = {
    id: uuidv4(),
    name,
    email,
    question,
    date: new Date().toISOString(),
    status: 'pending'
  };

  questionDataCache.userQuestions.push(newQuestion);
  saveDataToFile();
  
  return newQuestion;
};

// Fonction pour supprimer une question
export const deleteQuestion = (id: string): void => {
  // Vérifier si c'est une question FAQ (ne pas supprimer dans ce cas)
  if (id.startsWith('faq-')) {
    console.error('Les questions de la FAQ ne peuvent pas être supprimées');
    return;
  }
  
  questionDataCache.userQuestions = questionDataCache.userQuestions.filter(q => q.id !== id);
  saveDataToFile();
};

// Fonction pour répondre à une question
export const answerQuestion = (id: string, answer: string): Question | null => {
  // Vérifier si c'est une question FAQ
  if (id.startsWith('faq-')) {
    const faqIndex = questionDataCache.faq.findIndex(q => q.id === id);
    if (faqIndex === -1) return null;
    
    questionDataCache.faq[faqIndex].answer = answer;
    saveDataToFile();
    
    return {
      id: questionDataCache.faq[faqIndex].id,
      name: 'Softis スタッフ',
      email: 'info@softis.jp',
      question: questionDataCache.faq[faqIndex].question,
      answer: questionDataCache.faq[faqIndex].answer,
      date: new Date().toISOString(),
      status: 'answered' as 'answered',
      answerDate: new Date().toISOString()
    };
  }
  
  // C'est une question utilisateur
  const questionIndex = questionDataCache.userQuestions.findIndex(q => q.id === id);
  if (questionIndex === -1) return null;
  
  const updatedQuestion = {
    ...questionDataCache.userQuestions[questionIndex],
    answer,
    status: 'answered' as 'answered',
    answerDate: new Date().toISOString()
  };
  
  questionDataCache.userQuestions[questionIndex] = updatedQuestion;
  saveDataToFile();
  
  return updatedQuestion;
};

// Fonction pour mettre à jour une question
export const updateQuestion = (updatedQuestion: Question): Question | null => {
  // Vérifier si c'est une question FAQ
  if (updatedQuestion.id.startsWith('faq-')) {
    const faqIndex = questionDataCache.faq.findIndex(q => q.id === updatedQuestion.id);
    if (faqIndex === -1) return null;
    
    questionDataCache.faq[faqIndex] = {
      ...questionDataCache.faq[faqIndex],
      question: updatedQuestion.question,
      answer: updatedQuestion.answer || ''
    };
    
    saveDataToFile();
    
    return {
      id: updatedQuestion.id,
      name: 'Softis スタッフ',
      email: 'info@softis.jp',
      question: updatedQuestion.question,
      answer: updatedQuestion.answer || '',
      date: updatedQuestion.date,
      status: 'answered' as 'answered',
      answerDate: updatedQuestion.answerDate || new Date().toISOString()
    };
  }
  
  // C'est une question utilisateur
  const questionIndex = questionDataCache.userQuestions.findIndex(q => q.id === updatedQuestion.id);
  if (questionIndex === -1) return null;
  
  questionDataCache.userQuestions[questionIndex] = updatedQuestion;
  saveDataToFile();
  
  return updatedQuestion;
};

// Fonction d'exportation des questions en JSON
export const exportQuestions = (): string => {
  return JSON.stringify(questionDataCache, null, 2);
};

// Fonction d'importation des questions depuis JSON
export const importQuestions = (jsonData: string): boolean => {
  try {
    const parsedData = JSON.parse(jsonData) as QuestionDataFile;
    questionDataCache = parsedData;
    saveDataToFile();
    return true;
  } catch (error) {
    console.error('Erreur lors de l\'importation des questions:', error);
    return false;
  }
}; 