
import React from 'react';

const HeroImage: React.FC = () => {
  return (
    <div className="mb-16 overflow-hidden rounded-2xl shadow-xl">
      <div className="relative">
        <img 
          src="/lovable-uploads/550fb236-9c46-4412-8b2e-11472fa1bef3.png" 
          alt="Caregiver with elderly patient" 
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/70 to-transparent flex items-center">
          <div className="p-8 text-white max-w-lg">
            <h2 className="text-3xl font-bold mb-4">Compassionate Care When You Need It Most</h2>
            <p className="text-lg">Our network of healthcare professionals is committed to providing personalized care with empathy and understanding.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroImage;
