import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"

export async function requireAuth() {

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          Authorization: `Bearer ${cookies().get("sb-access-token")?.value}`
        }
      }
    }
  )

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  return { supabase, user }
}