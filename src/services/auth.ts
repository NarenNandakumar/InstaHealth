
import { 
  signOut, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { auth, database } from './firebase';

export const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error: any) {
    console.error('Error signing in:', error);
    return { success: false, error: error.message };
  }
};

export const register = async (email: string, password: string, userType: 'user' | 'doctor') => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Save user data to Firebase Realtime Database
    await set(ref(database, 'users/' + user.uid), {
      email: email,
      userType: userType,
      createdAt: Date.now()
    });
    
    return { success: true, user };
  } catch (error: any) {
    console.error('Error signing up:', error);
    return { success: false, error: error.message };
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    console.error('Error signing out:', error);
    return false;
  }
};
