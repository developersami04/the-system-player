
'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  updateProfile,
  User,
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import type { AppUser } from '@/lib/types';

interface AuthContextType {
  user: User | null;
  appUser: AppUser | null;
  loading: boolean;
  signUpWithEmailAndPassword: (email: string, password: string, displayName: string) => Promise<string | undefined>;
  signInWithEmailAndPassword: (email: string, password: string) => Promise<string | undefined>;
  signOut: () => Promise<void>;
  updateUserXp: (xpToAdd: number) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper to get a user-friendly error message
const getFirebaseAuthErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/user-disabled':
      return 'This user account has been disabled.';
    case 'auth/user-not-found':
      return 'No user found with this email.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/email-already-in-use':
      return 'This email is already in use by another account.';
    case 'auth/weak-password':
      return 'The password is too weak. Please use a stronger password.';
    case 'auth/operation-not-allowed':
        return 'Email & Password sign-in is not enabled. Please contact support.';
    case 'auth/network-request-failed':
        return 'Network error. Please check your connection and try again.';
    default:
      return 'An unexpected error occurred. Please try again.';
  }
};


export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchAppUser = useCallback(async (firebaseUser: User | null) => {
    if (!firebaseUser) {
      setAppUser(null);
      return;
    }
    const userRef = doc(db, 'users', firebaseUser.uid);
    try {
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        const userData = docSnap.data() as AppUser;
        setAppUser({
          ...userData,
          // @ts-ignore
          createdAt: userData.createdAt?.toDate ? userData.createdAt.toDate() : new Date(userData.createdAt),
        });
      } else {
        // This case might happen if user exists in Auth but not in Firestore.
        // We can create it here, or log an issue.
        await createNewAppUser(firebaseUser);
      }
    } catch (error) {
        console.error("Error fetching app user:", error);
        setAppUser(null);
        // Handle offline error gracefully if needed
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        setUser(user);
        await fetchAppUser(user);
      } else {
        setUser(null);
        setAppUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [fetchAppUser]);

  const createNewAppUser = async (firebaseUser: User) => {
    const userRef = doc(db, 'users', firebaseUser.uid);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      const newUser: AppUser = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL,
        // @ts-ignore
        createdAt: serverTimestamp(),
        level: 1,
        xp: 0,
      };
      try {
        await setDoc(userRef, newUser);
        setAppUser({ ...newUser, createdAt: new Date() });
      } catch(e) {
          console.error("Error creating user doc", e)
      }
    }
  }

  const signUpWithEmailAndPassword = async (email: string, password: string, displayName: string) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName });
      await createNewAppUser(userCredential.user);
      setUser(userCredential.user); // Eagerly set user
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Sign up error:', error);
      setLoading(false);
      return getFirebaseAuthErrorMessage(error.code);
    }
  };

  const signInWithEmailAndPassword = async (email: string, password: string) => {
    setLoading(true);
    try {
      const userCredential = await firebaseSignInWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
        await fetchAppUser(userCredential.user);
        router.push('/dashboard');
      } else {
        // This case is unlikely with Firebase SDK but good to handle
        setLoading(false);
        return "Login failed: No authentication details received.";
      }
    } catch (error: any) {
      console.error('Sign in error:', error);
      setLoading(false);
      return getFirebaseAuthErrorMessage(error.code);
    }
  };


  const signOut = async () => {
    setLoading(true);
    try {
      await auth.signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
        setLoading(false);
    }
  };

  const updateUserXp = async (xpToAdd: number) => {
    if (user && appUser) {
        const newXp = (appUser.xp || 0) + xpToAdd;
        let newLevel = appUser.level || 1;
        
        let xpForNextLevel = newLevel * 1000;
        while (newXp >= xpForNextLevel) {
            newLevel++;
            xpForNextLevel = newLevel * 1000;
        }

        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, {
            xp: newXp,
            level: newLevel
        });
        
        await fetchAppUser(user);
    }
  }

  const value = {
    user,
    appUser,
    loading,
    signOut,
    updateUserXp,
    signUpWithEmailAndPassword,
    signInWithEmailAndPassword
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
