import React from 'react';
import OptimizedImage from './OptimizedImage';

type OptimizedBackgroundImageProps = {
  src: string;
  alt: string;
  className?: string;
  overlayColor?: string;
  overlayOpacity?: number; 
  children?: React.ReactNode;
  quality?: number;
};

/**
 * Composant pour afficher une image d'arrière-plan optimisée
 */
const OptimizedBackgroundImage: React.FC<OptimizedBackgroundImageProps> = ({
  src,
  alt,
  className = '',
  overlayColor = 'rgb(0, 62, 76)', // primary-900
  overlayOpacity = 0.7,
  children,
  quality = 85,
}) => {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 z-0 overflow-hidden">
        <OptimizedImage
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          loading="eager"
          quality={quality}
          format="webp"
        />
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundColor: overlayColor, 
            opacity: overlayOpacity 
          }}
        />
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default OptimizedBackgroundImage; 