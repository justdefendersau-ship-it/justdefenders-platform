/*
=====================================================
JLR Bulk Import API
Timestamp: 26 Feb 2026 00:10
=====================================================
*/

import { NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function POST(req: Request) {

  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: () => {}
      }
    }
  )

  const body = await req.json()

  for (const row of body.parts) {
    await supabase
      .from("jlr_master_parts")
      .upsert(row, { onConflict: "part_number" })
  }

  return NextResponse.json({ success: true })
}