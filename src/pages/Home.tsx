
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import NavBar from '@/components/NavBar';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <NavBar />
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-blue-600">InstaHealth</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Modern healthcare solutions at your fingertips, providing instant access to medical analysis and professional consultations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8 transform transition-all hover:scale-105">
            <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Skin Cancer Detection</h2>
            <p className="text-gray-600 mb-6">
              Our advanced AI technology analyses images of skin lesions to help identify potential signs of skin cancer using the ABCD method, providing quick preliminary assessments.
            </p>
            <Link to="/home">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Try Skin Analysis
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
              <p className="text-gray-600">Select between skin analysis or request a consultation with a medical professional.</p>
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

        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl text-white p-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to take control of your health?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of users who have already benefited from our quick, convenient and reliable healthcare services.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/home">
              <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-800">
                Try Skin Analysis
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
