import { create } from 'zustand';
import { authService } from '../services/auth';
import { supabase } from '../services/supabase';
import { validateUsername } from '../utils/helpers';

// ─── Auth Store — mirrors AuthViewModel.kt ──────────────────────────────────

interface AuthState {
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
  success: boolean;
  phoneVerified: boolean;
  userId: string | null;

  signIn: (username: string, password: string) => Promise<void>;
  signUp: (username: string, fullName: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  clearState: () => void;
  initSession: () => Promise<void>;
  setLoggedIn: (loggedIn: boolean) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isLoggedIn: false,
  isLoading: false,
  error: null,
  success: false,
  phoneVerified: false,
  userId: null,

  signIn: async (username: string, password: string) => {
    if (!validateUsername(username)) {
      set({ error: 'Username must be 3+ chars, letters/numbers/underscores only' });
      return;
    }
    set({ isLoading: true, error: null });
    try {
      await authService.signIn(username.trim(), password);
      const user = await authService.getCurrentUser();
      const profile = user ? await authService.getProfile(user.id) : null;
      set({
        isLoading: false,
        success: true,
        isLoggedIn: true,
        userId: user?.id || null,
        phoneVerified: profile?.phone_verified ?? false,
      });
    } catch (e: any) {
      set({
        isLoading: false,
        error: 'Invalid credentials. Please try again.',
      });
    }
  },

  signUp: async (username: string, fullName: string, password: string) => {
    if (!validateUsername(username)) {
      set({ error: 'Username must be 3+ chars, letters/numbers/underscores only' });
      return;
    }
    set({ isLoading: true, error: null });
    try {
      await authService.signUp(username.trim(), fullName, password);
      const user = await authService.getCurrentUser();
      const profile = user ? await authService.getProfile(user.id) : null;
      set({
        isLoading: false,
        success: true,
        isLoggedIn: true,
        userId: user?.id || null,
        phoneVerified: profile?.phone_verified ?? false,
      });
    } catch (e: any) {
      const msg = e?.message || '';
      const errorMessage =
        msg.includes('already registered') || msg.includes('duplicate') || msg.includes('unique')
          ? 'Username is already taken. Please choose another.'
          : 'Registration failed. Please try again.';
      set({ isLoading: false, error: errorMessage });
    }
  },

  signOut: async () => {
    try {
      await authService.signOut();
      set({ isLoggedIn: false, userId: null, success: false });
    } catch {}
  },

  clearState: () => {
    set({ isLoading: false, error: null, success: false, phoneVerified: false });
  },

  initSession: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        set({ isLoggedIn: true, userId: session.user.id });
      }
    } catch {}
  },

  setLoggedIn: (loggedIn: boolean) => set({ isLoggedIn: loggedIn }),
}));
