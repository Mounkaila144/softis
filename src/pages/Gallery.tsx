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
              Notre Galerie
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-white/90"
            >
              Découvrez notre studio et nos équipements à travers cette galerie d'images.
            </motion.p>
          </div>
        </Container>
      </OptimizedBackgroundImage>

      <Section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-turquoise-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
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
                <div className="p-4">
                  <h3 className="font-bold text-primary-700">{image.alt}</h3>
                  <p className="text-white text-sm">{image.description}</p>
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