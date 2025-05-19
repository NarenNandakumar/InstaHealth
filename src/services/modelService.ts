import { DetectionResult } from '@/types';
import { getApiKey } from '@/components/ApiKeyInput';

// OpenAI API endpoint and configuration
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const OPENAI_MODEL = 'gpt-4o'; // Using GPT-4o with vision capabilities
const DEFAULT_API_KEY = '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';

// Function to get the current API key or fallback to demo key
const getCurrentApiKey = (): string => {
  // First try to get the key from localStorage
  const storedKey = getApiKey();
  // If no key in storage, use the default key
  return storedKey || DEFAULT_API_KEY;
};

// Function to convert image to base64 for API
const imageToBase64 = (imgElement: HTMLImageElement): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      // Create a canvas element
      const canvas = document.createElement('canvas');
      canvas.width = imgElement.naturalWidth;
      canvas.height = imgElement.naturalHeight;
      
      // Draw the image on canvas
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not create canvas context'));
        return;
      }
      
      ctx.drawImage(imgElement, 0, 0);
      
      // Get base64 string
      const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
      const base64Data = dataUrl.replace(/^data:image\/jpeg;base64,/, '');
      
      resolve(base64Data);
    } catch (err) {
      reject(err);
    }
  });
};

// Main function to detect skin cancer using OpenAI's API
export const detectSkinCancer = async (imageElement: HTMLImageElement): Promise<DetectionResult> => {
  try {
    const apiKey = getCurrentApiKey();
    
    // Convert the image to base64
    const base64Image = await imageToBase64(imageElement);
    
    // Prepare the API request
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        messages: [
          {
            role: 'system',
            content: 'You are a dermatologist AI assistant specialized in skin cancer detection. Your task is to analyze the image and provide ONLY a binary classification. You MUST ALWAYS respond with either "Benign" or "Malignant" - absolutely no other answer is acceptable. DO NOT say "Unknown", "Cannot determine", or express uncertainty. If you are uncertain, you must still make your best guess based on available visual data. Your response MUST follow this EXACT format with no additional text:\n\nPrediction: [Benign or Malignant]\nConfidence: [number between 0.8 and 1.0]'
          },
          {
            role: 'user',
            content: [
              { type: 'text', text: 'Analyze this skin lesion for potential cancer indicators. Remember to ONLY respond with Prediction and Confidence.' },
              { 
                type: 'image_url', 
                image_url: { url: `data:image/jpeg;base64,${base64Image}` } 
              }
            ]
          }
        ],
        temperature: 0.1, // Lower temperature for more deterministic results
        max_tokens: 50 // Limiting tokens since we only need a short response
      })
    });
    
    if (!response.ok) {
      const errorData = await response.text();
      console.error(`API error status: ${response.status}, Details:`, errorData);
      throw new Error(`API error: ${response.status} - ${errorData}`);
    }
    
    // Parse the API response
    const data = await response.json();
    console.log('Complete API response:', data); // Log the full response for debugging
    
    // Extract the prediction and confidence from the response
    const aiResponse = data.choices[0].message.content;
    console.log('AI Raw Response:', aiResponse);
    
    // Parse the AI's response to extract prediction and confidence
    let prediction = 'Benign'; // Default to Benign if we can't determine
    let confidence = 0.8; // Set minimum confidence to 0.8
    
    // More robust parsing of the prediction
    const predictionMatch = aiResponse.match(/prediction:?\s*(benign|malignant)/i);
    if (predictionMatch) {
      prediction = predictionMatch[1].charAt(0).toUpperCase() + predictionMatch[1].slice(1).toLowerCase();
    } else {
      // Fallback parsing - check if either word appears in the text
      if (/malignant/i.test(aiResponse)) {
        prediction = 'Malignant';
      } else if (/benign/i.test(aiResponse)) {
        prediction = 'Benign';
      }
      // Otherwise keep the default Benign
    }
    
    // Try to extract confidence level but ensure it's at least 0.8
    const confidenceMatch = aiResponse.match(/confidence(?:\s+level)?(?:\s*:?\s*)(\d+(?:\.\d+)?%?|\d+(?:\.\d+)?)/i);
    if (confidenceMatch) {
      // Extract the numeric part
      let confValue = confidenceMatch[1].replace('%', '');
      let parsedConfidence = parseFloat(confValue) / (confValue.includes('%') ? 100 : 1); // Convert to decimal if it was a percentage
      
      // Ensure confidence is between 0.8 and 1
      confidence = Math.max(0.8, Math.min(1, parsedConfidence));
    }
    
    console.log(`Final parsed result: Prediction=${prediction}, Confidence=${confidence}`);
    
    return {
      prediction,
      confidence,
      timestamp: new Date()
    };
  } catch (error) {
    console.error('Error during skin cancer detection:', error);
    // Return a properly typed error result
    return {
      prediction: 'Error',
      confidence: 0,
      timestamp: new Date(),
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Function to detect eczema using OpenAI's API
export const detectEczema = async (imageElement: HTMLImageElement): Promise<DetectionResult> => {
  try {
    const apiKey = getCurrentApiKey();
    
    // Convert the image to base64
    const base64Image = await imageToBase64(imageElement);
    
    // Prepare the API request
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        messages: [
          {
            role: 'system',
            content: 'You are a dermatologist AI assistant specialized in eczema detection. Your task is to analyze the image and provide ONLY a binary classification. You MUST ALWAYS respond with either "Eczema" or "No Eczema" - absolutely no other answer is acceptable. DO NOT say "Unknown", "Cannot determine", or express uncertainty. If you are uncertain, you must still make your best guess based on available visual data. Your response MUST follow this EXACT format with no additional text:\n\nPrediction: [Eczema or No Eczema]\nConfidence: [number between 0.8 and 1.0]'
          },
          {
            role: 'user',
            content: [
              { type: 'text', text: 'Analyze this skin condition for signs of eczema. Remember to ONLY respond with Prediction and Confidence.' },
              { 
                type: 'image_url', 
                image_url: { url: `data:image/jpeg;base64,${base64Image}` } 
              }
            ]
          }
        ],
        temperature: 0.1, // Lower temperature for more deterministic results
        max_tokens: 50 // Limiting tokens since we only need a short response
      })
    });
    
    if (!response.ok) {
      const errorData = await response.text();
      console.error(`API error status: ${response.status}, Details:`, errorData);
      throw new Error(`API error: ${response.status} - ${errorData}`);
    }
    
    // Parse the API response
    const data = await response.json();
    console.log('Complete API response (eczema):', data); // Log the full response for debugging
    
    // Extract the prediction and confidence from the response
    const aiResponse = data.choices[0].message.content;
    console.log('AI Raw Response (eczema):', aiResponse);
    
    // Parse the AI's response to extract prediction and confidence
    let prediction = 'No Eczema'; // Default if we can't determine
    let confidence = 0.8; // Set minimum confidence to 0.8
    
    // More robust parsing of the prediction
    const predictionMatch = aiResponse.match(/prediction:?\s*(eczema|no eczema)/i);
    if (predictionMatch) {
      prediction = predictionMatch[1].charAt(0).toUpperCase() + predictionMatch[1].slice(1).toLowerCase();
    } else {
      // Fallback parsing - check if either word appears in the text
      if (/eczema\b/i.test(aiResponse) && !(/no eczema/i.test(aiResponse))) {
        prediction = 'Eczema';
      } else {
        prediction = 'No Eczema';
      }
    }
    
    // Try to extract confidence level but ensure it's at least 0.8
    const confidenceMatch = aiResponse.match(/confidence(?:\s+level)?(?:\s*:?\s*)(\d+(?:\.\d+)?%?|\d+(?:\.\d+)?)/i);
    if (confidenceMatch) {
      // Extract the numeric part
      let confValue = confidenceMatch[1].replace('%', '');
      let parsedConfidence = parseFloat(confValue) / (confValue.includes('%') ? 100 : 1); // Convert to decimal if it was a percentage
      
      // Ensure confidence is between 0.8 and 1
      confidence = Math.max(0.8, Math.min(1, parsedConfidence));
    }
    
    console.log(`Final parsed result (eczema): Prediction=${prediction}, Confidence=${confidence}`);
    
    return {
      prediction,
      confidence,
      timestamp: new Date()
    };
  } catch (error) {
    console.error('Error during eczema detection:', error);
    // Return a properly typed error result
    return {
      prediction: 'Error',
      confidence: 0,
      timestamp: new Date(),
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Keeping these functions to avoid breaking any existing code that might call them
export const loadModel = async (): Promise<void> => {
  console.log('Initializing OpenAI API integration...');
  return Promise.resolve();
};

export const setAnalysisThresholds = (
  asymmetry: number, 
  border: number, 
  color: number, 
  diameter: number
): void => {
  console.log('Analysis parameters are now fixed and handled by AI model.');
};

export const resetAnalysisCount = (): void => {
  console.log('Analysis count reset.');
};

export const setDemoMode = (enabled: boolean): void => {
  console.log(`Demo mode ${enabled ? 'enabled' : 'disabled'}.`);
};
