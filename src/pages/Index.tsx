
import React, { useState, useEffect, useRef } from 'react';
import { ImageFile, DetectionResult } from '@/types';
import ImageUpload from '@/components/ImageUpload';
import ResultsDisplay from '@/components/ResultsDisplay';
import DisclaimerBanner from '@/components/DisclaimerBanner';
import { Button } from '@/components/ui/button';
import { loadModel, detectSkinCancer } from '@/services/modelService';
import { useToast } from '@/components/ui/use-toast';

const Index: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<ImageFile | null>(null);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModelLoaded, setIsModelLoaded] = useState<boolean>(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const { toast } = useToast();

  // Load the model when the component mounts
  useEffect(() => {
    const initModel = async () => {
      try {
        await loadModel();
        setIsModelLoaded(true);
        console.log('Model loaded successfully.');
      } catch (error) {
        console.error('Error loading model:', error);
        toast({
          title: 'Error Loading Model',
          description: 'Failed to load the detection model. Please refresh the page.',
          variant: 'destructive',
        });
      }
    };

    initModel();
  }, [toast]);

  // Reset result when image changes
  useEffect(() => {
    setResult(null);
  }, [selectedImage]);

  const handleAnalyzeImage = async () => {
    if (!selectedImage || !imageRef.current) {
      toast({
        title: 'No Image Selected',
        description: 'Please upload an image to analyze.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const detectionResult = await detectSkinCancer(imageRef.current);
      setResult(detectionResult);
    } catch (error) {
      console.error('Error analyzing image:', error);
      toast({
        title: 'Analysis Error',
        description: 'Failed to analyze the image. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Skin Cancer Detection Tool
          </h1>
          <p className="mt-3 text-lg text-gray-500">
            Upload a clear image of your skin lesion for AI-powered analysis
          </p>
        </div>

        <DisclaimerBanner />

        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Upload an Image
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              For best results, upload a well-lit, close-up photo of the skin lesion against a neutral background.
            </p>
            <ImageUpload 
              onImageSelect={setSelectedImage} 
              selectedImage={selectedImage} 
            />
            {selectedImage && (
              <div className="hidden">
                <img 
                  ref={imageRef}
                  src={selectedImage.preview}
                  alt="Selected for analysis"
                  crossOrigin="anonymous"
                />
              </div>
            )}
          </div>

          <div className="flex justify-center mb-6">
            <Button 
              onClick={handleAnalyzeImage} 
              disabled={!selectedImage || isLoading || !isModelLoaded}
              className="px-6 py-2"
              size="lg"
            >
              {isLoading ? 'Analyzing...' : 'Analyze Image'}
            </Button>
          </div>

          <ResultsDisplay result={result} isLoading={isLoading} />
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            About This Tool
          </h2>
          <div className="text-gray-600 space-y-4">
            <p>
              This application uses a TensorFlow Lite model trained on dermatological images 
              to detect potential signs of skin cancer. The AI model analyzes patterns, colors, 
              and textures in your uploaded skin lesion image.
            </p>
            <p>
              <strong>Important:</strong> This tool is not a substitute for professional medical 
              diagnosis. If you have concerns about a skin lesion, please consult a dermatologist 
              immediately.
            </p>
            <p>
              Early detection of skin cancer significantly improves treatment outcomes. 
              Regular skin self-examinations and professional check-ups are recommended.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
