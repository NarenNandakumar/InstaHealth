
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const CaringApproach: React.FC = () => {
  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Our Caring Approach</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="overflow-hidden">
          <img 
            src="/lovable-uploads/c8bc9be1-78cd-48f4-83f3-1b1e0bca80b8.png" 
            alt="Doctor with elderly patient" 
            className="w-full h-48 object-cover"
          />
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-2">Personalized Care</h3>
            <p className="text-gray-600">Every patient receives individualized attention tailored to their unique health needs.</p>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
            alt="Medical team discussion" 
            className="w-full h-48 object-cover"
          />
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-2">Expert Collaboration</h3>
            <p className="text-gray-600">Our healthcare professionals work together to provide comprehensive treatment plans.</p>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
            alt="Supportive healthcare" 
            className="w-full h-48 object-cover"
          />
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-2">Compassionate Support</h3>
            <p className="text-gray-600">We're here for you every step of the way with empathetic and supportive care.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CaringApproach;
