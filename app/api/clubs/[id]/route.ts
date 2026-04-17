// Timestamp: 13 March 2026 21:05
// Club Data API

import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabaseServer"

export async function GET(req: Request, { params }: any) {

  const supabase = getSupabaseServerClient()

  const clubId = params.id

  const { data: club } = await supabase
    .from("organizations")
    .select("*")
    .eq("id", clubId)
    .single()

  const { data: vehicles } = await supabase
    .from("vehicles")
    .select("*")
    .eq("organization_id", clubId)

  return NextResponse.json({
    club,
    vehicles
  })

}