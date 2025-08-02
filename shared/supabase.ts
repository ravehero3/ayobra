
import { createClient } from '@supabase/supabase-js'

// Get environment variables with proper fallbacks for client/server
const supabaseUrl = typeof window !== 'undefined' 
  ? import.meta.env.VITE_SUPABASE_URL || ''
  : process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || ''

const supabaseAnonKey = typeof window !== 'undefined'
  ? import.meta.env.VITE_SUPABASE_ANON_KEY || ''
  : process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || ''

// Create a fallback client if no credentials are provided
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null
