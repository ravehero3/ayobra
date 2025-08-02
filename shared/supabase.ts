
import { createClient } from '@supabase/supabase-js'

// Get environment variables with proper fallbacks for client/server
const supabaseUrl = typeof window !== 'undefined' 
  ? import.meta.env.VITE_SUPABASE_URL || ''
  : process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || ''

const supabaseAnonKey = typeof window !== 'undefined'
  ? import.meta.env.VITE_SUPABASE_ANON_KEY || ''
  : process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || ''

// Validate URL format
function isValidUrl(string: string): boolean {
  if (!string) return false;
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

// Create a fallback client if no credentials are provided or if URL is invalid
export const supabase = supabaseUrl && supabaseAnonKey && isValidUrl(supabaseUrl)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Debug logging for development
if (typeof window !== 'undefined' && import.meta.env.DEV) {
  console.log('Supabase Config:', {
    hasUrl: Boolean(supabaseUrl),
    hasKey: Boolean(supabaseAnonKey),
    isValidUrl: isValidUrl(supabaseUrl),
    urlPreview: supabaseUrl ? supabaseUrl.substring(0, 20) + '...' : 'not found'
  });
}
