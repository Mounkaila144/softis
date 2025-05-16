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

  useEffect(() => {
    // Préchargement de l'image optimisée
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
      setError(true);
      // En cas d'erreur, utiliser l'image source originale
      setImgSrc(src);
    };
  }, [src, width, height, quality, format, onLoad]);

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
        setError(true);
        setImgSrc(src); // Fallback à l'image source en cas d'erreur
      }}
    />
  );
};

export default OptimizedImage; 