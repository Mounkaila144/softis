/**
 * Cet utilitaire est destiné à migrer les données de localStorage vers Firebase.
 * Il va lire les données du localStorage et les écrire dans Firestore.
 */

import { db } from '../config/firebase';
import { collection, addDoc, writeBatch, doc } from 'firebase/firestore';
import { Question } from '../types/questions';
import { BlogPost } from '../types/blog';

// Fonction principale de migration
export const migrateDataToFirebase = async (): Promise<{
  success: boolean;
  questionsCount: number;
  blogPostsCount: number;
  errors: string[];
}> => {
  const result = {
    success: false,
    questionsCount: 0,
    blogPostsCount: 0,
    errors: [] as string[]
  };

  try {
    // Migrer les questions
    const migratedQuestions = await migrateQuestions();
    result.questionsCount = migratedQuestions.count;
    if (migratedQuestions.errors.length > 0) {
      result.errors = [...result.errors, ...migratedQuestions.errors];
    }
    
    // Migrer les articles
    const migratedPosts = await migrateBlogPosts();
    result.blogPostsCount = migratedPosts.count;
    if (migratedPosts.errors.length > 0) {
      result.errors = [...result.errors, ...migratedPosts.errors];
    }
    
    result.success = true;
    return result;
  } catch (error) {
    console.error('Erreur lors de la migration des données:', error);
    result.errors.push('Migration échouée: ' + (error instanceof Error ? error.message : String(error)));
    return result;
  }
};

// Fonction pour migrer les questions
const migrateQuestions = async (): Promise<{ count: number; errors: string[] }> => {
  const result = { count: 0, errors: [] as string[] };
  
  try {
    // Lire les questions depuis localStorage
    const storedQuestions = localStorage.getItem('questions');
    if (!storedQuestions) {
      return result; // Pas de questions à migrer
    }
    
    const questions = JSON.parse(storedQuestions) as Question[];
    
    // Utiliser un batch pour écrire plusieurs documents à la fois
    const batch = writeBatch(db);
    
    for (const question of questions) {
      try {
        // Ne pas inclure l'ID dans l'objet à insérer
        const { id, ...questionData } = question;
        
        // Ajouter la question au batch
        const questionRef = doc(db, 'questions', id);
        batch.set(questionRef, questionData);
        
        result.count++;
      } catch (error) {
        console.error(`Erreur lors de la migration de la question ${question.id}:`, error);
        result.errors.push(`Question ${question.id}: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
    
    // Exécuter le batch d'écriture
    await batch.commit();
    
    return result;
  } catch (error) {
    console.error('Erreur lors de la migration des questions:', error);
    result.errors.push('Migration des questions échouée: ' + (error instanceof Error ? error.message : String(error)));
    return result;
  }
};

// Fonction pour migrer les articles de blog
const migrateBlogPosts = async (): Promise<{ count: number; errors: string[] }> => {
  const result = { count: 0, errors: [] as string[] };
  
  try {
    // Lire les articles de blog depuis localStorage
    const storedBlogData = localStorage.getItem('blogData');
    if (!storedBlogData) {
      return result; // Pas d'articles à migrer
    }
    
    const blogData = JSON.parse(storedBlogData) as { posts: BlogPost[] };
    
    // Utiliser un batch pour écrire plusieurs documents à la fois
    const batch = writeBatch(db);
    
    for (const post of blogData.posts) {
      try {
        // Ne pas inclure l'ID dans l'objet à insérer
        const { id, ...postData } = post;
        
        // Ajouter l'article au batch
        const postRef = doc(db, 'blog', id);
        batch.set(postRef, postData);
        
        result.count++;
      } catch (error) {
        console.error(`Erreur lors de la migration de l'article ${post.id}:`, error);
        result.errors.push(`Article ${post.id}: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
    
    // Exécuter le batch d'écriture
    await batch.commit();
    
    return result;
  } catch (error) {
    console.error('Erreur lors de la migration des articles de blog:', error);
    result.errors.push('Migration des articles échouée: ' + (error instanceof Error ? error.message : String(error)));
    return result;
  }
}; 