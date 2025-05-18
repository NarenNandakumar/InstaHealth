
import * as tf from '@tensorflow/tfjs';
import { DetectionResult } from '@/types';

// Load the TFLite model
let model: tf.GraphModel | null = null;

export const loadModel = async (): Promise<void> => {
  try {
    console.log('Loading skin cancer detection model...');
    model = await tf.loadGraphModel('/model/model.json');
    console.log('Model loaded successfully');
  } catch (error) {
    console.error('Failed to load model:', error);
    throw new Error('Failed to load the skin cancer detection model.');
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
