
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { createServiceRequest } from '@/services/requestService';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';

const RequestService: React.FC = () => {
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, userData } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !userData) {
      toast({
        title: "Error",
        description: "You must be logged in to request a service.",
        variant: "destructive"
      });
      return;
    }
    
    if (!description.trim()) {
      toast({
        title: "Error",
        description: "Please provide a description of your condition.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await createServiceRequest({
        userId: user.uid,
        userEmail: userData.email,
        description: description.trim(),
        status: 'pending',
        createdAt: Date.now()
      });
      
      toast({
        title: "Request Submitted",
        description: "Your service request has been submitted and will be reviewed by a medical professional.",
      });
      
      setDescription('');
    } catch (error) {
      console.error("Error submitting request:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl">Request Medical Consultation</CardTitle>
            <CardDescription>
              Describe your condition and a medical professional will be assigned to your case.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <div className="grid w-full gap-4">
                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Description
                  </label>
                  <Textarea
                    id="description"
                    placeholder="Please describe your symptoms or condition in detail..."
                    className="min-h-32"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => navigate('/home')}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default RequestService;
