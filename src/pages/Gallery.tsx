import React from 'react';
import { motion } from 'framer-motion';

import Container from '../components/Container';
import Section from '../components/Section';
import OptimizedImage from '../components/OptimizedImage';
import OptimizedBackgroundImage from '../components/OptimizedBackgroundImage';

const Gallery: React.FC = () => {
  // Liste de toutes les images disponibles
  const images = [
    {
      src: "/src/assets/IMG/IMG_2593.jpeg",
      alt: "Image de studio Pilates 1",
      description: "Notre studio principal avec équipement Pilates"
    },
    {
      src: "/src/assets/IMG/IMG_2602.jpeg",
      alt: "Image de studio Pilates 2",
      description: "Espace d'entraînement avec reformer Pilates"
    },
    {
      src: "/src/assets/IMG/IMG_2364.jpeg",
      alt: "Image de studio Pilates 3",
      description: "Vue d'ensemble de notre espace d'entraînement"
    },
    {
      src: "/src/assets/IMG/IMG_1114.jpeg",
      alt: "Image de studio Pilates 4",
      description: "Séance de Pilates avec instructeur"
    },
    {
      src: "/src/assets/IMG/IMG_1601.jpeg",
      alt: "Image de studio Pilates 5",
      description: "Exercices sur équipement spécialisé"
    },
    {
      src: "/src/assets/IMG/IMG_2616.jpeg",
      alt: "Image de studio Pilates 6",
      description: "Entraînement personnalisé"
    },
    {
      src: "/src/assets/IMG/IMG_2628.jpeg",
      alt: "Image de studio Pilates 7",
      description: "Nos équipements modernes"
    },
    {
      src: "/src/assets/machine/IMG_6780.jpeg",
      alt: "Reformer Pilates",
      description: "Notre reformer Pilates de dernière génération"
    },
    {
      src: "/src/assets/machine/IMG_1119.jpeg",
      alt: "Barrel Pilates",
      description: "Barrel pour exercices spécifiques"
    },
    {
      src: "/src/assets/machine/IMG_8645.jpeg",
      alt: "Chair Pilates",
      description: "Chair Pilates pour renforcement musculaire"
    },
  ];

  return (
    <>
      <OptimizedBackgroundImage
        src="/src/assets/IMG/IMG_2364.jpeg"
        alt="Fond de la galerie"
        className="pt-32 pb-16"
        overlayColor="rgb(0, 62, 76)"
        overlayOpacity={0.7}
      >
        <Container>
          <div className="max-w-3xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-serif font-bold mb-4 text-white"
            >
              ギャラリー
            </motion.h1>
            <div className="w-24 h-1 bg-gradient-to-r from-turquoise-300 to-pink-200 rounded-full mb-6"></div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-white/90"
            >
              スタジオと設備の写真をご覧ください。
            </motion.p>
          </div>
        </Container>
      </OptimizedBackgroundImage>

      <Section className="bg-turquoise-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-turquoise-700 mb-4">
              スタジオフォト
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-turquoise-300 to-pink-200 rounded-full mx-auto mb-6"></div>
            <p className="text-gray-800 text-lg max-w-2xl mx-auto bg-white/80 p-3 rounded-lg shadow-sm">
              当スタジオの設備と雰囲気をご覧ください
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-turquoise-50 via-pink-50 to-white/90 border border-turquoise-100 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <OptimizedImage 
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    loading="lazy"
                    quality={85}
                    format="webp"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-turquoise-700 mb-2">{image.alt}</h3>
                  <p className="text-gray-800 bg-white/80 p-2 rounded-lg shadow-sm text-sm">{image.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
};

export default Gallery; 