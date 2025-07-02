import { db } from '../config/firebase';
import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc, query, where, getDoc, setDoc } from 'firebase/firestore';
import { Question } from '../types/questions';
import { BlogPost, Comment } from '../types/blog';
import { v4 as uuidv4 } from 'uuid';

// Collections
const QUESTIONS_COLLECTION = 'questions';
const BLOG_COLLECTION = 'blog';

// =================== Service pour les Questions (FAQ) ===================

// Charger toutes les questions
export const loadQuestionsFromFirebase = async (): Promise<Question[]> => {
  try {
    const questionsCollection = collection(db, QUESTIONS_COLLECTION);
    const querySnapshot = await getDocs(questionsCollection);
    
    const questions: Question[] = [];
    querySnapshot.forEach((doc) => {
      questions.push({ id: doc.id, ...doc.data() } as Question);
    });
    
    return questions;
  } catch (error) {
    console.error('Erreur lors du chargement des questions:', error);
    return [];
  }
};

// Ajouter une nouvelle question
export const addQuestionToFirebase = async (question: string, name: string, email: string): Promise<Question | null> => {
  try {
    const newQuestion: Omit<Question, 'id'> = {
      question,
      name,
      email,
      answer: null,
      date: new Date().toISOString(),
      status: 'pending'
    };
    
    const docRef = await addDoc(collection(db, QUESTIONS_COLLECTION), newQuestion);
    return { id: docRef.id, ...newQuestion };
  } catch (error) {
    console.error('Erreur lors de l\'ajout d\'une question:', error);
    return null;
  }
};

// Répondre à une question
export const answerQuestionInFirebase = async (id: string, answer: string): Promise<boolean> => {
  try {
    // Vérifier d'abord que le document existe
    const questionRef = doc(db, QUESTIONS_COLLECTION, id);
    const questionDoc = await getDoc(questionRef);
    
    if (!questionDoc.exists()) {
      console.error(`Question avec ID ${id} n'existe pas`);
      return false;
    }
    
    // Ajouter la date de réponse
    const answerDate = new Date().toISOString();
    
    // Mettre à jour le document avec la réponse, le statut et la date
    await updateDoc(questionRef, {
      answer,
      status: 'answered',
      answerDate
    });
    
    return true;
  } catch (error) {
    console.error('Erreur lors de la réponse à une question:', error);
    console.error('Détails:', JSON.stringify(error));
    return false;
  }
};

// Supprimer une question
export const deleteQuestionFromFirebase = async (id: string): Promise<boolean> => {
  try {
    await deleteDoc(doc(db, QUESTIONS_COLLECTION, id));
    return true;
  } catch (error) {
    console.error('Erreur lors de la suppression d\'une question:', error);
    return false;
  }
};

// Mettre à jour une question
export const updateQuestionInFirebase = async (question: Question): Promise<boolean> => {
  try {
    const { id, ...questionData } = question;
    
    // Vérifier d'abord que le document existe
    const questionRef = doc(db, QUESTIONS_COLLECTION, id);
    const questionDoc = await getDoc(questionRef);
    
    if (!questionDoc.exists()) {
      console.error(`Question avec ID ${id} n'existe pas`);
      return false;
    }
    
    // Si le statut est modifié de "pending" à "answered", ajouter la date de réponse
    if (questionData.status === 'answered' && questionDoc.data().status === 'pending') {
      questionData.answerDate = new Date().toISOString();
    }
    
    // Mettre à jour le document
    await updateDoc(questionRef, questionData);
    return true;
  } catch (error) {
    console.error('Erreur lors de la mise à jour d\'une question:', error);
    console.error('Détails:', JSON.stringify(error));
    return false;
  }
};

// =================== Service pour le Blog ===================

// Charger tous les articles
export const loadBlogPostsFromFirebase = async (): Promise<BlogPost[]> => {
  try {
    const blogCollection = collection(db, BLOG_COLLECTION);
    const querySnapshot = await getDocs(blogCollection);
    
    const posts: BlogPost[] = [];
    querySnapshot.forEach((doc) => {
      const postData = doc.data() as Omit<BlogPost, 'id'>;
      const post = { id: doc.id, ...postData } as BlogPost;
      
      // S'assurer que comments est toujours un tableau
      if (!Array.isArray(post.comments)) {
        post.comments = [];
      }
      
      // Log pour déboguer les commentaires
      if (post.comments.length > 0) {
        console.log(`Post ${post.id} has ${post.comments.length} comments:`, post.comments);
        console.log(`Approved comments: ${post.comments.filter(c => c.status === 'approved').length}`);
      }
      
      posts.push(post);
    });
    
    return posts;
  } catch (error) {
    console.error('Erreur lors du chargement des articles de blog:', error);
    return [];
  }
};

// Charger un article spécifique
export const loadBlogPostFromFirebase = async (id: string): Promise<BlogPost | null> => {
  try {
    const postDoc = await getDoc(doc(db, BLOG_COLLECTION, id));
    
    if (postDoc.exists()) {
      return { id: postDoc.id, ...postDoc.data() } as BlogPost;
    }
    
    return null;
  } catch (error) {
    console.error('Erreur lors du chargement d\'un article de blog:', error);
    return null;
  }
};

