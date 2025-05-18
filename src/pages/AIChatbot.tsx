
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Bot, MessageSquare, User, ShieldAlert } from 'lucide-react';
import DisclaimerBanner from '@/components/DisclaimerBanner';
import { AIMessage, UserMessage } from '@/components/ChatMessages';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const medicalResponses = [
  "Based on your symptoms, this could be a common cold. Rest, fluids, and over-the-counter medications may help. However, please consult with a healthcare professional for proper diagnosis.",
  "That sounds like it might be allergies. Common treatments include antihistamines and avoiding known allergens. A doctor can provide specific recommendations for your situation.",
  "Your description aligns with possible symptoms of dehydration. Try increasing your fluid intake and consider electrolyte solutions. If symptoms persist, please seek medical attention.",
  "Those symptoms may indicate a migraine. Common management includes rest in a dark room, pain relievers, and staying hydrated. A healthcare provider can recommend appropriate treatments.",
  "This might be related to stress or anxiety. Consider relaxation techniques and ensure adequate sleep. A mental health professional can provide more personalized guidance.",
  "That could potentially be associated with high blood pressure. Regular monitoring and consultation with a healthcare provider is recommended.",
  "Your symptoms might suggest a vitamin deficiency. A balanced diet or supplements may help, but please consult with a healthcare provider before starting any supplements.",
  "This description sounds like it could be related to seasonal affective disorder. Light therapy and other treatments might be beneficial under medical supervision.",
];

const AIChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your medical assistant. I can provide general health information, but I'm not a replacement for professional medical advice. How can I help you today?",
      sender: 'ai',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: medicalResponses[Math.floor(Math.random() * medicalResponses.length)],
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsProcessing(false);
      
      toast({
        title: "New response",
        description: "The AI has responded to your question",
      });
    }, 1500);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Bot className="h-8 w-8" />
        Medical AI Assistant
      </h1>

      <div className="grid md:grid-cols-12 gap-6">
        <div className="md:col-span-8">
          <DisclaimerBanner />
          
          <Card className="h-[calc(100vh-300px)] flex flex-col">
            <CardHeader className="border-b">
              <CardTitle>Chat with Medical AI</CardTitle>
              <CardDescription>
                Ask health-related questions and get general guidance
              </CardDescription>
            </CardHeader>
            
            <CardContent className="flex-grow overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                message.sender === 'user' ? (
                  <UserMessage key={message.id} content={message.content} />
                ) : (
                  <AIMessage key={message.id} content={message.content} />
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
                    disabled={isProcessing}
                    className="flex-1"
                  />
                  <Button type="submit" disabled={isProcessing} className="shrink-0">
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
