import { create } from 'zustand';
import { authService } from '../services/auth';
import { emailjsService } from '../services/emailjs';
import { validateUsername } from '../utils/helpers';

// ─── Auth Store — Firebase-backed, no OTP verification ──────────────────────

interface AuthState {
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
  success: boolean;
  userId: string | null;
  username: string | null;

  signIn: (usernameOrEmail: string, password: string) => Promise<void>;
  signUp: (
    username: string,
    fullName: string,
    email: string,
    password: string,
    phoneNumber: string,
  ) => Promise<void>;
  signOut: () => Promise<void>;
  clearState: () => void;
  initSession: () => void;
  setLoggedIn: (loggedIn: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  isLoading: false,
  error: null,
  success: false,
  userId: null,
  username: null,

  // ─── Sign In (username OR email) ──────────────────────────────────────────
  signIn: async (usernameOrEmail: string, password: string) => {
    const input = usernameOrEmail.trim();
    if (!input.includes('@') && !validateUsername(input)) {
      set({ error: 'Username must be 3+ chars, letters/numbers/underscores only' });
      return;
    }
    set({ isLoading: true, error: null });
    try {
      const user = await authService.signIn(input, password);
      const profile = await authService.getProfile(user.uid);
      set({
        isLoading: false,
        success: true,
        isLoggedIn: true,
        userId: user.uid,
        username: profile?.username || null,
      });
    } catch (e: any) {
      const msg = e?.message || e?.code || '';
      console.log('[SignIn Error]', msg, e);
      let errorMessage = 'Invalid credentials. Please try again.';
      if (msg === 'USER_NOT_FOUND') {
        errorMessage = 'No account found with that username.';
      } else if (msg.includes('wrong-password') || msg.includes('invalid-credential')) {
        errorMessage = 'Wrong password. Please try again.';
      } else if (msg.includes('user-not-found') || msg.includes('INVALID_EMAIL')) {
        errorMessage = 'No account found with that email.';
      } else if (msg.includes('too-many-requests')) {
        errorMessage = 'Too many attempts. Please try again later.';
      } else if (msg.includes('configuration-not-found') || msg.includes('CONFIGURATION_NOT_FOUND')) {
        errorMessage = 'Firebase Auth not enabled. Enable Email/Password in Firebase Console.';
      }
      set({ isLoading: false, error: errorMessage });
    }
  },

  // ─── Sign Up (direct, no OTP) ────────────────────────────────────────────
  signUp: async (username, fullName, email, password, phoneNumber) => {
    if (!validateUsername(username)) {
      set({ error: 'Username: 3+ chars, letters/numbers/underscores only' });
      return;
    }
    if (!fullName.trim()) {
      set({ error: 'Please enter your full name.' });
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      set({ error: 'Please enter a valid email address.' });
      return;
    }
    if (password.length < 6) {
      set({ error: 'Password must be at least 6 characters.' });
      return;
    }
    if (phoneNumber.trim().length < 10) {
      set({ error: 'Please enter a valid phone number.' });
      return;
    }

    set({ isLoading: true, error: null });
    try {
      const user = await authService.signUp(username, fullName, email, password, phoneNumber);
      set({
        isLoading: false,
        success: true,
        isLoggedIn: true,
        userId: user.uid,
        username: username.trim().toLowerCase(),
      });

      // Send welcome email in background (fire-and-forget, never blocks)
      emailjsService.sendWelcomeEmail(email.trim(), fullName.trim());
    } catch (e: any) {
      const msg = e?.message || e?.code || '';
      console.log('[SignUp Error]', msg, e);
      let errorMessage = 'Registration failed. Please try again.';
      if (msg === 'USERNAME_TAKEN') {
        errorMessage = 'That username is already taken. Please choose another.';
      } else if (msg.includes('email-already-in-use')) {
        errorMessage = 'An account with this email already exists. Try signing in.';
      } else if (msg.includes('weak-password')) {
        errorMessage = 'Password is too weak. Use at least 6 characters.';
      }
      set({ isLoading: false, error: errorMessage });
    }
  },

  signOut: async () => {
    try {
      await authService.signOut();
    } catch {}
    set({ isLoggedIn: false, userId: null, username: null, success: false });
  },

  clearState: () => {
    set({ isLoading: false, error: null, success: false });
  },

  initSession: () => {
    authService.onAuthStateChange(async (user) => {
      if (user) {
        const profile = await authService.getProfile(user.uid);
        set({
          isLoggedIn: true,
          userId: user.uid,
          username: profile?.username || null,
        });
      } else {
        set({ isLoggedIn: false, userId: null, username: null });
      }
    });
  },

  setLoggedIn: (loggedIn: boolean) => set({ isLoggedIn: loggedIn }),
}));
