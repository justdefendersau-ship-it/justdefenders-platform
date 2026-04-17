/*
=====================================================
FAILURE CORRELATION ENGINE (APP ROUTER SAFE)
Timestamp: 1 March 2026 15:45
=====================================================
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET() {

  const { data } = await supabase
    .from("maintenance_records")
    .select("category")

  if (!data)
    return NextResponse.json({})

  const grouped: Record<string, number> = {}

  data.forEach(r => {
    if (!grouped[r.category])
      grouped[r.category] = 0
    grouped[r.category]++
  })

  return NextResponse.json(grouped)
}
