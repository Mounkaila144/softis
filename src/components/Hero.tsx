import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from './Container';
import Button from './Button';
import OptimizedImage from './OptimizedImage';

type HeroProps = {
  titles?: string[];
  subtitles?: string[];
  title?: string;
  subtitle?: string;
  ctaText: string;
  promoText?: string;
  imageUrl?: string;
  images?: string[];
  onCtaClick?: () => void;
};

const Hero: React.FC<HeroProps> = ({
  titles = [],
  subtitles = [],
  title,
  subtitle,
  ctaText,
  promoText,
  imageUrl,
  images = [],
  onCtaClick,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  
  const allImages = images.length > 0 ? images : imageUrl ? [imageUrl] : [];
  const allTitles = titles.length > 0 ? titles : title ? [title] : [''];
  const allSubtitles = subtitles.length > 0 ? subtitles : subtitle ? [subtitle] : [''];

  useEffect(() => {
    if (allImages.length <= 1 && allTitles.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
      setCurrentTextIndex((prev) => (prev + 1) % Math.max(allTitles.length, allSubtitles.length));
    }, 8000);

    return () => clearInterval(interval);
  }, [allImages.length, allTitles.length, allSubtitles.length]);

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => ({ ...prev, [index]: true }));
  };

  return (
    <div className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
      {/* Background images with carousel */}
      <AnimatePresence mode="sync">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0">
            {/* Utilisation de la div en background pour maintenir la compatibilité */}
            <div
              className="absolute inset-0 bg-turquoise-200"
              style={{
                opacity: loadedImages[currentImageIndex] ? 0 : 1,
                transition: 'opacity 0.5s ease',
              }}
            />
            <OptimizedImage
              src={allImages[currentImageIndex]}
              alt={`Background image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
              style={{ objectPosition: 'center' }}
              loading={currentImageIndex === 0 ? 'eager' : 'lazy'}
              quality={85}
              onLoad={() => handleImageLoad(currentImageIndex)}
            />
          </div>
          <div className="absolute inset-0 bg-primary-900 bg-opacity-40" />
        </motion.div>
      </AnimatePresence>

      {/* Promotion text - corner badge */}
      {promoText && (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="absolute bottom-24 left-6 z-30 max-w-xs"
        >
          <div className="bg-black/40 backdrop-blur-sm text-white px-4 py-2 rounded-lg border border-white/20 text-xs md:text-sm shadow-lg">
            {promoText}
          </div>
        </motion.div>
      )}

      {/* Carousel indicators */}
      {allImages.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {allImages.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentImageIndex(index);
                setCurrentTextIndex(index % Math.max(allTitles.length, allSubtitles.length));
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? 'bg-turquoise-200 w-8'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      <Container className="relative z-10">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.h1
              key={`title-${currentTextIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7 }}
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight mb-6"
            >
              {allTitles[currentTextIndex % allTitles.length]}
            </motion.h1>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.p
              key={`subtitle-${currentTextIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7 }}
              className="text-xl md:text-2xl text-white opacity-90 mb-8"
            >
              {allSubtitles[currentTextIndex % allSubtitles.length]}
            </motion.p>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <Button variant="gold" size="lg" onClick={onCtaClick}>
              {ctaText}
            </Button>
          </motion.div>
        </div>
      </Container>

      {/* Decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/10 to-transparent" />
    </div>
  );
};

export default Hero;