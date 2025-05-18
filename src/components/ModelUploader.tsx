
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { setAnalysisThresholds } from '@/services/modelService';
import { Label } from '@/components/ui/label';

interface ModelUploaderProps {
  onModelLoaded: (loaded: boolean) => void;
}

const ModelUploader: React.FC<ModelUploaderProps> = ({ onModelLoaded }) => {
  const [asymmetry, setAsymmetry] = useState<number>(0.3);
  const [border, setBorder] = useState<number>(0.4);
  const [color, setColor] = useState<number>(0.35);
  const [diameter, setDiameter] = useState<number>(0.45);
  const { toast } = useToast();

  const applySettings = () => {
    setAnalysisThresholds(asymmetry, border, color, diameter);
    toast({
      title: "Detection Settings Applied",
      description: "The skin lesion analysis parameters have been updated.",
      variant: "default"
    });
    onModelLoaded(true);
  };

  return (
    <Card className="w-full max-w-md mx-auto mb-6">
      <CardHeader>
        <CardTitle className="text-center">Detection Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="asymmetry">Asymmetry Detection</Label>
            <span className="text-sm text-gray-500">{(asymmetry * 100).toFixed(0)}%</span>
          </div>
          <Slider
            id="asymmetry"
            min={0}
            max={1}
            step={0.05}
            value={[asymmetry]}
            onValueChange={(values) => setAsymmetry(values[0])}
          />
          <p className="text-xs text-gray-500">Sensitivity to left-right image differences</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="border">Border Irregularity</Label>
            <span className="text-sm text-gray-500">{(border * 100).toFixed(0)}%</span>
          </div>
          <Slider
            id="border"
            min={0}
            max={1}
            step={0.05}
            value={[border]}
            onValueChange={(values) => setBorder(values[0])}
          />
          <p className="text-xs text-gray-500">Detection of jagged or irregular borders</p>
        </div>
          
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="color">Color Variance</Label>
            <span className="text-sm text-gray-500">{(color * 100).toFixed(0)}%</span>
          </div>
          <Slider
            id="color"
            min={0}
            max={1}
            step={0.05}
            value={[color]}
            onValueChange={(values) => setColor(values[0])}
          />
          <p className="text-xs text-gray-500">Detection of multiple colors within the lesion</p>
        </div>
          
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="diameter">Size Detection</Label>
            <span className="text-sm text-gray-500">{(diameter * 100).toFixed(0)}%</span>
          </div>
          <Slider
            id="diameter"
            min={0}
            max={1}
            step={0.05}
            value={[diameter]}
            onValueChange={(values) => setDiameter(values[0])}
          />
          <p className="text-xs text-gray-500">Sensitivity to larger lesions</p>
        </div>

        <Button 
          onClick={applySettings} 
          className="w-full"
        >
          Apply Settings
        </Button>

        <p className="text-sm text-gray-500 text-center">
          These settings adjust the sensitivity of our ABCD analysis algorithm (Asymmetry, Border, Color, Diameter).
          Higher values increase detection sensitivity for that feature.
        </p>
      </CardContent>
    </Card>
  );
};

export default ModelUploader;
