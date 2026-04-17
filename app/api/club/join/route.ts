// Timestamp: 13 March 2026 21:05
// Join Club API

import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabaseServer"

export async function POST(req: Request) {

  const supabase = getSupabaseServerClient()

  const body = await req.json()

  const { user_id, club_id } = body

  await supabase
    .from("organization_members")
    .insert({
      user_id,
      organization_id: club_id,
      role: "member"
    })

  return NextResponse.json({
    success: true
  })

}