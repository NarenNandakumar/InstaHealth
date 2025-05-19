
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Key, Save, Trash2 } from 'lucide-react';

export const getApiKey = (): string | null => {
  return localStorage.getItem('openai_api_key');
};

export const setApiKey = (key: string): void => {
  localStorage.setItem('openai_api_key', key);
};

export const clearApiKey = (): void => {
  localStorage.removeItem('openai_api_key');
};

const ApiKeyInput: React.FC = () => {
  const [apiKey, setApiKeyState] = useState<string>('');
  const [hasKey, setHasKey] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    const storedKey = getApiKey();
    setHasKey(!!storedKey);
    if (storedKey) {
      // Show masked key (last 4 characters only)
      setApiKeyState('sk-.....' + storedKey.slice(-4));
    }
  }, []);

  const handleSaveKey = () => {
    if (!apiKey.trim() || !apiKey.startsWith('sk-')) {
      toast({
        title: 'Invalid API Key',
        description: 'Please enter a valid OpenAI API key starting with "sk-".',
        variant: 'destructive',
      });
      return;
    }

    setApiKey(apiKey);
    setHasKey(true);
    setApiKeyState('sk-.....' + apiKey.slice(-4));
    
    toast({
      title: 'API Key Saved',
      description: 'Your OpenAI API key has been saved to your browser storage.',
    });
  };

  const handleClearKey = () => {
    clearApiKey();
    setHasKey(false);
    setApiKeyState('');
    
    toast({
      title: 'API Key Removed',
      description: 'Your OpenAI API key has been removed from browser storage.',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKeyState(e.target.value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5" />
          OpenAI API Key
        </CardTitle>
        <CardDescription>
          Enter your OpenAI API key to use the skin analysis tools. 
          Your key is stored only in your browser and never sent to our servers.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <Input
            type="password"
            placeholder="Enter your OpenAI API key (sk-...)"
            value={apiKey}
            onChange={handleChange}
            className="font-mono"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="default" 
          onClick={handleSaveKey}
          className="flex items-center gap-2"
        >
          <Save className="h-4 w-4" />
          Save Key
        </Button>
        {hasKey && (
          <Button 
            variant="destructive" 
            onClick={handleClearKey}
            className="flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Remove Key
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ApiKeyInput;
