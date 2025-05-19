
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { DetectionResult } from '@/types';

interface ResultsDisplayProps {
  result: DetectionResult | null;
  isLoading: boolean;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, isLoading }) => {
  if (isLoading) {
    return (
      <Card className="w-full max-w-md mx-auto mt-6">
        <CardHeader>
          <CardTitle className="text-center">Analyzing Image</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <div className="w-full">
            <Progress value={undefined} className="w-full h-2" />
          </div>
          <p className="text-sm text-muted-foreground">
            Our AI model is analyzing the image. Please wait...
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!result) {
    return null;
  }

  const confidencePercent = (result.confidence * 100).toFixed(2);
  const isMalignant = result.prediction === 'Malignant';
  const resultColor = isMalignant ? 'text-red-600' : 'text-green-600';
  const progressColor = isMalignant ? 'bg-red-600' : 'bg-green-600';

  return (
    <Card className="w-full max-w-md mx-auto mt-6">
      <CardHeader>
        <CardTitle className="text-center">Detection Result</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <div className="text-3xl font-bold text-center">
          <span className={resultColor}>{result.prediction}</span>
        </div>
        
        <div className="w-full">
          <div className="flex justify-between text-sm mb-1">
            <span>Confidence Level</span>
            <span className="font-medium">{confidencePercent}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full ${progressColor}`}
              style={{ width: `${confidencePercent}%` }}
            />
          </div>
        </div>

        <div className="text-sm text-muted-foreground mt-4">
          <p>
            Analyzed on{' '}
            {result.timestamp.toLocaleString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsDisplay;
