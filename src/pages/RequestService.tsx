
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { createServiceRequest } from '@/services/requestService';

const formSchema = z.object({
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
});

const RequestService: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user) {
      toast({
        title: "Not logged in",
        description: "You must be logged in to request a service.",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await createServiceRequest({
        userId: user.id,
        userEmail: user.email,
        description: values.description,
        status: 'pending',
        createdAt: Date.now(),
      });
      
      toast({
        title: "Service Requested",
        description: "A doctor will be notified and will contact you soon.",
      });
      
      form.reset();
    } catch (error) {
      console.error("Error submitting request:", error);
      toast({
        title: "Error",
        description: "Failed to submit your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            InstaHealth
          </h1>
          <div className="text-sm text-gray-600">
            {user && (
              <span>Logged in as: <span className="font-semibold">{user.email}</span></span>
            )}
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Request Medical Service</h2>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Describe your condition</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Please provide details about your symptoms, concerns, or the reason you're seeking medical advice..." 
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Your description will be shared with a volunteer doctor who will contact you.
                    </FormDescription>
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button type="submit" disabled={isSubmitting} className="px-6 py-2">
                  {isSubmitting ? "Submitting..." : "Request Medical Advice"}
                </Button>
              </div>
            </form>
          </Form>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">How it works</h3>
          <div className="text-gray-600 space-y-4">
            <p>
              1. Describe your health concerns or symptoms in detail
            </p>
            <p>
              2. Your request will be sent to an available volunteer doctor
            </p>
            <p>
              3. The doctor will review your case and contact you with guidance
            </p>
            <p className="text-sm italic mt-4">
              <strong>Important:</strong> This service is not intended for emergencies. 
              If you are experiencing a medical emergency, please call your local emergency number immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestService;
