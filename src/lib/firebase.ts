import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, query, where, doc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyBVTeurWbsOgsLIQ-GzuVdoE442N5YlXMg',
    authDomain: 'system-ascent.firebaseapp.com',
    projectId: 'system-ascent',
    storageBucket: 'system-ascent.appspot.com',
    messagingSenderId: '145955106382',
    appId: '1:145955106382:web:e35988ebadc2ffb2a31d1f',
    measurementId: 'G-7PE246J99W',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

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
