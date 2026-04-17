// JustDefenders ©
// File: /lib/supabaseServer.ts
// Timestamp: 29 March 2026 21:18 (Sydney)
// PURPOSE: SUPABASE CLIENT (FINAL — NO SSR, NO COOKIES, NEXT 16 SAFE)

import { createClient } from "@supabase/supabase-js";

export function createSupabaseServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}