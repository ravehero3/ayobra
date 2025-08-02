import { supabase } from '@/../../shared/supabase';
import { User, Session } from '@supabase/supabase-js';

export interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
}

export interface SignUpData {
  email: string;
  password: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export const authService = {
  // Check if Supabase is configured
  isConfigured: () => Boolean(supabase),

  // Sign up with email and password
  async signUp({ email, password }: SignUpData) {
    if (!supabase) {
      return { 
        data: null, 
        error: { message: 'Supabase is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.' }
      };
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    return { data, error };
  },

  // Sign in with email and password
  async signIn({ email, password }: SignInData) {
    if (!supabase) {
      return { 
        data: null, 
        error: { message: 'Supabase is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.' }
      };
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return { data, error };
  },

  // Sign out
  async signOut() {
    if (!supabase) {
      return { error: { message: 'Supabase is not configured' } };
    }

    const { error } = await supabase.auth.signOut();
    return { error };
  },

  // Get current session
  async getSession() {
    if (!supabase) {
      return { session: null, error: null };
    }

    const { data: { session }, error } = await supabase.auth.getSession();
    return { session, error };
  },

  // Set session (for email verification)
  async setSession({ access_token, refresh_token }: { access_token: string; refresh_token: string }) {
    if (!supabase) {
      return { 
        data: null, 
        error: { message: 'Supabase is not configured' }
      };
    }

    const { data, error } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });

    return { data, error };
  },

  // Get current user
  async getUser() {
    if (!supabase) {
      return { user: null, error: null };
    }

    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  },

  // Reset password - send reset email
  async resetPassword(email: string) {
    if (!supabase) {
      return { 
        data: null, 
        error: { message: 'Supabase is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.' }
      };
    }

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-complete`
    });

    return { data, error };
  },

  // Update password (called after user clicks reset link)
  async updatePassword(newPassword: string) {
    if (!supabase) {
      return { 
        data: null, 
        error: { message: 'Supabase is not configured' }
      };
    }

    const { data, error } = await supabase.auth.updateUser({
      password: newPassword
    });

    return { data, error };
  },

  // Listen to auth state changes
  onAuthStateChange(callback: (event: string, session: Session | null) => void) {
    if (!supabase) {
      // Return a dummy subscription object for when Supabase is not configured
      return { data: { subscription: { unsubscribe: () => {} } } };
    }

    return supabase.auth.onAuthStateChange(callback);
  }
};