
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
  FacebookAuthProvider,
  signInWithPopup,
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
  signInWithGoogle: () => Promise<void>;
  signInWithFacebook: () => Promise<void>;
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
      const userData = docSnap.data() as AppUser;
      setAppUser({
        ...userData,
        // @ts-ignore
        createdAt: userData.createdAt?.toDate ? userData.createdAt.toDate() : new Date(userData.createdAt),
      });
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userRef);
        if (!docSnap.exists()) {
          // New user, create a document in Firestore
          const newUser: AppUser = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
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
        } else {
            const userData = docSnap.data() as AppUser;
            setAppUser({
                ...userData,
                // @ts-ignore
                createdAt: userData.createdAt?.toDate ? userData.createdAt.toDate() : new Date(userData.createdAt),
            });
        }
        setUser(user);
      } else {
        setUser(null);
        setAppUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignIn = async (provider: GoogleAuthProvider | FacebookAuthProvider) => {
    setLoading(true);
    try {
        await signInWithPopup(auth, provider);
        router.push('/dashboard');
    } catch (error) {
        console.error('Sign in error:', error);
        // Optionally, show a toast notification to the user
    } finally {
        // setLoading(false) is handled by onAuthStateChanged
    }
  }

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await handleSignIn(provider)
  };

  const signInWithFacebook = async () => {
    const provider = new FacebookAuthProvider();
    await handleSignIn(provider)
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await auth.signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      // setLoading(false) is handled by onAuthStateChanged
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
    signInWithFacebook,
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
