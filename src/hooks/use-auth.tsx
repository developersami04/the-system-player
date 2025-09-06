
'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import {
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db, app } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import type { AppUser } from '@/lib/types';

interface AuthContextType {
  user: User | null;
  appUser: AppUser | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  updateUserXp: (xpToAdd: number) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchAppUser = async (firebaseUser: User) => {
    const userRef = doc(db, 'users', firebaseUser.uid);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      setAppUser(docSnap.data() as AppUser);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in.
        const userRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userRef);
        if (!docSnap.exists()) {
          // New user, create a document in Firestore
          const newUser: AppUser = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            createdAt: new Date(),
            level: 1,
            xp: 0,
          };
          await setDoc(userRef, newUser);
          setAppUser(newUser);
        } else {
          setAppUser(docSnap.data() as AppUser);
        }
        setUser(user);

      } else {
        // User is signed out.
        setUser(null);
        setAppUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/dashboard');
    } catch (error) {
      console.error('Error signing in with Google:', error);
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
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
    signInWithGoogle,
    signOut,
    updateUserXp,
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
