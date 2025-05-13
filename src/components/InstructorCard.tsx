import React from 'react';
import { motion } from 'framer-motion';

type InstructorCardProps = {
  name: string;
  title: string;
  bio: string;
  specialties: string[];
  imageUrl: string;
};

const InstructorCard: React.FC<InstructorCardProps> = ({
  name,
  title,
  bio,
  specialties,
  imageUrl,
}) => {
  return (
    <motion.div 
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
      whileHover={{ y: -5 }}
    >
      <div className="aspect-[3/4] overflow-hidden">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-primary-700">{name}</h3>
        <p className="text-turquoise-600 font-medium mb-3">{title}</p>
        
        <p className="text-neutral-700 mb-4">{bio}</p>
        
        <div>
          <p className="font-medium text-primary-600 mb-2">専門分野:</p>
          <div className="flex flex-wrap gap-2">
            {specialties.map((specialty, index) => (
              <span 
                key={index} 
                className="bg-primary-50 text-primary-700 text-sm px-3 py-1 rounded-full"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default InstructorCard;