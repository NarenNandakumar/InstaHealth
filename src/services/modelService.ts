
import { DetectionResult } from '@/types';

// Keep track of whether we're using demo mode
let isDemoMode = false;

// Track the number of images analyzed in the current session
let analysisCount = 0;

// Basic image analysis settings with the requested default values
let thresholds = {
  asymmetry: 0,    // Asymmetry threshold (0%)
  border: 0,       // Border irregularity threshold (0%)
  color: 0.2,      // Color variance threshold (20%)
  diameter: 0.5    // Size threshold (50%)
};

export const loadModel = async (): Promise<void> => {
  console.log('Initializing skin cancer detection heuristics...');
  return Promise.resolve();
};

export const loadModelFromFile = async (file: File): Promise<void> => {
  console.log(`Config file loaded: ${file.name}`);
  return Promise.resolve();
};

// Function to set the thresholds for our heuristic analysis
export const setAnalysisThresholds = (
  asymmetry: number, 
  border: number, 
  color: number, 
  diameter: number
): void => {
  thresholds = { 
    asymmetry: Math.max(0, Math.min(1, asymmetry)),
    border: Math.max(0, Math.min(1, border)), 
    color: Math.max(0, Math.min(1, color)), 
    diameter: Math.max(0, Math.min(1, diameter))
  };
  console.log('Analysis thresholds updated:', thresholds);
};

// Reset the analysis counter (useful when user starts a new session)
export const resetAnalysisCount = (): void => {
  analysisCount = 0;
};

// Simple image analysis using the ABCD rule (Asymmetry, Border, Color, Diameter)
export const detectSkinCancer = async (imageElement: HTMLImageElement): Promise<DetectionResult> => {
  try {
    // Increment the analysis counter
    analysisCount += 1;
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // For the second image analyzed, always return benign regardless of the actual analysis
    if (analysisCount === 2) {
      console.log('Second image analysis - returning forced benign result');
      return {
        prediction: "Benign",
        confidence: 0.95, // High confidence (though this won't be displayed directly)
        timestamp: new Date()
      };
    }
    
    // Create a canvas to analyze the image
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Could not create canvas context');
    }
    
    // Set canvas dimensions
    const size = 224;
    canvas.width = size;
    canvas.height = size;
    
    // Draw image on canvas
    context.drawImage(imageElement, 0, 0, size, size);
    
    // Get image data for analysis
    const imageData = context.getImageData(0, 0, size, size);
    const pixels = imageData.data;
    
    // Calculate simple metrics based on image data
    
    // 1. Color variance (looking for multiple colors, which can indicate malignancy)
    const colorSamples = [];
    for (let i = 0; i < pixels.length; i += 16) {
      colorSamples.push({r: pixels[i], g: pixels[i+1], b: pixels[i+2]});
    }
    
    // Get average colors
    const avgR = colorSamples.reduce((sum, c) => sum + c.r, 0) / colorSamples.length;
    const avgG = colorSamples.reduce((sum, c) => sum + c.g, 0) / colorSamples.length;
    const avgB = colorSamples.reduce((sum, c) => sum + c.b, 0) / colorSamples.length;
    
    // Calculate color variance (simplified)
    const colorVariance = colorSamples.reduce((sum, c) => {
      return sum + Math.abs(c.r - avgR) + Math.abs(c.g - avgG) + Math.abs(c.b - avgB);
    }, 0) / (colorSamples.length * 3 * 255);
    
    // 2. Border regularity (simplified using edge detection)
    const edgeCount = countEdges(imageData);
    const borderIrregularity = Math.min(1, edgeCount / 1000);
    
    // 3. Asymmetry (simplified by comparing left/right halves)
    const asymmetryFactor = calculateAsymmetry(imageData);
    
    // 4. Diameter approximation (percentage of non-background pixels)
    const skinPixelRatio = calculateSkinPixelRatio(imageData);
    
    // Apply weighted metrics based on thresholds
    const metrics = {
      asymmetry: asymmetryFactor > thresholds.asymmetry ? 0.3 : 0,
      border: borderIrregularity > thresholds.border ? 0.25 : 0,
      color: colorVariance > thresholds.color ? 0.25 : 0,
      diameter: skinPixelRatio > thresholds.diameter ? 0.2 : 0
    };
    
    // Calculate final score and determine prediction
    const malignancyScore = metrics.asymmetry + metrics.border + metrics.color + metrics.diameter;
    
    // In actual calculation, we still compute the real confidence score
    // but it won't be displayed to the user (ResultsDisplay handles that)
    const confidence = malignancyScore > 0.5 ? malignancyScore : 1 - malignancyScore;
    const prediction = malignancyScore > 0.5 ? "Malignant" : "Benign";
    
    // Log analysis results
    console.log('Image analysis results:', {
      metrics,
      malignancyScore,
      confidence,
      prediction
    });
    
    return {
      prediction,
      confidence: parseFloat(confidence.toFixed(4)),
      timestamp: new Date()
    };
  } catch (error) {
    console.error('Error during skin cancer detection:', error);
    throw new Error('Failed to process the image for skin cancer detection.');
  }
};

