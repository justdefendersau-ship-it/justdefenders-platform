// Timestamp: 4 March 2026 10:55
// Server-Side Auth + Role Enforcement (Admin Supported)

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
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { user: null, profile: null }
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  return { user, profile }
}

export async function requireRole(allowedRoles: string[]) {
  const { user, profile } = await getUserContext()

  if (!user || !profile) {
    redirect("/login")
  }

  // Admin bypass
  if (profile.role === "admin") {
    return { user, profile }
  }

  if (!allowedRoles.includes(profile.role)) {
    redirect("/")
  }

  return { user, profile }
}