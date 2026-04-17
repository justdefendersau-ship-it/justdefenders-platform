// Timestamp: 14 March 2026 00:05
// Member Vehicles API

import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabaseServer"

export async function GET(){

  const supabase = getSupabaseServerClient()

  const { data } = await supabase
    .from("vehicles")
    .select("vin, model, year, engine, nickname")
    .limit(10)

  return NextResponse.json({
    vehicles:data || []
  })

}