/**
 * Utilitaires pour optimiser les images
 */

/**
 * Convertit une URL d'image locale en URL optimisée
 * @param src URL de l'image source
 * @param options Options d'optimisation
 * @returns URL optimisée
 */
export const getOptimizedImageUrl = (
  src: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'jpeg' | 'png' | 'avif';
  } = {}
): string => {
  // Si l'URL est externe, ne pas la modifier
  if (src.startsWith('http')) {
    return src;
  }

  // Pour les images src/assets, utiliser le chemin import.meta.env.BASE_URL
  // qui correspondra à la racine du site en production
  if (src.startsWith('/src/assets/')) {
    // Remplacer /src/assets/ par /assets/ pour la production
    return src.replace('/src/assets/', import.meta.env.BASE_URL + 'assets/');
  }
  
  // Assurons-nous que l'URL est correctement formatée
  const baseUrl = src.startsWith('/') ? src : `/${src}`;
  
  // Pour une implémentation plus complète, vous pourriez utiliser
  // un service comme Vite Image Tools ou next/image

  // Puisque nous n'avons pas de CDN, retournons simplement l'URL d'origine
  // En production, vous remplaceriez cette partie par un appel à votre service d'optimisation
  return baseUrl;
};

/**
 * Génère un srcset pour différentes tailles d'écran
 * @param src URL de l'image source
 * @param options Options pour les différentes tailles
 * @returns String srcset
 */
export const generateSrcSet = (
  src: string,
  options: {
    sizes: number[];
    quality?: number;
    format?: 'webp' | 'jpeg' | 'png' | 'avif';
  } = { sizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840] }
): string => {
  // Si l'URL est externe, ne pas générer de srcset
  if (src.startsWith('http')) {
    return '';
  }
  
  // Pour les images locales, nous n'utilisons pas les options pour l'instant
  // mais nous les gardons pour une implémentation future avec un vrai service
  // d'optimisation d'images
  
  // En production, vous généreriez un vrai srcset avec des URLs optimisées
  // Exemple: return options.sizes.map(size => `${getOptimizedImageUrl(src, { width: size, quality: options.quality, format: options.format })} ${size}w`).join(', ');
  
  // Sans CDN, on renvoie juste l'image originale pour toutes les tailles
  return `${src} 1x, ${src} 2x`;
};

/**
 * Crée un placeholder pour l'image pendant son chargement
 * @param color Couleur de base du placeholder
 * @returns URL du placeholder (petit SVG)
 */
export const createPlaceholder = (color = '#f3f4f6'): string => {
  // Créer un petit SVG comme placeholder
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100%" height="100%" fill="${color}"/></svg>`;
  const encoded = btoa(svg);
  return `data:image/svg+xml;base64,${encoded}`;
};

export default {
  getOptimizedImageUrl,
  generateSrcSet,
  createPlaceholder
}; 