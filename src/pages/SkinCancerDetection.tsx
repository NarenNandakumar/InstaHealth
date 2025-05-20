
import React, { useState, useEffect } from 'react';
import ImageUpload from '@/components/ImageUpload';
import ResultsDisplay from '@/components/ResultsDisplay';
import ModelUploader from '@/components/ModelUploader';
import { useToast } from '@/hooks/use-toast';
import { loadModel, detectSkinCancer, detectEczema } from '@/services/modelService';
import { DetectionResult } from '@/types';
import ApiKeyManager from '@/components/ApiKeyManager';

const SkinCancerDetection: React.FC = () => {
  const [imageElement, setImageElement] = useState<HTMLImageElement | null>(null);
  const [isModelLoaded, setIsModelLoaded] = useState<boolean>(false);
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const [skinCancerResult, setSkinCancerResult] = useState<DetectionResult | null>(null);
  const [eczemaResult, setEczemaResult] = useState<DetectionResult | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Initialize the model when component mounts
    const initModel = async () => {
      try {
        await loadModel();
        // Model loading is now handled differently, through the API key system
      } catch (error) {
        console.error("Error initializing model:", error);
        toast({
          title: "Model Initialization Failed",
          description: "There was an error loading the AI model. Please try again later.",
          variant: "destructive",
        });
      }
    };

    initModel();
  }, [toast]);

  const handleImageUpload = (img: HTMLImageElement | null) => {
    setImageElement(img);
    // Reset previous results when new image is uploaded
    setSkinCancerResult(null);
    setEczemaResult(null);
  };

  const handleAnalyze = async () => {
    if (!imageElement) {
      toast({
        title: "No Image Selected",
        description: "Please upload an image of the skin condition first.",
        variant: "destructive",
      });
      return;
    }

    // Check if API key is available
    const apiKey = localStorage.getItem('openai_api_key');
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenAI API key to perform analysis.",
        variant: "destructive",
      });
      return;
    }

    setIsBusy(true);
    
    try {
      // First, detect skin cancer
      toast({
        title: "Analyzing Image",
        description: "Checking for potential skin cancer indicators...",
      });
      
      const cancerResult = await detectSkinCancer(imageElement);
      setSkinCancerResult(cancerResult);
      
      // Then, detect eczema
      toast({
        title: "Continuing Analysis",
        description: "Checking for signs of eczema...",
      });
      
      const eczemaResult = await detectEczema(imageElement);
      setEczemaResult(eczemaResult);
      
      toast({
        title: "Analysis Complete",
        description: "AI has completed analyzing your image.",
      });
    } catch (error) {
      console.error("Analysis error:", error);
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing the image. Please check your API key and try again.",
        variant: "destructive",
      });
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Skin Condition Analysis
      </h1>
      
      {/* API Key Manager Section */}
      <ApiKeyManager />

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <ModelUploader onModelLoaded={setIsModelLoaded} />
          <ImageUpload onImageUpload={handleImageUpload} isBusy={isBusy} disabled={!isModelLoaded} />
        </div>

        <ResultsDisplay 
          onAnalyze={handleAnalyze} 
          imageElement={imageElement} 
          isBusy={isBusy} 
          isModelLoaded={isModelLoaded}
          skinCancerResult={skinCancerResult}
          eczemaResult={eczemaResult}
        />
      </div>
    </div>
  );
};

export default SkinCancerDetection;
