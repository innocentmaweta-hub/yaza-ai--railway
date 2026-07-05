import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseClient: SupabaseClient | null = null;
let initialized = false;

/**
 * Get or initialize the Supabase client.
 * Returns null if environment variables are not configured.
 * This allows the app to start even without Supabase credentials.
 */
export function getSupabaseClient(): SupabaseClient | null {
  if (initialized) {
    return supabaseClient;
  }

  initialized = true;

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
      '[Supabase] Missing configuration. SUPABASE_URL and SUPABASE_ANON_KEY must be set in environment variables. ' +
      'Database features will be unavailable until these are configured.'
    );
    return null;
  }

  try {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
    console.log('[Supabase] Client initialized successfully');
    return supabaseClient;
  } catch (error) {
    console.error('[Supabase] Failed to initialize client:', error);
    return null;
  }
}

/**
 * Alias for backward compatibility
 */
export const supabase = getSupabaseClient;
