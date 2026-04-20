import { BlogPost, Comment } from '../types/blog';
import blogData from '../data/blog.json';
import { v4 as uuidv4 } from 'uuid';

interface BlogDataFile {
  posts: BlogPost[];
}

// Variable en mémoire pour stocker les données
let blogDataCache: BlogDataFile;

// Fonction pour initialiser le cache de données
const initDataCache = (): void => {
  try {
    const storedData = localStorage.getItem('blogData');
    if (storedData) {
      blogDataCache = JSON.parse(storedData);
    } else {
      blogDataCache = {
        posts: [...blogData.posts]
      };
      // Sauvegarde initiale
      saveDataToFile();
    }
  } catch (error) {
    console.error('Erreur lors de l\'initialisation du cache du blog:', error);
    blogDataCache = {
      posts: [...blogData.posts]
    };
  }
};

// Initialisation du cache au chargement du module
initDataCache();

// Sauvegarde des données dans localStorage
const saveDataToFile = (): void => {
  try {
    localStorage.setItem('blogData', JSON.stringify(blogDataCache));
    console.log('Données du blog sauvegardées dans localStorage');
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des données du blog:', error);
  }
};

// Fonction pour charger tous les articles
export const loadBlogPosts = (): BlogPost[] => {
  return [...blogDataCache.posts];
};

// Fonction pour charger un article spécifique
export const loadBlogPost = (id: string): BlogPost | null => {
  const post = blogDataCache.posts.find(p => p.id === id);
  return post ? { ...post } : null;
};

// Fonction pour ajouter un nouvel article
export const addBlogPost = (
  title: string,
  content: string,
  author: string,
  email: string,
  tags: string[],
  imageUrl?: string
): BlogPost => {
  const newPost: BlogPost = {
    id: uuidv4(),
    title,
    content,
    author,
    email,
    date: new Date().toISOString(),
    tags,
    imageUrl,
    comments: [],
    status: 'published'
  };

  blogDataCache.posts.push(newPost);
  saveDataToFile();
  
  return newPost;
};

// Fonction pour modifier un article
export const updateBlogPost = (updatedPost: BlogPost): BlogPost | null => {
  const postIndex = blogDataCache.posts.findIndex(p => p.id === updatedPost.id);
  if (postIndex === -1) return null;
  
  blogDataCache.posts[postIndex] = updatedPost;
  saveDataToFile();
  
  return updatedPost;
};

// Fonction pour supprimer un article
export const deleteBlogPost = (id: string): boolean => {
  const initialLength = blogDataCache.posts.length;
  blogDataCache.posts = blogDataCache.posts.filter(p => p.id !== id);
  
  if (blogDataCache.posts.length !== initialLength) {
    saveDataToFile();
    return true;
  }
  
  return false;
};

// Fonction pour ajouter un commentaire
export const addComment = (
  postId: string,
  author: string,
  email: string,
  content: string
): Comment | null => {
  const postIndex = blogDataCache.posts.findIndex(p => p.id === postId);
  if (postIndex === -1) return null;
  
  const newComment: Comment = {
    id: uuidv4(),
    postId,
    author,
    email,
    content,
    date: new Date().toISOString(),
    status: 'pending'
  };
  
  blogDataCache.posts[postIndex].comments.push(newComment);
  saveDataToFile();
  
  return newComment;
};

// Fonction pour approuver un commentaire
export const approveComment = (postId: string, commentId: string): Comment | null => {
  const postIndex = blogDataCache.posts.findIndex(p => p.id === postId);
  if (postIndex === -1) return null;
  
  const commentIndex = blogDataCache.posts[postIndex].comments.findIndex(c => c.id === commentId);
  if (commentIndex === -1) return null;
  
  blogDataCache.posts[postIndex].comments[commentIndex].status = 'approved';
  saveDataToFile();
  
  return blogDataCache.posts[postIndex].comments[commentIndex];
};

// Fonction pour supprimer un commentaire
export const deleteComment = (postId: string, commentId: string): boolean => {
  const postIndex = blogDataCache.posts.findIndex(p => p.id === postId);
  if (postIndex === -1) return false;
  
  const initialLength = blogDataCache.posts[postIndex].comments.length;
  blogDataCache.posts[postIndex].comments = blogDataCache.posts[postIndex].comments.filter(c => c.id !== commentId);
  
  if (blogDataCache.posts[postIndex].comments.length !== initialLength) {
    saveDataToFile();
    return true;
  }
  
  return false;
};

// Fonction d'exportation des articles en JSON
export const exportBlogData = (): string => {
  return JSON.stringify(blogDataCache, null, 2);
};

// Fonction d'importation des articles depuis JSON
export const importBlogData = (jsonData: string): boolean => {
  try {
    const parsedData = JSON.parse(jsonData) as BlogDataFile;
    blogDataCache = parsedData;
    saveDataToFile();
    return true;
  } catch (error) {
    console.error('Erreur lors de l\'importation des données du blog:', error);
    return false;
  }
}; 