// Ajouter un nouvel article
export const addBlogPostToFirebase = async (
  title: string,
  content: string,
  author: string,
  email: string,
  tags: string[],
  imageUrl?: string
): Promise<BlogPost | null> => {
  try {
    const newPost: Omit<BlogPost, 'id'> = {
      title,
      content,
      author,
      email,
      date: new Date().toISOString(),
      tags,
      imageUrl: imageUrl || null,
      comments: [],
      status: 'published'
    };
    
    const docRef = await addDoc(collection(db, BLOG_COLLECTION), newPost);
    return { id: docRef.id, ...newPost };
  } catch (error) {
    console.error('Erreur lors de l\'ajout d\'un article de blog:', error);
    return null;
  }
};

// Mettre à jour un article
export const updateBlogPostInFirebase = async (updatedPost: BlogPost): Promise<BlogPost | null> => {
  try {
    const { id, ...postData } = updatedPost;
    await setDoc(doc(db, BLOG_COLLECTION, id), postData);
    return updatedPost;
  } catch (error) {
    console.error('Erreur lors de la mise à jour d\'un article de blog:', error);
    return null;
  }
};

// Supprimer un article
export const deleteBlogPostFromFirebase = async (id: string): Promise<boolean> => {
  try {
    await deleteDoc(doc(db, BLOG_COLLECTION, id));
    return true;
  } catch (error) {
    console.error('Erreur lors de la suppression d\'un article de blog:', error);
    return false;
  }
};

// Ajouter un commentaire
export const addCommentToFirebase = async (
  postId: string,
  author: string,
  email: string,
  content: string
): Promise<Comment | null> => {
  try {
    console.log(`Ajout d'un commentaire pour l'article ${postId}`);
    
    // D'abord, obtenir l'article actuel
    const postDoc = await getDoc(doc(db, BLOG_COLLECTION, postId));
    
    if (!postDoc.exists()) {
      console.error(`Article avec ID ${postId} non trouvé`);
      return null;
    }
    
    const post = postDoc.data() as Omit<BlogPost, 'id'>;
    
    // Créer le nouveau commentaire
    const newComment: Comment = {
      id: uuidv4(),
      postId,
      author,
      email,
      content,
      date: new Date().toISOString(),
      status: 'approved'  // Approuvé automatiquement pour les tests
    };
    
    // Ajouter le commentaire à l'article
    const updatedComments = [...(post.comments || []), newComment];
    
    console.log(`Commentaire créé:`, newComment);
    console.log('Tentative de mise à jour avec les commentaires:', updatedComments);
    
    // Mettre à jour l'article
    await updateDoc(doc(db, BLOG_COLLECTION, postId), {
      comments: updatedComments
    });
    
    console.log(`Commentaire ajouté avec succès à l'article ${postId}`);
    return newComment;
  } catch (error) {
    console.error('Erreur lors de l\'ajout d\'un commentaire:', error);
    console.error('Détails de l\'erreur:', JSON.stringify(error));
    return null;
  }
};

// Approuver un commentaire
export const approveCommentInFirebase = async (postId: string, commentId: string): Promise<boolean> => {
  try {
    console.log(`Tentative d'approbation du commentaire ${commentId} pour l'article ${postId}`);
    
    // D'abord, obtenir l'article actuel
    const postDoc = await getDoc(doc(db, BLOG_COLLECTION, postId));
    
    if (!postDoc.exists()) {
      console.error(`Article avec ID ${postId} non trouvé`);
      return false;
    }
    
    const post = postDoc.data() as Omit<BlogPost, 'id'>;
    
    // S'assurer que comments est un tableau
    if (!Array.isArray(post.comments)) {
      console.error('Le champ comments n\'est pas un tableau:', post.comments);
      return false;
    }
    
    // Vérifier si le commentaire existe
    const commentIndex = post.comments.findIndex(comment => comment.id === commentId);
    if (commentIndex === -1) {
      console.error(`Commentaire avec ID ${commentId} non trouvé dans l'article ${postId}`);
      return false;
    }
    
    console.log('Commentaire avant mise à jour:', post.comments[commentIndex]);
    
    // Trouver et mettre à jour le commentaire
    const updatedComments = post.comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          status: 'approved'
        };
      }
      return comment;
    });
    
    console.log('Commentaires mis à jour:', updatedComments);
    
    // Mettre à jour l'article
    await updateDoc(doc(db, BLOG_COLLECTION, postId), {
      comments: updatedComments
    });
    
    console.log(`Commentaire ${commentId} approuvé avec succès`);
    return true;
  } catch (error) {
    console.error('Erreur lors de l\'approbation d\'un commentaire:', error);
    console.error('Détails:', JSON.stringify(error));
    return false;
  }
};

// Supprimer un commentaire
export const deleteCommentFromFirebase = async (postId: string, commentId: string): Promise<boolean> => {
  try {
    // D'abord, obtenir l'article actuel
    const postDoc = await getDoc(doc(db, BLOG_COLLECTION, postId));
    
    if (!postDoc.exists()) {
      return false;
    }
    
    const post = postDoc.data() as Omit<BlogPost, 'id'>;
    
    // Filtrer les commentaires pour supprimer celui avec l'ID spécifié
    const updatedComments = post.comments.filter(comment => comment.id !== commentId);
    
    // Mettre à jour l'article
    await updateDoc(doc(db, BLOG_COLLECTION, postId), {
      comments: updatedComments
    });
    
    return true;
  } catch (error) {
    console.error('Erreur lors de la suppression d\'un commentaire:', error);
    return false;
  }
}; 