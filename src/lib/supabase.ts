import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client (no NEXT_PUBLIC_ prefix — keep key out of client bundle).
 * Reads published contents for Writings / Recent Work sections.
 *
 * Fails gracefully: returns null if env vars missing so SSR doesn't crash
 * on Vercel preview deploys without env set.
 */
export function getSupabase(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) {
    console.warn(
      "[josh-lifeforge] SUPABASE_URL or SUPABASE_ANON_KEY not set — Writings section will show empty state.",
    );
    return null;
  }
  return createClient(url, key, { auth: { persistSession: false } });
}

export type ContentRow = {
  id: string;
  title: string;
  body: string | null;
  tags: string[] | null;
  published_at: string | null;
};
