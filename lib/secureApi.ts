// Timestamp: 1 March 2026 17:35
// Secure API helper for protected App Router endpoints

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function requireAuth(request: Request) {
  const authHeader = request.headers.get("authorization")

  if (!authHeader) {
    return {
      error: NextResponse.json(
        { error: "Missing authorization header" },
        { status: 401 }
      )
    }
  }

  const token = authHeader.replace("Bearer ", "")

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const {
    data: { user },
    error
  } = await supabase.auth.getUser(token)

  if (error || !user) {
    return {
      error: NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }
  }

  return { user }
}