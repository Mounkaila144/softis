import React, { useState, useEffect } from 'react';
import { getOptimizedImageUrl, generateSrcSet, createPlaceholder } from '../utils/imageUtils';

type OptimizedImageProps = {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  width?: number;
  height?: number;
  quality?: number;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  placeholder?: string;
  format?: 'webp' | 'jpeg' | 'png' | 'avif';
};

/**
 * Composant pour afficher des images optimisées avec lazy loading
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  style = {},
  width,
  height,
  quality = 75, // Qualité par défaut
  sizes = '100vw',
  loading = 'lazy',
  onLoad,
  placeholder,
  format = 'webp',
}) => {
  const [loaded, setLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(placeholder || createPlaceholder());
  const [error, setError] = useState(false);
  const [attemptedFallback, setAttemptedFallback] = useState(false);

  useEffect(() => {
    // Réinitialiser les états lors du changement de source
    if (!attemptedFallback) {
      const img = new Image();
      
      // Utiliser l'URL optimisée
      const optimizedSrc = getOptimizedImageUrl(src, { 
        width, 
        height, 
        quality,
        format 
      });
      
      img.src = optimizedSrc;
      
      img.onload = () => {
        setImgSrc(optimizedSrc);
        setLoaded(true);
        if (onLoad) onLoad();
      };
      
      img.onerror = () => {
        // En cas d'erreur, tenter avec un chemin alternatif
        if (src.startsWith('/src/assets/') && !import.meta.env.DEV) {
          setAttemptedFallback(true);
          // Essayer avec le chemin original (sans modification)
          const originalPath = import.meta.env.BASE_URL + src.substring(1);
          
          const fallbackImg = new Image();
          fallbackImg.src = originalPath;
          
          fallbackImg.onload = () => {
            setImgSrc(originalPath);
            setLoaded(true);
            if (onLoad) onLoad();
          };
          
          fallbackImg.onerror = () => {
            setError(true);
            // Si tous les chemins échouent, utiliser l'image source originale
            setImgSrc(src);
          };
        } else {
          setError(true);
          // Utiliser l'image source originale
          setImgSrc(src);
        }
      };
    }
    
    // Nettoyage lors du démontage
    return () => {
      // Réinitialiser l'état en cas de changement de source
      setAttemptedFallback(false);
    };
  }, [src]); // Ne dépend que de src, pas des options de formatage

  // Générer un srcset approprié
  const srcSet = !error ? generateSrcSet(src, {
    sizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    quality,
    format
  }) : '';

  const imageStyle = {
    ...style,
    transition: 'opacity 0.5s ease',
    opacity: loaded ? 1 : 0.3,
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={`${className}`}
      style={imageStyle}
      width={width}
      height={height}
      loading={loading}
      sizes={sizes}
      srcSet={srcSet}
      onLoad={() => setLoaded(true)}
      onError={() => {
        // Éviter les tentatives multiples qui pourraient causer une boucle
        if (src.startsWith('/src/assets/') && !error && !import.meta.env.DEV && !attemptedFallback) {
          setAttemptedFallback(true);
          // Essayer avec le chemin original (sans modification)
          const originalPath = import.meta.env.BASE_URL + src.substring(1);
          setImgSrc(originalPath);
        } else {
          setError(true);
          setImgSrc(src); // Fallback à l'image source en cas d'erreur
        }
      }}
    />
  );
};

export default OptimizedImage; 