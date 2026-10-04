// Supabase client configuration with safe initialization
import { createClient, SupabaseClient } from "@supabase/supabase-js";

function initSupabase(): SupabaseClient | null {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || "";
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

  // Guard against unconfigured or placeholder credentials
  if (
    !supabaseUrl ||
    supabaseUrl.includes("[") ||
    supabaseUrl.includes("YOUR-PROJECT-REF")
  ) {
    return null;
  }

  // On the server, prioritize SUPABASE_SERVICE_ROLE_KEY for administrative read/write bypass of RLS
  const isServer = typeof window === "undefined";
  const keyToUse =
    isServer && supabaseServiceKey && !supabaseServiceKey.includes("YOUR-SERVICE-ROLE-KEY") && !supabaseServiceKey.includes("your-service-role-key")
      ? supabaseServiceKey
      : supabaseAnonKey;

  if (!keyToUse || keyToUse.includes("YOUR-ANON-KEY") || keyToUse.includes("your-anon-key")) {
    return null;
  }

  try {
    const parsed = new URL(supabaseUrl);
    if (!parsed.protocol.startsWith("http")) return null;
    return createClient(supabaseUrl, keyToUse, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  } catch {
    return null;
  }
}

export const supabase = initSupabase();
export const isSupabaseConfigured = Boolean(supabase !== null);
