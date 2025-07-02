import React from 'react';
import { motion } from 'framer-motion';
import Button from './Button';

type ProgramCardProps = {
  title: string;
  description: string;
  price: string;
  features: string[];
  imageUrl: string;
  ctaText: string;
  popular?: boolean;
};

const ProgramCard: React.FC<ProgramCardProps> = ({
  title,
  description,
  price,
  features,
  imageUrl,
  ctaText,
  popular = false,
}) => {
  return (
    <motion.div 
      className={`rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col ${
        popular ? 'border-2 border-gold-500' : 'border border-neutral-200'
      }`}
      whileHover={{ y: -5 }}
    >
      <div className="relative h-48">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        {popular && (
          <div className="absolute top-4 right-4 bg-turquoise-500 text-primary-900 text-xs font-bold px-3 py-1 rounded-full">
            人気
          </div>
        )}
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-primary-700 mb-2">{title}</h3>
        <p className="text-white mb-4">{description}</p>
        
        <p className="text-2xl font-bold text-primary-500 mb-4">{price}</p>
        
        <ul className="mb-6 flex-grow">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start mb-2">
              <span className="text-turquoise-500 mr-2">✓</span>
              <span className="text-neutral-700">{feature}</span>
            </li>
          ))}
        </ul>
        
        <Button 
          variant={popular ? "gold" : "primary"} 
          className="w-full"
        >
          {ctaText}
        </Button>
      </div>
    </motion.div>
  );
};

export default ProgramCard;