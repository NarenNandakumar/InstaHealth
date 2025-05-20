
import React, { useState } from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ApiKeyMissing: React.FC = () => {
  const [apiKey, setApiKey] = useState<string>(localStorage.getItem('openai_api_key') || '');
  const [inputKey, setInputKey] = useState<string>('');
  const envApiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  const handleSaveKey = () => {
    if (inputKey) {
      localStorage.setItem('openai_api_key', inputKey);
      setApiKey(inputKey);
      // Reload the page to apply the new API key
      window.location.reload();
    }
  };

  const handleRemoveKey = () => {
    localStorage.removeItem('openai_api_key');
    setApiKey('');
    setInputKey('');
    // Reload the page to apply changes
    window.location.reload();
  };
  
  return (
    <Alert variant={apiKey ? "default" : "destructive"} className="mb-6">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{apiKey ? "API Key Status" : "API Key Missing or Not Loaded"}</AlertTitle>
      <AlertDescription>
        {apiKey ? (
          <div className="space-y-2">
            <p>Using API key from browser storage.</p>
            <Button variant="outline" onClick={handleRemoveKey} size="sm">Remove API Key</Button>
          </div>
        ) : (
          <>
            <p>
              The OpenAI API key is not detected. This application requires a valid API key to function.
            </p>
            <div className="mt-4 space-y-4">
              <div className="space-y-2">
                <p><strong>Enter your OpenAI API Key:</strong></p>
                <div className="flex gap-2">
                  <Input 
                    type="password" 
                    value={inputKey} 
                    onChange={(e) => setInputKey(e.target.value)} 
                    placeholder="sk-..." 
                    className="max-w-md"
                  />
                  <Button onClick={handleSaveKey} disabled={!inputKey}>Save Key</Button>
                </div>
                <p className="text-xs text-gray-500">
                  Your API key will be stored in your browser's local storage and will not be sent to any server.
                </p>
              </div>
              
              {envApiKey && (
                <p className="text-xs">
                  Note: An environment variable API key is detected but we'll prioritize the locally stored key when available.
                </p>
              )}
            </div>
          </>
        )}
      </AlertDescription>
    </Alert>
  );
};

export default ApiKeyMissing;
