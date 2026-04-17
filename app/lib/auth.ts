// Timestamp: 4 March 2026 23:10
// Authentication helpers (Next.js 16 compatible)

import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function getUserContext() {
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set() {},
        remove() {}
      }
    }
  )

  const { data } = await supabase.auth.getUser()

  if (!data?.user) {
    return { user: null, profile: null }
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", data.user.id)
    .single()

  return { user: data.user, profile }
}

export async function requireRole(roles: string[]) {
  const { user, profile } = await getUserContext()

  if (!user) {
    redirect("/login")
  }

  if (!profile || !roles.includes(profile.role)) {
    redirect("/dashboard")
  }

  return { user, profile }
}