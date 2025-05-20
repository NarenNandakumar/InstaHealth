
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="text-center mb-16">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
        Welcome to <span className="text-blue-600">InstaHealth</span>
      </h1>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Modern healthcare solutions at your fingertips, providing instant access to medical analysis and professional consultations.
      </p>
    </div>
  );
};

export default Hero;
