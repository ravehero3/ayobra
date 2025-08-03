import { useUser, useAuth as useClerkAuth } from '@clerk/clerk-react';

export function useAuth() {
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
}