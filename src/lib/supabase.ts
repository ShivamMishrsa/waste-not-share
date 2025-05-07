
import { createClient } from '@supabase/supabase-js';

// These will be replaced with environment variables when connected to Supabase
const supabaseUrl = 'https://your-supabase-url.supabase.co';
const supabaseAnonKey = 'your-anon-key';

// Create a single supabase client for the entire app
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
