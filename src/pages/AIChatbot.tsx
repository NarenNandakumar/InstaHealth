
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Bot, MessageSquare, User, ShieldAlert, AlertTriangle } from 'lucide-react';
import DisclaimerBanner from '@/components/DisclaimerBanner';
import { AIMessage, UserMessage } from '@/components/ChatMessages';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isLoading?: boolean;
}

const AIChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your medical assistant powered by ChatGPT. I can provide general health information, but I'm not a replacement for professional medical advice. How can I help you today?",
      sender: 'ai',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [useStoredKey, setUseStoredKey] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Check for stored API key on component mount
  useEffect(() => {
    const storedKey = localStorage.getItem('openai_api_key');
    if (storedKey) {
      setApiKey(storedKey);
      setUseStoredKey(true);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const saveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('openai_api_key', apiKey);
      setUseStoredKey(true);
      toast({
        title: "API Key Saved",
        description: "Your OpenAI API key has been saved locally",
      });
    }
  };

  const clearApiKey = () => {
    localStorage.removeItem('openai_api_key');
    setApiKey('');
    setUseStoredKey(false);
    toast({
      title: "API Key Removed",
      description: "Your OpenAI API key has been removed",
    });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    // Add placeholder for AI response
    const placeholderId = (Date.now() + 1).toString();
    const loadingMessage: Message = {
      id: placeholderId,
      content: "Thinking...",
      sender: 'ai',
      timestamp: new Date(),
      isLoading: true,
    };
    
    setMessages(prev => [...prev, userMessage, loadingMessage]);
    setInput('');
    setIsProcessing(true);
    
    // Use ChatGPT API
    try {
      const key = useStoredKey ? localStorage.getItem('openai_api_key') : apiKey;
      
      if (!key) {
        throw new Error("API key not provided");
      }

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${key}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "You are a helpful medical AI assistant. Provide general health information but always remind users to consult healthcare professionals for medical advice, diagnosis, or treatment. Be informative but cautious when discussing medical topics."
            },
            { role: "user", content: input }
          ],
          temperature: 0.7,
          max_tokens: 500
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Error calling OpenAI API");
      }
      
      const responseData = await response.json();
      const aiResponse = responseData.choices[0].message.content;
      
      // Replace loading message with actual response
      setMessages(prev => 
        prev.map(msg => 
          msg.id === placeholderId 
            ? { ...msg, content: aiResponse, isLoading: false } 
            : msg
        )
      );
      
      toast({
        title: "Response received",
        description: "ChatGPT has responded to your question",
      });
      
    } catch (error: any) {
      // Replace loading message with error
      setMessages(prev => 
        prev.map(msg => 
          msg.id === placeholderId 
            ? { 
                ...msg, 
                content: `Error: ${error.message || "Failed to get response from ChatGPT"}. Please try again.`, 
                isLoading: false 
              } 
            : msg
        )
      );
      
      toast({
        title: "Error",
        description: error.message || "Failed to get response from ChatGPT",
        variant: "destructive"
      });
    }
    
    setIsProcessing(false);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Bot className="h-8 w-8" />
        ChatGPT Medical Assistant
      </h1>

      <div className="grid md:grid-cols-12 gap-6">
        <div className="md:col-span-8">
          <DisclaimerBanner />
          
          {!useStoredKey && (
            <Alert className="mb-4 bg-amber-50 border-amber-200">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <AlertTitle className="text-amber-800">API Key Required</AlertTitle>
              <AlertDescription className="text-amber-700">
                <div className="flex flex-col gap-2 mt-2">
                  <p>Enter your OpenAI API key to enable ChatGPT responses.</p>
                  <div className="flex gap-2">
                    <Input 
                      type="password"
                      placeholder="Enter OpenAI API Key" 
                      value={apiKey} 
                      onChange={(e) => setApiKey(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={saveApiKey} disabled={!apiKey.trim()}>
                      Save Key
                    </Button>
                  </div>
                  <p className="text-xs italic">Warning: Storing API keys in the browser is not secure for production use.</p>
                </div>
              </AlertDescription>
            </Alert>
          )}
          
          {useStoredKey && (
            <Alert className="mb-4 bg-green-50 border-green-200">
              <AlertTitle className="text-green-800">API Key Set</AlertTitle>
              <AlertDescription className="text-green-700 flex justify-between items-center">
                <span>Your OpenAI API key is set and ready to use</span>
                <Button variant="outline" size="sm" onClick={clearApiKey}>
                  Clear Key
                </Button>
              </AlertDescription>
            </Alert>
          )}
          
          <Card className="h-[calc(100vh-400px)] flex flex-col">
            <CardHeader className="border-b">
              <CardTitle>Chat with Medical AI</CardTitle>
              <CardDescription>
                Ask health-related questions and get responses from ChatGPT
              </CardDescription>
            </CardHeader>
            
            <CardContent className="flex-grow overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                message.sender === 'user' ? (
                  <UserMessage key={message.id} content={message.content} />
                ) : (
                  <AIMessage 
                    key={message.id} 
                    content={message.isLoading ? "..." : message.content} 
                    className={message.isLoading ? "opacity-70" : ""}
                  />
                )
              ))}
              <div ref={messagesEndRef} />
            </CardContent>
            
            <CardFooter className="border-t pt-4">
              <form onSubmit={handleSendMessage} className="w-full space-y-2">
                <div className="flex items-center gap-3 w-full">
                  <Input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your medical question here..."
                    disabled={isProcessing || (!apiKey && !useStoredKey)}
                    className="flex-1"
                  />
                  <Button 
                    type="submit" 
                    disabled={isProcessing || (!apiKey && !useStoredKey)} 
                    className="shrink-0"
                  >
                    {isProcessing ? "Processing..." : "Send"}
                  </Button>
                </div>
                <p className="text-xs text-gray-500 italic">
                  The AI provides general information only. Always consult with healthcare professionals for medical advice.
                </p>
              </form>
            </CardFooter>
          </Card>
        </div>
        
        <div className="md:col-span-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldAlert className="h-5 w-5" />
                Important Notice
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-md">
                <h3 className="font-medium text-amber-800">Medical Disclaimer</h3>
                <p className="text-sm text-amber-700 mt-1">
                  This AI assistant is for informational purposes only. It does not provide medical advice, diagnosis, or treatment. 
                  Always seek the advice of physicians or qualified healthcare providers with any questions regarding medical conditions.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Quick Tips</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Be specific about your symptoms</li>
                  <li>Mention relevant medical history</li>
                  <li>Ask about general health guidelines</li>
                  <li>Inquire about prevention methods</li>
                </ul>
              </div>
              
              <div className="pt-4">
                <Label htmlFor="example-questions">Example Questions</Label>
                <Textarea 
                  id="example-questions"
                  readOnly
                  className="mt-2 text-sm"
                  value="What are common cold symptoms?
What can help with seasonal allergies?
How much water should I drink daily?
What are signs of dehydration?"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIChatbot;
