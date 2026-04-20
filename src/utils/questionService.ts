import { Question } from '../types/questions';
import { v4 as uuidv4 } from 'uuid';

// Fonction pour charger les questions du localStorage
export const loadQuestions = (): Question[] => {
  try {
    const storedQuestions = localStorage.getItem('questions');
    return storedQuestions ? JSON.parse(storedQuestions) : [];
  } catch (error) {
    console.error('Erreur lors du chargement des questions:', error);
    return [];
  }
};

// Fonction pour sauvegarder les questions dans le localStorage
export const saveQuestions = (questions: Question[]): void => {
  try {
    localStorage.setItem('questions', JSON.stringify(questions));
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des questions:', error);
  }
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

  const questions = loadQuestions();
  questions.push(newQuestion);
  saveQuestions(questions);
  
  return newQuestion;
};

// Fonction pour supprimer une question
export const deleteQuestion = (id: string): void => {
  const questions = loadQuestions();
  const updatedQuestions = questions.filter(q => q.id !== id);
  saveQuestions(updatedQuestions);
};

// Fonction pour répondre à une question
export const answerQuestion = (id: string, answer: string): Question | null => {
  const questions = loadQuestions();
  const questionIndex = questions.findIndex(q => q.id === id);
  
  if (questionIndex === -1) return null;
  
  const updatedQuestion = {
    ...questions[questionIndex],
    answer,
    status: 'answered' as 'answered',
    answerDate: new Date().toISOString()
  };
  
  questions[questionIndex] = updatedQuestion;
  saveQuestions(questions);
  
  return updatedQuestion;
};

// Fonction pour mettre à jour une question
export const updateQuestion = (updatedQuestion: Question): Question | null => {
  const questions = loadQuestions();
  const questionIndex = questions.findIndex(q => q.id === updatedQuestion.id);
  
  if (questionIndex === -1) return null;
  
  questions[questionIndex] = updatedQuestion;
  saveQuestions(questions);
  
  return updatedQuestion;
};

// Fonction d'exportation des questions en JSON
export const exportQuestions = (): string => {
  const questions = loadQuestions();
  return JSON.stringify(questions, null, 2);
};

// Fonction d'importation des questions depuis JSON
export const importQuestions = (jsonData: string): boolean => {
  try {
    const questions = JSON.parse(jsonData) as Question[];
    saveQuestions(questions);
    return true;
  } catch (error) {
    console.error('Erreur lors de l\'importation des questions:', error);
    return false;
  }
}; 