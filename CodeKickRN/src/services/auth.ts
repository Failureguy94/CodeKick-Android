import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile,
  User,
} from 'firebase/auth';
import { auth } from './firebase';
import { firestoreService } from './firestore';
import { Profile } from '../types';

// ─── Auth Service — Firebase replacement for Supabase auth ──────────────────

export const authService = {
  /**
   * Sign up with email, username, full name, password, and phone.
   * Creates Firebase Auth user + Firestore profile.
   */
  async signUp(
    username: string,
    fullName: string,
    email: string,
    password: string,
    phoneNumber: string,
  ): Promise<User> {
    // Check username is available before creating the auth user
    const taken = await firestoreService.isUsernameTaken(username);
    if (taken) throw new Error('USERNAME_TAKEN');

    const { user } = await createUserWithEmailAndPassword(auth, email.trim().toLowerCase(), password);

    // Set display name for Firebase Auth
    await updateProfile(user, { displayName: fullName });

    // Create Firestore profile + username mapping
    await firestoreService.createProfile(user.uid, username, fullName, email, phoneNumber);

    return user;
  },

  /**
   * Sign in with username OR email + password.
   * If input contains '@', treat as email. Otherwise look up username → email.
   */
  async signIn(usernameOrEmail: string, password: string): Promise<User> {
    let email: string;

    if (usernameOrEmail.includes('@')) {
      // Treat as email directly
      email = usernameOrEmail.trim().toLowerCase();
    } else {
      // Look up username → email in Firestore
      const mappedEmail = await firestoreService.getEmailByUsername(usernameOrEmail.trim());
      if (!mappedEmail) throw new Error('USER_NOT_FOUND');
      email = mappedEmail;
    }

    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  },

  /**
   * Sign out current user.
   */
  async signOut(): Promise<void> {
    await firebaseSignOut(auth);
  },

  /**
   * Get the currently authenticated Firebase user.
   */
  getCurrentUser(): User | null {
    return auth.currentUser;
  },

  /**
   * Get profile from Firestore by UID.
   */
  async getProfile(userId: string): Promise<Profile | null> {
    return firestoreService.getProfile(userId);
  },

  /**
   * Listen for auth state changes.
   * Returns unsubscribe function.
   */
  onAuthStateChange(callback: (user: User | null) => void): () => void {
    return onAuthStateChanged(auth, callback);
  },
};
