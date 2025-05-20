
import React from 'react';
import Hero from '@/components/home/Hero';
import HeroImage from '@/components/home/HeroImage';
import ServiceCards from '@/components/home/ServiceCards';
import CaringApproach from '@/components/home/CaringApproach';
import HowItWorks from '@/components/home/HowItWorks';
import AITechnologyShowcase from '@/components/home/AITechnologyShowcase';
import CallToAction from '@/components/home/CallToAction';

const Home: React.FC = () => {
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
