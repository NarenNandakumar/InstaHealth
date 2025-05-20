
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const ApiKeyMissing: React.FC = () => {
  return (
    <Alert variant="destructive" className="mb-6">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>API Key Missing</AlertTitle>
      <AlertDescription>
        <p>The OpenAI API key is not configured. This application requires a valid API key to function.</p>
        <p className="mt-2">
          To use this application, the repository owner needs to set the <code>VITE_OPENAI_API_KEY</code> 
          environment variable in the GitHub repository secrets.
        </p>
      </AlertDescription>
    </Alert>
  );
};

export default ApiKeyMissing;
