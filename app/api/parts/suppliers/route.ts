// Timestamp: 13 March 2026 21:35
// Supplier Intelligence API

import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabaseServer"

export async function GET(req: Request) {

  const supabase = getSupabaseServerClient()

  const { searchParams } = new URL(req.url)
  const part = searchParams.get("part")

  if (!part) {
    return NextResponse.json({ suppliers: [] })
  }

  const { data } = await supabase
    .from("supplier_parts")
    .select(`
      price,
      currency,
      supplier_part_number,
      suppliers(
        id,
        name
      )
    `)
    .eq("supplier_part_number", part)

  return NextResponse.json({
    suppliers: data || []
  })

}