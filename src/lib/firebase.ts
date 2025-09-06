import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, query, where, doc, updateDoc, deleteDoc, serverTimestamp, enableIndexedDbPersistence } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

// Enable offline persistence
if (typeof window !== 'undefined') {
    enableIndexedDbPersistence(db).catch((err) => {
        if (err.code == 'failed-precondition') {
            // Multiple tabs open, persistence can only be enabled in one tab at a a time.
            console.warn('Firestore persistence failed: multiple tabs open.');
        } else if (err.code == 'unimplemented') {
            // The current browser does not support all of the
            // features required to enable persistence
            console.warn('Firestore persistence not available in this browser.');
        }
    });
}


const addTask = async (userId: string, task: { title: string; category: string; dueDate: Date }) => {
  try {
    await addDoc(collection(db, 'users', userId, 'tasks'), {
      ...task,
      completed: false,
      createdAt: serverTimestamp(),
      xp: 100, // Default XP for a new task
    });
  } catch (error) {
    console.error("Error adding task: ", error);
  }
};

const getTasks = async (userId: string) => {
  const tasksCol = collection(db, 'users', userId, 'tasks');
  const q = query(tasksCol);
  const querySnapshot = await getDocs(q);
  const tasks = querySnapshot.docs.map(doc => {
    const data = doc.data();
    return {
        id: doc.id,
        ...data,
        dueDate: data.dueDate?.toDate ? data.dueDate.toDate() : new Date(data.dueDate),
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(data.createdAt)
    }
  });
  return tasks;
};

const updateTask = async (userId: string, taskId: string, updates: any) => {
  const taskRef = doc(db, 'users', userId, 'tasks', taskId);
  await updateDoc(taskRef, updates);
};

const deleteTask = async (userId: string, taskId: string) => {
  const taskRef = doc(db, 'users', userId, 'tasks', taskId);
  await deleteDoc(taskRef);
};

export { app, auth, db, addTask, getTasks, updateTask, deleteTask };
