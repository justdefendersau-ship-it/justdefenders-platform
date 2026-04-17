// ============================================================
// JustDefenders ©
// File: lib/supabase/server.ts
// Timestamp: 31-03-2026 14:40 (Sydney)
// Purpose: Fix Supabase SSR client for Next.js 16
// ============================================================

import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch {}
        },
        remove(name: string, options: any) {
          try {
            cookieStore.set({ name, value: "", ...options })
          } catch {}
        },
      },
    }
  )
}