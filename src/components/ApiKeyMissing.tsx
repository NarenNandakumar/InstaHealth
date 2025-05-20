
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const ApiKeyMissing: React.FC = () => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  return (
    <Alert variant="destructive" className="mb-6">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>API Key Missing or Not Loaded</AlertTitle>
      <AlertDescription>
        <p>
          The OpenAI API key is not detected in your environment variables. This application requires a valid API key to function.
        </p>
        <div className="mt-2 space-y-2 text-sm">
          <p><strong>Troubleshooting steps:</strong></p>
          <ol className="list-decimal ml-5">
            <li>For GitHub deployment:
              <ul className="list-disc ml-5">
                <li>Verify that you've added the <code>VITE_OPENAI_API_KEY</code> secret to your GitHub repository settings</li>
                <li>If you just added the secret, wait a few minutes and then redeploy the application</li>
              </ul>
            </li>
            <li>For local development in Lovable:
              <ul className="list-disc ml-5">
                <li>Add your API key directly to the <code>.env</code> file in the project root</li>
                <li>The file should contain: <code>VITE_OPENAI_API_KEY=your_api_key_here</code></li>
                <li>After making changes to the .env file, a rebuild of the application will happen automatically</li>
              </ul>
            </li>
            <li>For development outside Lovable:
              <ul className="list-disc ml-5">
                <li>Create a <code>.env.local</code> file in the project root with <code>VITE_OPENAI_API_KEY=your_api_key_here</code></li>
                <li>Restart your development server after adding the file</li>
              </ul>
            </li>
          </ol>
          <p className="mt-2">
            Current environment value: {apiKey ? 'Key exists but may be invalid' : 'No key detected'}
          </p>
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default ApiKeyMissing;
