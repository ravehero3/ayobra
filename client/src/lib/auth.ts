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

  // Get current user
  async getUser() {
    if (!supabase) {
      return { user: null, error: null };
    }

    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
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