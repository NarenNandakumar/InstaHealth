import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-blue-600">InstaHealth</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Modern healthcare solutions at your fingertips, providing instant access to medical analysis and professional consultations.
          </p>
        </div>

        {/* Hero Image Section with compassionate care image */}
        <div className="mb-16 overflow-hidden rounded-2xl shadow-xl">
          <div className="relative">
            <img 
              src="/lovable-uploads/733a51df-f918-4ab5-a977-8e5987bdbee8.png" 
              alt="Compassionate care with healthcare provider and patient" 
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

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8 transform transition-all hover:scale-105">
            <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">AI-Powered Disease Analysis</h2>
            <p className="text-gray-600 mb-6">
              Our advanced AI technology analyzes medical images to detect potential health concerns with remarkable accuracy, providing quick preliminary assessments when you need them most.
            </p>
            <Link to="/home">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Try Image Analysis
              </Button>
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 transform transition-all hover:scale-105">
            <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Medical Consultation</h2>
            <p className="text-gray-600 mb-6">
              Connect with healthcare professionals for personalized medical advice. Submit your symptoms and get matched with a qualified doctor for virtual consultation.
            </p>
            <Link to="/request-service">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Request Consultation
              </Button>
            </Link>
          </div>
        </div>

        {/* Caring Professionals Cards */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Our Caring Approach</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="overflow-hidden">
              <img 
                src="/lovable-uploads/bd00739d-1eab-4a2d-96c8-1a7dbe295539.png" 
                alt="Personalized Care" 
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
                src="/lovable-uploads/bd00739d-1eab-4a2d-96c8-1a7dbe295539.png" 
                alt="Compassionate Support" 
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Compassionate Support</h3>
                <p className="text-gray-600">We're here for you every step of the way with empathetic and supportive care.</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Create an Account</h3>
              <p className="text-gray-600">Sign up and create your profile to access our healthcare services.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Choose a Service</h3>
              <p className="text-gray-600">Select between AI image analysis or request a consultation with a medical professional.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Get Results</h3>
              <p className="text-gray-600">Receive instant AI analysis or expert medical advice from our healthcare professionals.</p>
            </div>
          </div>
        </div>

        {/* Healthcare Access Mission Section */}
        <div className="mb-16 bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-8 flex items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-blue-600">Healthcare Access For All</h3>
                <p className="text-gray-600 mb-6">
                  At InstaHealth, we believe that quality healthcare should be accessible to everyone, regardless of financial situation or geographic location. 
                  Our mission is to break down barriers to medical care by connecting patients with compassionate professionals and cutting-edge AI technology.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-600">Affordable virtual consultations</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-600">No barriers for rural and remote communities</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-600">Free AI-powered preliminary assessments</span>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1551601651-bc60f254d532?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                alt="Doctor with diverse group of patients" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl text-white p-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to take control of your health?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of users who have already benefited from our quick, convenient and reliable healthcare services.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/home">
              <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-800">
                Try Image Analysis
              </Button>
            </Link>
            <Link to="/request-service">
              <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-800">
                Request Consultation
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
