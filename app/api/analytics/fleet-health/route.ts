// Timestamp: 13 March 2026 23:25
// Fleet Health API

import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabaseServer"

export async function GET() {

  const supabase = getSupabaseServerClient()

  const { data } = await supabase
    .from("vehicles")
    .select("health_score")

  let healthy = 0
  let warning = 0
  let critical = 0

  data?.forEach((v: any) => {

    if (v.health_score >= 80) healthy++
    else if (v.health_score >= 50) warning++
    else critical++

  })

  return NextResponse.json({
    healthy,
    warning,
    critical
  })

}