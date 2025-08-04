import { useUser, useAuth as useClerkAuth } from '@clerk/clerk-react';

export function useAuth() {
  // Check if we have CLERK_PUBLISHABLE_KEY to determine if Clerk is available
  const hasClerkKey = !!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  
  try {
    if (!hasClerkKey) {
      // Return mock values when Clerk is not configured
      return {
        user: null,
        session: null,
        loading: false,
        signUp: null,
        signIn: null,
        signInWithGoogle: null,
        signOut: () => Promise.resolve(),
        resetPassword: null,
        updatePassword: null,
        refreshAuth: () => Promise.resolve(),
      };
    }

    const { user, isLoaded } = useUser();
    const { signOut } = useClerkAuth();

    return {
      user: user,
      session: null, // Clerk handles sessions internally
      loading: !isLoaded,
      signUp: null, // Handled by Clerk components
      signIn: null, // Handled by Clerk components
      signInWithGoogle: null, // Handled by Clerk components
      signOut: signOut,
      resetPassword: null, // Handled by Clerk components
      updatePassword: null, // Handled by Clerk components
      refreshAuth: () => Promise.resolve(),
    };
  } catch (error) {
    // Fallback if Clerk hooks fail (e.g., when outside provider)
    console.warn('Clerk hooks not available, falling back to mock auth');
    return {
      user: null,
      session: null,
      loading: false,
      signUp: null,
      signIn: null,
      signInWithGoogle: null,
      signOut: () => Promise.resolve(),
      resetPassword: null,
      updatePassword: null,
      refreshAuth: () => Promise.resolve(),
    };
  }
}