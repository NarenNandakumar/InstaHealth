
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const ACCESSIBILITY_STORAGE_KEY = 'insta_health_accessibility_settings';

interface AccessibilitySettings {
  highContrast: boolean;
  largerText: number;
  reduceMotion: boolean;
  colorBlindMode: string | null;
  screenReader: boolean;
}

const defaultSettings: AccessibilitySettings = {
  highContrast: false,
  largerText: 100,
  reduceMotion: false,
  colorBlindMode: null,
  screenReader: false,
};

const Accessibility: React.FC = () => {
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings);
  const { toast } = useToast();

  // Load settings on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem(ACCESSIBILITY_STORAGE_KEY);
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  // Apply settings when they change
  useEffect(() => {
    // Apply high contrast
    if (settings.highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }

    // Apply text size
    document.documentElement.style.fontSize = `${settings.largerText}%`;

    // Apply color blind mode
    document.documentElement.setAttribute('data-color-mode', settings.colorBlindMode || 'normal');

    // Apply reduce motion
    if (settings.reduceMotion) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }

    // Save settings to localStorage
    localStorage.setItem(ACCESSIBILITY_STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const handleChange = (key: keyof AccessibilitySettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    toast({
      title: "Settings Reset",
      description: "All accessibility settings have been reset to default.",
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Accessibility Settings</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Visual Settings</CardTitle>
            <CardDescription>Adjust how content appears on screen</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="high-contrast">High Contrast Mode</Label>
                <p className="text-sm text-gray-500">Increases color contrast for better readability</p>
              </div>
              <Switch 
                id="high-contrast" 
                checked={settings.highContrast} 
                onCheckedChange={(checked) => handleChange('highContrast', checked)} 
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label htmlFor="text-size">Text Size ({settings.largerText}%)</Label>
              </div>
              <Slider 
                id="text-size"
                min={80} 
                max={200} 
                step={10}
                value={[settings.largerText]}
                onValueChange={(value) => handleChange('largerText', value[0])}
              />
              <p className="text-sm text-gray-500">Adjust the size of text throughout the application</p>
            </div>

            <div className="space-y-4">
              <Label>Color Blind Modes</Label>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="protanopia" 
                    checked={settings.colorBlindMode === 'protanopia'} 
                    onCheckedChange={(checked) => {
                      if (checked) handleChange('colorBlindMode', 'protanopia');
                      else if (settings.colorBlindMode === 'protanopia') handleChange('colorBlindMode', null);
                    }}
                  />
                  <Label htmlFor="protanopia">Red-Green Color Blindness (Protanopia)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="deuteranopia" 
                    checked={settings.colorBlindMode === 'deuteranopia'} 
                    onCheckedChange={(checked) => {
                      if (checked) handleChange('colorBlindMode', 'deuteranopia');
                      else if (settings.colorBlindMode === 'deuteranopia') handleChange('colorBlindMode', null);
                    }}
                  />
                  <Label htmlFor="deuteranopia">Green-Red Color Blindness (Deuteranopia)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="tritanopia" 
                    checked={settings.colorBlindMode === 'tritanopia'} 
                    onCheckedChange={(checked) => {
                      if (checked) handleChange('colorBlindMode', 'tritanopia');
                      else if (settings.colorBlindMode === 'tritanopia') handleChange('colorBlindMode', null);
                    }}
                  />
                  <Label htmlFor="tritanopia">Blue-Yellow Color Blindness (Tritanopia)</Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Movement & Sound</CardTitle>
            <CardDescription>Adjust animation and audio settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="reduce-motion">Reduce Motion</Label>
                <p className="text-sm text-gray-500">Minimize animations and transitions</p>
              </div>
              <Switch 
                id="reduce-motion" 
                checked={settings.reduceMotion} 
                onCheckedChange={(checked) => handleChange('reduceMotion', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="screen-reader">Screen Reader Optimization</Label>
                <p className="text-sm text-gray-500">Enhances compatibility with screen readers</p>
              </div>
              <Switch 
                id="screen-reader" 
                checked={settings.screenReader} 
                onCheckedChange={(checked) => handleChange('screenReader', checked)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end mt-8">
        <Button variant="outline" className="mr-4" onClick={resetSettings}>
          Reset to Defaults
        </Button>
        <Button>
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default Accessibility;
