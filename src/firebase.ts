import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDocFromServer,
  setDoc,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore';
import firebaseAppletConfig from '../firebase-applet-config.json';
import { UserProgress } from './types';

// Initialize Firebase using the provisioned configuration
const app = initializeApp(firebaseAppletConfig);
export const db = getFirestore(app, firebaseAppletConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map(provider => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Validate connection to Firestore on boot
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration.');
    }
  }
}
testConnection();

// Blueprint validation constants (mirrored from firebase-blueprint.json)
const MAX_STUDENT_NAME_LEN = 100;
const MAX_MADRASAH_NAME_LEN = 120;
const MAX_CHARACTER_NAME_LEN = 60;
const MAX_HIJAB_COLOR_LEN = 20;
const VALID_HIJAB_STYLES = ['bergo_sekolah', 'pashmina_santri', 'kerudung_rabbani', 'hijab_syari'] as const;
const VALID_OUTFITS = ['mi_hijau', 'sd_merah', 'pramuka', 'batik', 'jas_lab'] as const;

export async function syncProgressToCloud(uid: string, progress: UserProgress): Promise<void> {
  if (!auth.currentUser || auth.currentUser.uid !== uid) return;

  const path = `studentProgress/${uid}`;
  const safeStudentName = (progress.studentName || 'Santri Teladan').trim().slice(0, MAX_STUDENT_NAME_LEN) || 'Santri Teladan';
  const safeMadrasahName = (progress.madrasahName || 'SD / MI Islam Terpadu').trim().slice(0, MAX_MADRASAH_NAME_LEN) || 'SD / MI Islam Terpadu';
  const safeStars = Math.max(0, Math.min(100000, Math.floor(Number(progress.stars) || 0)));
  const safeCharacterName = (progress.character?.name || 'Fatimah').trim().slice(0, MAX_CHARACTER_NAME_LEN) || 'Fatimah';
  const safeHijabColor = (progress.character?.hijabColor || '#ffffff').trim().slice(0, MAX_HIJAB_COLOR_LEN) || '#ffffff';
  const safeHijabStyle = VALID_HIJAB_STYLES.includes(progress.character?.hijabStyle as typeof VALID_HIJAB_STYLES[number])
    ? progress.character.hijabStyle
    : 'bergo_sekolah';
  const safeOutfit = VALID_OUTFITS.includes(progress.character?.outfit as typeof VALID_OUTFITS[number])
    ? progress.character.outfit
    : 'mi_hijau';

  try {
    await setDoc(doc(db, 'studentProgress', uid), {
      uid,
      studentName: safeStudentName,
      madrasahName: safeMadrasahName,
      stars: safeStars,
      characterName: safeCharacterName,
      hijabColor: safeHijabColor,
      hijabStyle: safeHijabStyle,
      outfit: safeOutfit,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export function subscribeToCloudProgress(
  uid: string,
  onData: (cloudData: {
    studentName: string;
    madrasahName: string;
    stars: number;
    characterName: string;
    hijabColor: string;
    hijabStyle: UserProgress['character']['hijabStyle'];
    outfit: UserProgress['character']['outfit'];
  }) => void
) {
  const path = `studentProgress/${uid}`;
  return onSnapshot(
    doc(db, 'studentProgress', uid),
    snapshot => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        onData({
          studentName: typeof data.studentName === 'string' ? data.studentName : 'Aisyah Putri',
          madrasahName: typeof data.madrasahName === 'string' ? data.madrasahName : 'SD / MI Islam Terpadu',
          stars: typeof data.stars === 'number' ? data.stars : 8,
          characterName: typeof data.characterName === 'string' ? data.characterName : 'Fatimah',
          hijabColor: typeof data.hijabColor === 'string' ? data.hijabColor : '#ffffff',
          hijabStyle: data.hijabStyle || 'bergo_sekolah',
          outfit: data.outfit || 'mi_hijau',
        });
      }
    },
    error => {
      handleFirestoreError(error, OperationType.GET, path);
    }
  );
}

export async function signInWithGoogle() {
  return signInWithPopup(auth, googleProvider);
}

export async function signOutUser() {
  return signOut(auth);
}
