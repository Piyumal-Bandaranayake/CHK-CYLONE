import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || 'placeholder-key';

if (!supabaseUrl || supabaseAnonKey === 'placeholder-key') {
  console.warn('Supabase URL or Anon Key is missing in environment variables. Using placeholder values.');
}

export const supabase = createClient(
  supabaseUrl.startsWith('http') ? supabaseUrl : 'https://placeholder.supabase.co', 
  supabaseAnonKey
);
