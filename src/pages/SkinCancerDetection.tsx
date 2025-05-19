import React, { useState, useEffect, useRef } from 'react';
import { ImageFile, DetectionResult } from '@/types';
import ImageUpload from '@/components/ImageUpload';
import ResultsDisplay from '@/components/ResultsDisplay';
import DisclaimerBanner from '@/components/DisclaimerBanner';
import ApiKeyInput, { getApiKey } from '@/components/ApiKeyInput';
import { Button } from '@/components/ui/button';
import { detectSkinCancer, detectEczema } from '@/services/modelService';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, Scan, Heart, Brain, FlaskConical, BadgePlus, ActivitySquare, KeyRound } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SkinCancerDetection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<ImageFile | null>(null);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasApiKey, setHasApiKey] = useState<boolean>(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("skin-cancer");
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);

  // Check for API key and reset result when image changes or tab changes
  useEffect(() => {
    setResult(null);
    checkApiKey();
  }, [selectedImage, activeTab]);
  
  // Check if API key exists
  const checkApiKey = () => {
    const key = getApiKey();
    setHasApiKey(!!key);
  };

  const handleAnalyzeImage = async () => {
    if (!selectedImage || !imageRef.current) {
      toast({
        title: 'No Image Selected',
        description: 'Please upload an image to analyze.',
        variant: 'destructive',
      });
      return;
    }
    
    if (!hasApiKey) {
      setShowApiKeyInput(true);
      toast({
        title: 'API Key Required',
        description: 'Please add your OpenAI API key before analyzing images.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      let detectionResult;
      if (activeTab === 'skin-cancer') {
        detectionResult = await detectSkinCancer(imageRef.current);
      } else if (activeTab === 'eczema') {
        detectionResult = await detectEczema(imageRef.current);
      } else {
        throw new Error('Invalid tab selected');
      }
      
      if (detectionResult.error) {
        throw new Error(detectionResult.error);
      }
      
      setResult(detectionResult);
    } catch (error) {
      console.error('Error analyzing image:', error);
      toast({
        title: 'Analysis Error',
        description: error instanceof Error ? error.message : 'Failed to analyze the image. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const ComingSoonCard = ({ title, icon: Icon, description }: { title: string, icon: React.FC<any>, description: string }) => (
    <Card className="bg-gray-50 border border-gray-200">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Icon className="h-6 w-6 text-gray-400" />
          <CardTitle className="text-lg text-gray-500">{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center py-6">
          <Button disabled className="bg-gray-300">
            <BadgePlus className="mr-2 h-4 w-4" />
            Coming Soon
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const AnalysisContent = () => (
    <>
      {showApiKeyInput || !hasApiKey ? (
        <div className="mb-6">
          <ApiKeyInput />
          <div className="mt-4 text-center">
            <Button 
              onClick={() => {
                checkApiKey();
                setShowApiKeyInput(false);
              }} 
              variant="outline"
            >
              Continue
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold text-gray-800">
                Upload an Image
              </h2>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={() => setShowApiKeyInput(true)}
              >
                <KeyRound className="h-3 w-3" />
                Change API Key
              </Button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              For best results, upload a well-lit, close-up photo against a neutral background.
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
              disabled={!selectedImage || isLoading}
              className="px-6 py-2"
              size="lg"
            >
              {isLoading ? 'Analyzing...' : 'Analyze Image'}
            </Button>
          </div>

          <ResultsDisplay result={result} isLoading={isLoading} />
        </>
      )}
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Health Analysis Tools
        </h1>
        
        <Tabs defaultValue="skin-cancer" className="w-full mb-8" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 w-full mb-6">
            <TabsTrigger value="skin-cancer" className="flex items-center gap-2">
              <Scan className="h-4 w-4" />
              <span>Skin Cancer</span>
            </TabsTrigger>
            <TabsTrigger value="eczema" className="flex items-center gap-2">
              <ActivitySquare className="h-4 w-4" />
              <span>Eczema</span>
            </TabsTrigger>
            <TabsTrigger value="heart-health" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              <span>Heart Health</span>
            </TabsTrigger>
            <TabsTrigger value="brain-scan" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              <span>Brain Scan</span>
            </TabsTrigger>
            <TabsTrigger value="lab-results" className="flex items-center gap-2">
              <FlaskConical className="h-4 w-4" />
              <span>Lab Results</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="skin-cancer">
            <DisclaimerBanner />

            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
              <AnalysisContent />
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                About This Tool
              </h2>
              <div className="text-gray-600 space-y-4">
                <p>
                  This application uses OpenAI's GPT-4o to analyze skin lesions for potential signs of skin cancer,
                  evaluating factors such as asymmetry, border irregularity, color variation, and diameter.
                </p>
                <p>
                  <strong>Note:</strong> This tool requires your own OpenAI API key. Your key is stored only in your browser 
                  and never transmitted to our servers or saved in our codebase.
                </p>
                <p>
                  <strong>Important:</strong> This tool is not a substitute for professional medical 
                  diagnosis. If you have concerns about a skin lesion, please consult a dermatologist 
                  immediately.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="eczema">
            <DisclaimerBanner />

            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
              <AnalysisContent />
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                About This Tool
              </h2>
              <div className="text-gray-600 space-y-4">
                <p>
                  This application uses OpenAI's GPT-4o to analyze skin conditions for signs of eczema,
                  including redness, dryness, inflammation, and other characteristic patterns.
                </p>
                <p>
                  <strong>Note:</strong> This tool requires your own OpenAI API key. Your key is stored only in your browser 
                  and never transmitted to our servers or saved in our codebase.
                </p>
                <p>
                  <strong>Important:</strong> This tool is not a substitute for professional medical 
                  diagnosis. If you have concerns about your skin condition, please consult a dermatologist 
                  immediately.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="heart-health">
            <ComingSoonCard 
              title="Heart Health Analysis"
              icon={Heart}
              description="Upload ECG readings and heart-related data for AI analysis of potential cardiovascular issues."
            />
          </TabsContent>
          
          <TabsContent value="brain-scan">
            <ComingSoonCard 
              title="Brain Scan Analysis"
              icon={Brain}
              description="Upload brain scan images for AI-assisted analysis of neurological conditions."
            />
          </TabsContent>
          
          <TabsContent value="lab-results">
            <ComingSoonCard 
              title="Lab Results Interpreter"
              icon={FlaskConical}
              description="Upload your lab test results for AI interpretation and explanation in simple terms."
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SkinCancerDetection;
