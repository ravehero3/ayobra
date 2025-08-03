import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { authService, AuthState } from '@/lib/auth';

interface AuthContextType extends AuthState {
  signUp: (email: string, password: string) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signInWithGoogle: () => Promise<any>;
  signOut: () => Promise<any>;
  resetPassword: (email: string) => Promise<any>;
  updatePassword: (newPassword: string) => Promise<any>;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only initialize if Supabase is configured
    if (!authService.isConfigured()) {
      setLoading(false);
      return;
    }

    // Get initial session
    authService.getSession().then(({ session }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = authService.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const refreshAuth = async () => {
    if (!authService.isConfigured()) return;
    const { session } = await authService.getSession();
    setSession(session);
    setUser(session?.user ?? null);
  };

  const value = {
    user,
    session,
    loading,
    signUp: async (email: string, password: string) => {
      return authService.signUp({ email, password });
    },
    signIn: async (email: string, password: string) => {
      return authService.signIn({ email, password });
    },
    signInWithGoogle: async () => {
      return authService.signInWithGoogle();
    },
    signOut: authService.signOut,
    resetPassword: async (email: string) => {
      return authService.resetPasswordForEmail(email);
    },
    updatePassword: async (newPassword: string) => {
      return authService.updatePassword(newPassword);
    },
    refreshAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}