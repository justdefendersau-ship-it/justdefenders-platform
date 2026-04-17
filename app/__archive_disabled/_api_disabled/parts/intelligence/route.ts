// Timestamp: 13 March 2026 18:00
// Part Number Intelligence Graph API

import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabaseServer"

export async function GET(req: Request) {

  const supabase = getSupabaseServerClient()

  const { searchParams } = new URL(req.url)
  const part = searchParams.get("part")

  if (!part) {
    return NextResponse.json({ graph: null })
  }

  // OEM part
  const { data: oem } = await supabase
    .from("part_numbers")
    .select("*")
    .eq("part_number", part)
    .single()

  // supersessions
  const { data: superseded } = await supabase
    .from("part_supersessions")
    .select("*")
    .eq("old_part_number", part)

  // cross references
  const { data: cross } = await supabase
    .from("part_cross_reference")
    .select("*")
    .eq("part_number", part)

  // supplier mappings
  const { data: suppliers } = await supabase
    .from("supplier_part_mappings")
    .select(`
      supplier_id,
      supplier_part_number,
      suppliers(name)
    `)
    .eq("part_number", part)

  return NextResponse.json({
    graph: {
      oem,
      superseded,
      cross,
      suppliers
    }
  })
}