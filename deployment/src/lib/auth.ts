import { supabase } from '@/../../shared/supabase';
import { User, Session } from '@supabase/supabase-js';
import { apiClient } from './api';

export interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
}

export interface SignUpData {
  email: string;
  password: string;
  displayName?: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export const authService = {
  // Check if Supabase is configured
  isConfigured: () => Boolean(supabase),

  // Backend API auth methods (placeholder - not implemented yet)
  async backendSignUp({ email, password, displayName }: SignUpData) {
    // TODO: Implement backend registration
    console.log('Backend signup not implemented yet');
    return { data: null, error: null };
  },

  async backendSignIn({ email, password }: SignInData) {
    // TODO: Implement backend login
    console.log('Backend signin not implemented yet');
    return { data: null, error: null };
  },

  async backendSignOut() {
    // TODO: Implement backend logout
    console.log('Backend signout not implemented yet');
    return { data: null, error: null };
  },

  async backendGetProfile() {
    // TODO: Implement get profile
    console.log('Backend get profile not implemented yet');
    return { data: null, error: null };
  },

  async backendUpdateProfile(updates: { displayName?: string; avatar?: string }) {
    // TODO: Implement update profile
    console.log('Backend update profile not implemented yet');
    return { data: null, error: null };
  },

  // Video API methods (placeholder - not implemented yet)
  async getUserVideos() {
    // TODO: Implement get user videos
    console.log('Get user videos not implemented yet');
    return { data: [], error: null };
  },

  async createVideoJob(jobData: { audioUrl: string; imageUrl?: string; settings?: any }) {
    // TODO: Implement create video job
    console.log('Create video job not implemented yet');
    return { data: null, error: null };
  },

  async getVideoStatus(videoId: string) {
    // TODO: Implement get video status
    console.log('Get video status not implemented yet');
    return { data: null, error: null };
  },

  // Check if user is authenticated with backend (placeholder)
  isBackendAuthenticated: () => false,

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

  // Sign in with Google OAuth
  async signInWithGoogle() {
    if (!supabase) {
      return { 
        data: null, 
        error: { message: 'Supabase is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.' }
      };
    }

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`,
      }
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
  async resetPasswordForEmail(email: string) {
    if (!supabase) {
      return {
        data: null,
        error: { message: 'Supabase is not configured. Please check your environment variables.' }
      };
    }

    try {
      // Use the current domain or fallback to your production domain
      const currentDomain = typeof window !== 'undefined' ? window.location.origin : 'https://typebeatz.voodoo808.com';

      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${currentDomain}/auth/reset-complete`
      });

      if (error) {
        console.error('Password reset error:', error);
      }

      return { data, error };
    } catch (err) {
      console.error('Password reset service error:', err);
      return {
        data: null,
        error: { message: 'Failed to send recovery email. Please try again.' }
      };
    }
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