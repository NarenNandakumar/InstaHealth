
/**
 * Utility functions to handle API key management
 */

const API_KEY_STORAGE_KEY = 'openai_api_key';

// Default API key - only used if no key is found in localStorage
const DEFAULT_API_KEY = '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';

/**
 * Gets the OpenAI API key from localStorage or sets the default one
 */
export const getApiKey = (): string => {
  // Don't run this in SSR context
  if (typeof window === 'undefined') {
    return '';
  }

  const storedKey = localStorage.getItem(API_KEY_STORAGE_KEY);
  
  if (storedKey) {
    return storedKey;
  }
  
  // If no key is found, store the default key
  localStorage.setItem(API_KEY_STORAGE_KEY, DEFAULT_API_KEY);
  return DEFAULT_API_KEY;
};

/**
 * Sets the OpenAI API key in localStorage
 */
export const setApiKey = (key: string): void => {
  if (!key) return;
  localStorage.setItem(API_KEY_STORAGE_KEY, key);
};

/**
 * Removes the OpenAI API key from localStorage
 */
export const removeApiKey = (): void => {
  localStorage.removeItem(API_KEY_STORAGE_KEY);
};

/**
 * Checks if an API key exists in localStorage
 */
export const hasApiKey = (): boolean => {
  return !!localStorage.getItem(API_KEY_STORAGE_KEY);
};
