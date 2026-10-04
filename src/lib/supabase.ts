// Supabase client configuration with safe initialization
import { createClient, SupabaseClient } from "@supabase/supabase-js";

function initSupabase(): SupabaseClient | null {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  // Guard against unconfigured or placeholder credentials
  if (
    !supabaseUrl ||
    !supabaseAnonKey ||
    supabaseUrl.includes("[") ||
    supabaseUrl.includes("YOUR-PROJECT-REF") ||
    supabaseAnonKey.includes("your-anon-key")
  ) {
    return null;
  }

  try {
    const parsed = new URL(supabaseUrl);
    if (!parsed.protocol.startsWith("http")) return null;
    return createClient(supabaseUrl, supabaseAnonKey);
  } catch {
    return null;
  }
}

export const supabase = initSupabase();
export const isSupabaseConfigured = Boolean(supabase !== null);
