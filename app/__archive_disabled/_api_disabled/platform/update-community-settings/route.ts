/*
Timestamp: 5 March 2026 12:30
File: app/api/platform/update-community-setting/route.ts

Purpose
-------
Updates user preference for community data sharing.
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(req: Request) {

  const body = await req.json()

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { community_data_opt_in } = body

  await supabase
    .from("profiles")
    .update({ community_data_opt_in })
    .eq("role", "admin") // simplified example

  return NextResponse.json({ success: true })

}