// Quick debug script to check environment variables
console.log('Environment Variables Debug:');
console.log('VITE_SUPABASE_URL:', process.env.VITE_SUPABASE_URL ? 'exists' : 'missing');
console.log('VITE_SUPABASE_ANON_KEY:', process.env.VITE_SUPABASE_ANON_KEY ? 'exists' : 'missing');

if (process.env.VITE_SUPABASE_URL) {
  console.log('URL preview:', process.env.VITE_SUPABASE_URL.substring(0, 30) + '...');
  console.log('URL starts with https:', process.env.VITE_SUPABASE_URL.startsWith('https://'));
}

if (process.env.VITE_SUPABASE_ANON_KEY) {
  console.log('Key preview:', process.env.VITE_SUPABASE_ANON_KEY.substring(0, 10) + '...');
  console.log('Key starts with eyJ:', process.env.VITE_SUPABASE_ANON_KEY.startsWith('eyJ'));
}