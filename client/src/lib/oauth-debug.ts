// OAuth debugging utilities
import { supabase } from '@/../../shared/supabase';

export const debugOAuth = {
  // Check current configuration
  checkConfig: () => {
    const config = {
      supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
      hasSupabaseKey: Boolean(import.meta.env.VITE_SUPABASE_ANON_KEY),
      currentUrl: window.location.href,
      origin: window.location.origin,
      hostname: window.location.hostname,
      protocol: window.location.protocol,
      supabaseClient: Boolean(supabase),
    };
    
    console.log('OAuth Configuration:', config);
    return config;
  },

  // Test OAuth providers
  testProviders: async () => {
    if (!supabase) {
      console.error('Supabase not configured');
      return false;
    }

    try {
      // This will show available providers
      console.log('Testing OAuth providers...');
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        }
      });

      if (error) {
        console.error('OAuth test error:', error);
        return false;
      }

      console.log('OAuth test successful:', data);
      return true;
    } catch (err) {
      console.error('OAuth test exception:', err);
      return false;
    }
  },

  // Check common OAuth issues
  diagnose: () => {
    const issues = [];
    
    // Check environment variables
    if (!import.meta.env.VITE_SUPABASE_URL) {
      issues.push('Missing VITE_SUPABASE_URL environment variable');
    }
    
    if (!import.meta.env.VITE_SUPABASE_ANON_KEY) {
      issues.push('Missing VITE_SUPABASE_ANON_KEY environment variable');
    }

    // Check URL format
    const url = import.meta.env.VITE_SUPABASE_URL;
    if (url && !url.startsWith('https://')) {
      issues.push('Supabase URL should start with https://');
    }

    // Check if running on localhost
    if (window.location.hostname === 'localhost' && window.location.protocol !== 'https:') {
      issues.push('OAuth may require HTTPS in production. Testing on localhost should work.');
    }

    // Check for common redirect issues
    if (window.location.search.includes('error=')) {
      const urlParams = new URLSearchParams(window.location.search);
      const error = urlParams.get('error');
      const errorDescription = urlParams.get('error_description');
      issues.push(`OAuth callback error: ${error} - ${errorDescription}`);
    }

    console.log('OAuth Diagnosis:', issues.length === 0 ? 'No issues found' : issues);
    return issues;
  }
};

// Auto-run diagnosis in development
if (import.meta.env.DEV && typeof window !== 'undefined') {
  setTimeout(() => {
    debugOAuth.checkConfig();
    debugOAuth.diagnose();
  }, 1000);
}