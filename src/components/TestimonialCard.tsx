import React from 'react';
import { motion } from 'framer-motion';

type TestimonialCardProps = {
  quote: string;
  name: string;
  title?: string;
  imageBefore?: string;
  imageAfter?: string;
};

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  name,
  title,
  imageBefore,
  imageAfter
}) => {
  return (
    <motion.div 
      className="bg-turquoise-200 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
      whileHover={{ y: -5 }}
    >
      {imageBefore && imageAfter && (
        <div className="flex mb-6 gap-4">
          <div className="relative w-1/2 aspect-[3/4] overflow-hidden rounded-md">
            <img 
              src={imageBefore} 
              alt={`${name} before`} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2 bg-neutral-900 bg-opacity-70 text-white text-xs px-2 py-1 rounded">
              Before
            </div>
          </div>
          <div className="relative w-1/2 aspect-[3/4] overflow-hidden rounded-md">
            <img 
              src={imageAfter} 
              alt={`${name} after`} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2 bg-turquoise-500 bg-opacity-70 text-white text-xs px-2 py-1 rounded">
              After
            </div>
          </div>
        </div>
      )}
      
      <p className="text-neutral-700 italic mb-4">{quote}</p>
      
      <div className="flex items-center">
        <div>
          <p className="font-medium text-primary-500">{name}</p>
          {title && <p className="text-sm text-neutral-500">{title}</p>}
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;