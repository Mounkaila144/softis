import React from 'react';
import { motion } from 'framer-motion';
import Container from './Container';
import OptimizedImage from './OptimizedImage';

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  backgroundImage: string;
};

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, backgroundImage }) => {
  return (
    <div className="relative h-[40vh] min-h-[300px] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <OptimizedImage
          src={backgroundImage}
          alt={`${title} background`}
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center' }}
          loading="eager"
          quality={85}
        />
        <div className="absolute inset-0 bg-turquoise-900 bg-opacity-40" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight mb-4"
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-xl md:text-2xl text-white opacity-90"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </Container>

      {/* Decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/10 to-transparent" />
    </div>
  );
};

export default PageHeader; 