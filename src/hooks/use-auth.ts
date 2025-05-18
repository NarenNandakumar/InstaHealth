
import { useState, useEffect } from 'react';
import { getCurrentUser } from '@/services/auth';

interface User {
  id: string;
  email: string;
  userType: 'user' | 'doctor';
  createdAt: number;
}

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user from localStorage
    const user = getCurrentUser();
    setCurrentUser(user);
    setLoading(false);
    
    // Setup event listener for storage changes (for multi-tab support)
    const handleStorageChange = () => {
      setCurrentUser(getCurrentUser());
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return { 
    user: currentUser, 
    userData: currentUser, // Keep API compatibility with previous Firebase version
    loading 
  };
};