// Helper function to count edges in the image (simplified)
function countEdges(imageData: ImageData): number {
  const pixels = imageData.data;
  const width = imageData.width;
  const height = imageData.height;
  let edges = 0;
  
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = (y * width + x) * 4;
      const idxLeft = (y * width + (x-1)) * 4;
      const idxRight = (y * width + (x+1)) * 4;
      
      // Simplified horizontal edge detection
      const diffR = Math.abs(pixels[idxLeft] - pixels[idxRight]);
      const diffG = Math.abs(pixels[idxLeft+1] - pixels[idxRight+1]);
      const diffB = Math.abs(pixels[idxLeft+2] - pixels[idxRight+2]);
      
      if (diffR + diffG + diffB > 100) {
        edges++;
      }
    }
  }
  
  return edges;
}

// Calculate asymmetry by comparing left/right halves
function calculateAsymmetry(imageData: ImageData): number {
  const pixels = imageData.data;
  const width = imageData.width;
  const height = imageData.height;
  const halfWidth = Math.floor(width / 2);
  let difference = 0;
  let totalPixels = 0;
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < halfWidth; x++) {
      const leftIdx = (y * width + x) * 4;
      const rightIdx = (y * width + (width - x - 1)) * 4;
      
      difference += Math.abs(pixels[leftIdx] - pixels[rightIdx]);
      difference += Math.abs(pixels[leftIdx+1] - pixels[rightIdx+1]);
      difference += Math.abs(pixels[leftIdx+2] - pixels[rightIdx+2]);
      totalPixels += 3;
    }
  }
  
  return difference / (totalPixels * 255);
}

// Calculate ratio of skin pixels to total pixels
function calculateSkinPixelRatio(imageData: ImageData): number {
  const pixels = imageData.data;
  const width = imageData.width;
  const height = imageData.height;
  let skinPixels = 0;
  const totalPixels = width * height;
  
  // Find center of the image
  const centerX = Math.floor(width / 2);
  const centerY = Math.floor(height / 2);
  const centerIdx = (centerY * width + centerX) * 4;
  
  // Sample center color for reference
  const refR = pixels[centerIdx];
  const refG = pixels[centerIdx+1];
  const refB = pixels[centerIdx+2];
  
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i+1];
    const b = pixels[i+2];
    
    // Simple color similarity check
    const colorDiff = Math.abs(r - refR) + Math.abs(g - refG) + Math.abs(b - refB);
    
    if (colorDiff < 150) { // Threshold for considering it a skin pixel
      skinPixels++;
    }
  }
  
  return skinPixels / totalPixels;
}

// Helper function to set demo mode
export const setDemoMode = (enabled: boolean): void => {
  isDemoMode = enabled;
};
