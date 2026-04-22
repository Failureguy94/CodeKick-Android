import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  initializeAuth,
  getAuth,
  inMemoryPersistence,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// ─── Firebase Client — replaces Supabase ─────────────────────────────────────
// Using Firebase JS SDK v10+ with Expo.
// Note: getReactNativePersistence was removed in SDK v10+.
// We use inMemoryPersistence here; session will not survive app restarts
// in Expo Go. For persistent sessions, use @react-native-firebase (native build).

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase app (safe for hot-reload)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Auth — try initializeAuth first, fall back to getAuth on hot reload
let auth: ReturnType<typeof getAuth>;
try {
  auth = initializeAuth(app, {
    persistence: inMemoryPersistence,
  });
} catch {
  auth = getAuth(app);
}

const db = getFirestore(app);

export { auth, db };
