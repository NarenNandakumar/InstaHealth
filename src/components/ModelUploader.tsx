
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { loadModelFromFile } from '@/services/modelService';

interface ModelUploaderProps {
  onModelLoaded: (loaded: boolean) => void;
}

const ModelUploader: React.FC<ModelUploaderProps> = ({ onModelLoaded }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [modelFile, setModelFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check if it's a valid model file
      if (file.name.endsWith('.tflite') || file.name.endsWith('.h5') || file.name.endsWith('.keras')) {
        setModelFile(file);
      } else {
        toast({
          title: "Invalid File",
          description: "Please upload a .tflite, .h5, or .keras model file.",
          variant: "destructive"
        });
      }
    }
  };

  const handleUpload = async () => {
    if (!modelFile) return;
    
    setIsUploading(true);
    try {
      await loadModelFromFile(modelFile);
      toast({
        title: "Model Loaded Successfully",
        description: "The skin cancer detection model has been loaded.",
        variant: "default"
      });
      onModelLoaded(true);
    } catch (error) {
      console.error("Error loading model:", error);
      toast({
        title: "Error Loading Model",
        description: "Failed to load the model. Using demo mode instead.",
        variant: "destructive"
      });
      onModelLoaded(false);
    } finally {
      setIsUploading(false);
    }
  };

  const resetModel = () => {
    setModelFile(null);
  };

  return (
    <Card className="w-full max-w-md mx-auto mb-6">
      <CardHeader>
        <CardTitle className="text-center">Upload Detection Model</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {modelFile ? (
          <div className="flex items-center justify-between p-4 border rounded-md bg-gray-50">
            <div className="flex items-center">
              <div className="mr-2 bg-green-100 p-2 rounded-full">
                <Check className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="font-medium">{modelFile.name}</p>
                <p className="text-sm text-gray-500">{(modelFile.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button 
                onClick={handleUpload} 
                disabled={isUploading}
                size="sm"
              >
                {isUploading ? 'Loading...' : 'Load Model'}
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={resetModel}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="border-2 border-dashed rounded-lg p-6 text-center">
            <Upload className="mx-auto h-10 w-10 text-gray-400" />
            <p className="mt-2 text-sm font-medium text-gray-900">
              Upload your skin cancer detection model
            </p>
            <label className="mt-2 cursor-pointer">
              <Button variant="outline" className="relative">
                Browse Files
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                  accept=".tflite,.h5,.keras"
                />
              </Button>
            </label>
            <p className="mt-2 text-xs text-gray-500">
              Supported formats: .tflite, .h5, .keras
            </p>
          </div>
        )}
        <p className="text-sm text-gray-500 text-center">
          Your model will be processed and converted for browser use. 
          This may take a few moments depending on the model size.
        </p>
      </CardContent>
    </Card>
  );
};

export default ModelUploader;
