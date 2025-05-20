
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertCircle, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { storeApiKey } from '@/services/modelService';

const ApiKeyManager: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [hasStoredKey, setHasStoredKey] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  // Check if API key exists in localStorage on component mount
  useEffect(() => {
    const storedKey = localStorage.getItem('openai_api_key');
    setHasStoredKey(!!storedKey);
  }, []);

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid API key",
        variant: "destructive",
      });
      return;
    }

    storeApiKey(apiKey);
    setHasStoredKey(true);
    setIsDialogOpen(false);
    
    toast({
      title: "Success",
      description: "API key has been saved",
    });
  };

  const handleRemoveApiKey = () => {
    localStorage.removeItem('openai_api_key');
    setHasStoredKey(false);
    setApiKey('');
    
    toast({
      title: "API Key Removed",
      description: "Your API key has been removed from this device",
    });
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          API Configuration
        </CardTitle>
        <CardDescription>
          Manage your OpenAI API key for skin condition analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-amber-800 mb-1">API Key Security Notice</h4>
              <p className="text-sm text-amber-700">
                Your API key is stored locally on your device and is not sent to our servers. 
                It's only used to communicate directly with OpenAI's API for skin condition analysis.
              </p>
            </div>
          </div>
        </div>

        {hasStoredKey ? (
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">API Key Status</p>
              <p className="text-sm text-green-600">API key is configured</p>
            </div>
            <div className="space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsDialogOpen(true)}
              >
                Update Key
              </Button>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={handleRemoveApiKey}
              >
                Remove Key
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-4 border border-dashed rounded-md">
            <p className="text-sm text-gray-500 mb-4 text-center">
              An OpenAI API key is required for skin condition analysis.
            </p>
            <Button onClick={() => setIsDialogOpen(true)}>
              Enter API Key
            </Button>
          </div>
        )}
      </CardContent>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter OpenAI API Key</DialogTitle>
            <DialogDescription>
              Enter your OpenAI API key to use the skin condition analysis features.
              This key is stored locally on your device and is not sent to our servers.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <Input
              id="apiKey"
              placeholder="sk-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              autoComplete="off"
            />
            <p className="text-xs text-gray-500">
              To get an API key, visit <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">OpenAI API Keys</a>
            </p>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveApiKey}>
              Save API Key
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ApiKeyManager;
