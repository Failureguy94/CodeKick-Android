import { supabase } from './supabase';
import { Profile } from '../types';
import { buildEmail } from '../utils/helpers';

// ─── Auth Service — mirrors AuthRepository.kt ──────────────────────────────

export const authService = {
  /**
   * Sign up with username-based email trick.
   * Mirrors AuthRepository.signUp()
   */
  async signUp(username: string, fullName: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email: buildEmail(username),
      password,
      options: {
        data: {
          username: username.trim(),
          full_name: fullName,
        },
      },
    });
    if (error) throw error;
    return data;
  },

  /**
   * Sign in with username-based email.
   * Mirrors AuthRepository.signIn()
   */
  async signIn(username: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: buildEmail(username),
      password,
    });
    if (error) throw error;
    return data;
  },

  /**
   * Sign out.
   * Mirrors AuthRepository.signOut()
   */
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  /**
   * Get current user session.
   */
  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  /**
   * Get profile from profiles table.
   * Mirrors AuthRepository.getProfile()
   */
  async getProfile(userId: string): Promise<Profile | null> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      if (error) return null;
      return data as Profile;
    } catch {
      return null;
    }
  },

  /**
   * Listen for auth state changes.
   * Mirrors sessionStatus flow in AuthViewModel.kt
   */
  onAuthStateChange(callback: (isLoggedIn: boolean) => void) {
    return supabase.auth.onAuthStateChange((event, session) => {
      callback(!!session);
    });
  },
};
