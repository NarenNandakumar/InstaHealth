import * as tf from '@tensorflow/tfjs';
import { DetectionResult } from '@/types';

// Keep track of whether we're using demo mode
let isDemoMode = true;
let model: tf.GraphModel | null = null;

export const loadModel = async (): Promise<void> => {
  try {
    if (isDemoMode) {
      console.log('Using demo mode - no model will be loaded');
      return;
    }
    
    console.log('Loading skin cancer detection model...');
    model = await tf.loadGraphModel('/model/model.json');
    console.log('Model loaded successfully');
  } catch (error) {
    console.error('Failed to load model:', error);
    // Fall back to demo mode if model loading fails
    isDemoMode = true;
    console.log('Falling back to demo mode');
  }
};

export const preprocessImage = async (imageData: ImageData | HTMLImageElement): Promise<tf.Tensor> => {
  // Convert the image to a tensor
  let tensor = tf.browser.fromPixels(imageData);
  
  // Resize to model input size (assuming 224x224 for this model)
  tensor = tf.image.resizeBilinear(tensor, [224, 224]);
  
  // Normalize pixel values to [0, 1]
  tensor = tensor.toFloat().div(tf.scalar(255));
  
  // Add batch dimension
  tensor = tensor.expandDims(0);
  
  return tensor;
};

export const detectSkinCancer = async (imageElement: HTMLImageElement): Promise<DetectionResult> => {
  try {
    if (isDemoMode) {
      console.log('Using demo mode for prediction');
      // Simulate a random prediction with delay to mimic model processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate random confidence between 0.6 and 0.9
      const confidence = 0.6 + Math.random() * 0.3;
      // Randomly decide benign (60% chance) or malignant (40% chance)
      const isMalignant = Math.random() > 0.6;
      const prediction = isMalignant ? "Malignant" : "Benign";
      
      return {
        prediction,
        confidence: parseFloat(confidence.toFixed(4)),
        timestamp: new Date()
      };
    }

    if (!model) {
      await loadModel();
    }

    if (!model) {
      throw new Error('Model not loaded');
    }

    // Preprocess the image
    const tensor = await preprocessImage(imageElement);
    
    // Run inference
    const predictions = await model.predict(tensor) as tf.Tensor;
    
    // Get the prediction data
    const data = await predictions.data();
    const confidence = Math.max(...Array.from(data));
    const predictionIndex = Array.from(data).indexOf(confidence);
    
    // Clean up tensors
    tensor.dispose();
    predictions.dispose();
    
    // Return result (assuming binary classification: 0=benign, 1=malignant)
    const prediction = predictionIndex === 1 ? "Malignant" : "Benign";
    
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

// Helper function to set demo mode
export const setDemoMode = (enabled: boolean): void => {
  isDemoMode = enabled;
};
