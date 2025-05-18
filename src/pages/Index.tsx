
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ImageFile, DetectionResult } from '@/types';
import ImageUpload from '@/components/ImageUpload';
import ResultsDisplay from '@/components/ResultsDisplay';
import DisclaimerBanner from '@/components/DisclaimerBanner';
import ModelUploader from '@/components/ModelUploader';
import { Button } from '@/components/ui/button';
import { detectSkinCancer } from '@/services/modelService';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, LogIn, LogOut, User } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { logout } from '@/services/auth';

const Index: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<ImageFile | null>(null);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isConfigured, setIsConfigured] = useState<boolean>(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const { toast } = useToast();
  const { user, userData } = useAuth();
  const navigate = useNavigate();

  // Automatically configure the app on load
  useEffect(() => {
    // This will be handled by the ModelUploader component via its useEffect
  }, []);

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

  const handleConfigurationApplied = (configured: boolean) => {
    setIsConfigured(configured);
  };

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Skin Lesion Analysis Tool
          </h1>
          
          <div>
            {user ? (
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600">
                  <span>Logged in as: </span>
                  <span className="font-semibold">{userData?.userType || 'User'}</span>
                </div>
                <Button variant="outline" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button variant="outline" asChild>
                <Link to="/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Link>
              </Button>
            )}
          </div>
        </div>

        <p className="mt-3 text-lg text-gray-500 mb-8">
          Upload a clear image of your skin lesion for ABCD rule-based analysis
        </p>

        <DisclaimerBanner />

        {/* Configuration component */}
        <ModelUploader onModelLoaded={handleConfigurationApplied} />

        {!isConfigured && (
          <Alert className="mb-6 bg-yellow-50 border-yellow-200">
            <AlertCircle className="h-4 w-4 mr-2 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              Please configure the detection settings above before analyzing images.
            </AlertDescription>
          </Alert>
        )}

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
              disabled={!selectedImage || isLoading || !isConfigured}
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
              This application uses the ABCD rule (Asymmetry, Border irregularity, Color variation, Diameter)
              to analyze skin lesions for potential signs of skin cancer.
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
