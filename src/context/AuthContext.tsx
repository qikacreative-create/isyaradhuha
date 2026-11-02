import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  limit
} from 'firebase/firestore';
import { auth, googleProvider, db, handleFirestoreError, OperationType } from '../lib/firebase';
import { LearningHistoryRecord, UserProgress } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthReady: boolean;
  isLoggingIn: boolean;
  authError: string | null;
  history: LearningHistoryRecord[];
  isHistoryLoading: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  saveHistoryRecord: (
    record: Omit<LearningHistoryRecord, 'id' | 'userId' | 'createdAt' | 'dateFormatted'>
  ) => Promise<void>;
  deleteHistoryRecord: (recordId: string) => Promise<void>;
  clearAllHistory: () => Promise<void>;
  syncProfileToCloud: (progress: UserProgress) => Promise<void>;
  cloudProfile: Partial<UserProgress> | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_HISTORY_KEY = 'bintang_belajar_learning_history_v2';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState<boolean>(false);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [history, setHistory] = useState<LearningHistoryRecord[]>([]);
  const [isHistoryLoading, setIsHistoryLoading] = useState<boolean>(false);
  const [cloudProfile, setCloudProfile] = useState<Partial<UserProgress> | null>(null);

  // Monitor auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setIsAuthReady(true);

      if (currentUser) {
        // Fetch or create user document in Firestore
        const userDocRef = doc(db, 'users', currentUser.uid);
        try {
          const snap = await getDoc(userDocRef);
          if (snap.exists()) {
            const data = snap.data();
            setCloudProfile({
              studentName: data.studentName || currentUser.displayName || 'Bintang Belajar',
              madrasahName: data.madrasahName || 'Sekolah Dasar / MI',
              stars: typeof data.stars === 'number' ? data.stars : 10
            });
          } else {
            // Initial profile creation
            const initialData = {
              userId: currentUser.uid,
              email: currentUser.email || '',
              studentName: currentUser.displayName || 'Siswa Berprestasi',
              madrasahName: 'Sekolah Dasar',
              stars: 10,
              updatedAt: new Date().toISOString()
            };
            await setDoc(userDocRef, initialData);
            setCloudProfile({
              studentName: initialData.studentName,
              madrasahName: initialData.madrasahName,
              stars: initialData.stars
            });
          }
        } catch (err) {
          console.warn('Gagal memuat profil pengguna dari cloud:', err);
        }
      } else {
        setCloudProfile(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Listen to learning history in real-time if logged in, or load from localStorage if guest
  useEffect(() => {
    if (!isAuthReady) return;

    if (user) {
      setIsHistoryLoading(true);
      const historyColPath = `users/${user.uid}/history`;
      const historyQuery = query(
        collection(db, 'users', user.uid, 'history'),
        orderBy('createdAt', 'desc'),
        limit(100)
      );

      const unsubscribe = onSnapshot(
        historyQuery,
        (snapshot) => {
          const items: LearningHistoryRecord[] = [];
          snapshot.forEach((docSnap) => {
            items.push(docSnap.data() as LearningHistoryRecord);
          });
          setHistory(items);
          setIsHistoryLoading(false);
        },
        (error) => {
          setIsHistoryLoading(false);
          handleFirestoreError(error, OperationType.GET, historyColPath);
        }
      );

      return () => unsubscribe();
    } else {
      // Guest / Offline fallback from localStorage
      try {
        const local = localStorage.getItem(LOCAL_STORAGE_HISTORY_KEY);
        if (local) {
          setHistory(JSON.parse(local));
        } else {
          setHistory([]);
        }
      } catch {
        setHistory([]);
      }
      setIsHistoryLoading(false);
    }
  }, [user, isAuthReady]);

  // Login with Google Popup
  const loginWithGoogle = async () => {
    setIsLoggingIn(true);
    setAuthError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Gagal login';
      setAuthError(msg);
      console.error('Login error:', err);
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Sign out
  const logout = async () => {
    try {
      await signOut(auth);
      setCloudProfile(null);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // Save new learning record
  const saveHistoryRecord = async (
    record: Omit<LearningHistoryRecord, 'id' | 'userId' | 'createdAt' | 'dateFormatted'>
  ) => {
    const id = `rec_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const now = new Date();
    const dateFormatted = now.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const fullRecord: LearningHistoryRecord = {
      ...record,
      id,
      userId: user ? user.uid : 'guest_local',
      dateFormatted,
      createdAt: now.toISOString()
    };

    if (user) {
      const historyDocPath = `users/${user.uid}/history/${id}`;
      try {
        // Save history item
        await setDoc(doc(db, 'users', user.uid, 'history', id), fullRecord);

        // Also update total stars and timestamp on user profile
        const userDocRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userDocRef);
        const currentStars = userSnap.exists() && typeof userSnap.data().stars === 'number'
          ? userSnap.data().stars
          : 0;

        await setDoc(
          userDocRef,
          {
            stars: currentStars + (record.starsEarned || 0),
            updatedAt: now.toISOString()
          },
          { merge: true }
        );
      } catch (err) {
        handleFirestoreError(err, OperationType.CREATE, historyDocPath);
      }
    } else {
      // Save locally
      try {
        const next = [fullRecord, ...history].slice(0, 100);
        setHistory(next);
        localStorage.setItem(LOCAL_STORAGE_HISTORY_KEY, JSON.stringify(next));
      } catch (e) {
        console.warn('Gagal menyimpan riwayat lokal:', e);
      }
    }
  };

  // Delete a specific record
  const deleteHistoryRecord = async (recordId: string) => {
    if (user) {
      const itemPath = `users/${user.uid}/history/${recordId}`;
      try {
        await deleteDoc(doc(db, 'users', user.uid, 'history', recordId));
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, itemPath);
      }
    } else {
      const next = history.filter(item => item.id !== recordId);
      setHistory(next);
      try {
        localStorage.setItem(LOCAL_STORAGE_HISTORY_KEY, JSON.stringify(next));
      } catch (e) {
        console.warn(e);
      }
    }
  };

  // Clear all history
  const clearAllHistory = async () => {
    if (user) {
      // Delete individually from Firestore collection
      const historyColPath = `users/${user.uid}/history`;
      try {
        const deletePromises = history.map(item =>
          deleteDoc(doc(db, 'users', user.uid, 'history', item.id))
        );
        await Promise.all(deletePromises);
        setHistory([]);
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, historyColPath);
      }
    } else {
      setHistory([]);
      try {
        localStorage.removeItem(LOCAL_STORAGE_HISTORY_KEY);
      } catch (e) {
        console.warn(e);
      }
    }
  };

  // Sync profile details (name, madrasah, stars) to cloud
  const syncProfileToCloud = async (progress: UserProgress) => {
    if (!user) return;
    const path = `users/${user.uid}`;
    try {
      await setDoc(
        doc(db, 'users', user.uid),
        {
          userId: user.uid,
          email: user.email || '',
          studentName: progress.studentName || 'Bintang Belajar',
          madrasahName: progress.madrasahName || 'Sekolah Dasar / MI',
          stars: progress.stars || 0,
          updatedAt: new Date().toISOString()
        },
        { merge: true }
      );
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, path);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthReady,
        isLoggingIn,
        authError,
        history,
        isHistoryLoading,
        loginWithGoogle,
        logout,
        saveHistoryRecord,
        deleteHistoryRecord,
        clearAllHistory,
        syncProfileToCloud,
        cloudProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
