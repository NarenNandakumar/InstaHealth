
import React, { useState, useCallback, Dispatch, SetStateAction } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ImageFile } from '@/types';
import { Upload, X } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload?: (img: HTMLImageElement | null) => void;
  onImageSelect?: Dispatch<SetStateAction<ImageFile | null>>;
  selectedImage?: ImageFile | null;
  isBusy?: boolean;
  disabled?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  onImageUpload, 
  onImageSelect,
  selectedImage: propSelectedImage,
  isBusy = false, 
  disabled = false 
}) => {
  // Use internal state if no selectedImage prop is provided
  const [internalSelectedImage, setInternalSelectedImage] = useState<ImageFile | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // Use either the prop or internal state
  const selectedImage = propSelectedImage !== undefined ? propSelectedImage : internalSelectedImage;
  const setSelectedImage = onImageSelect || setInternalSelectedImage;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    const imageFile = file as ImageFile;
    imageFile.preview = URL.createObjectURL(file);
    setSelectedImage(imageFile);
    
    // Create an image element from the file if onImageUpload is provided
    if (onImageUpload) {
      const img = new Image();
      img.onload = () => {
        onImageUpload(img);
      };
      img.src = imageFile.preview;
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const removeImage = () => {
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage.preview);
    }
    setSelectedImage(null);
    if (onImageUpload) {
      onImageUpload(null);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        {selectedImage ? (
          <div className="relative">
            <img
              src={selectedImage.preview}
              alt="Selected"
              className="w-full h-64 object-contain rounded-md border"
            />
            <button
              onClick={removeImage}
              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
              aria-label="Remove image"
              disabled={isBusy}
            >
              <X className="h-5 w-5 text-gray-700" />
            </button>
          </div>
        ) : (
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center ${
              isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            } ${disabled || isBusy ? 'opacity-60 cursor-not-allowed' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm font-medium text-gray-900">
              Drag and drop an image, or
            </p>
            <label className={`mt-2 ${disabled || isBusy ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
              <Button variant="outline" className="relative" disabled={disabled || isBusy}>
                Browse Files
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                  accept="image/*"
                  disabled={disabled || isBusy}
                />
              </Button>
            </label>
            <p className="mt-2 text-xs text-gray-500">
              PNG, JPG, JPEG up to 10MB
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ImageUpload;
