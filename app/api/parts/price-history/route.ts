// Timestamp: 13 March 2026 21:35
// Price History API

import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabaseServer"

export async function GET(req: Request) {

  const supabase = getSupabaseServerClient()

  const { searchParams } = new URL(req.url)
  const part = searchParams.get("part")

  const { data } = await supabase
    .from("supplier_price_history")
    .select("price, created_at")
    .eq("part_number", part)
    .order("created_at", { ascending: false })
    .limit(30)

  return NextResponse.json({
    prices: data || []
  })

}