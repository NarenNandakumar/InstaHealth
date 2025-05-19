
export interface DetectionResult {
  prediction: string;
  confidence: number;
  timestamp: Date;
  error?: string; // Added optional error property
}

export type ImageFile = File & {
  preview: string;
};
