
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';

const DisclaimerBanner: React.FC = () => {
  return (
    <Alert className="mb-6 bg-blue-50 border-blue-200">
      <Info className="h-4 w-4 mr-2 text-blue-600" />
      <AlertTitle className="text-blue-800">Medical Disclaimer</AlertTitle>
      <AlertDescription className="text-blue-800">
        This tool is for educational purposes only and should not replace professional medical advice. 
        If you have concerns about your skin, please consult with a qualified dermatologist or healthcare provider.
      </AlertDescription>
    </Alert>
  );
};

export default DisclaimerBanner;
