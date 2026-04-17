// Timestamp: 14 March 2026 10:25
// Fleet Health Score API

import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabaseServer"

export async function GET() {

  const supabase = getSupabaseServerClient()

  const { data } = await supabase
    .from("vehicles")
    .select("health_score")

  if (!data || data.length === 0) {
    return NextResponse.json({
      score: 0,
      healthy: 0,
      warning: 0,
      critical: 0
    })
  }

  let healthy = 0
  let warning = 0
  let critical = 0

  data.forEach((v: any) => {

    const score = v.health_score || 0

    if (score >= 80) healthy++
    else if (score >= 60) warning++
    else critical++

  })

  const total = data.reduce((sum: number, v: any) => sum + (v.health_score || 0), 0)
  const score = Math.round(total / data.length)

  return NextResponse.json({
    score,
    healthy,
    warning,
    critical
  })

}