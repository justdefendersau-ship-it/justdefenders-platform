/*
Timestamp: 5 March 2026 10:30
File: app/api/risk/trend/route.ts

Purpose
-------
Returns fleet risk history for chart visualisation.
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET() {

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data, error } = await supabase
    .from("risk_history")
    .select("*")
    .order("created_at", { ascending: true })
    .limit(30)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)

}