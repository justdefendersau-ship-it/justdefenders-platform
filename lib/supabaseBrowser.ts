// =====================================================
// JustDefenders ©
// File: /lib/supabaseBrowser.ts
// Timestamp: 22 March 2026 17:10 (Sydney)
// Purpose: Supabase browser client
// =====================================================

import { createClient } from "@supabase/supabase-js";

export function createBrowserSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}