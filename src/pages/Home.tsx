
import React, { useEffect } from 'react';
import Hero from '@/components/home/Hero';
import HeroImage from '@/components/home/HeroImage';
import ServiceCards from '@/components/home/ServiceCards';
import CaringApproach from '@/components/home/CaringApproach';
import HowItWorks from '@/components/home/HowItWorks';
import AITechnologyShowcase from '@/components/home/AITechnologyShowcase';
import CallToAction from '@/components/home/CallToAction';
import { setApiKey } from '@/utils/apiKeyManager';

const Home: React.FC = () => {
  // Store the API key in localStorage when component mounts
  useEffect(() => {
    const apiKey = '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';
    setApiKey(apiKey);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <Hero />
        <HeroImage />
        <ServiceCards />
        <CaringApproach />
        <HowItWorks />
        <AITechnologyShowcase />
        <CallToAction />
      </div>
    </div>
  );
};

export default Home;
