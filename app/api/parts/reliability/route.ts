// Timestamp: 13 March 2026 18:25
// Parts Reliability API

import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabaseServer"

export async function GET(req: Request) {

  const supabase = getSupabaseServerClient()

  const { searchParams } = new URL(req.url)
  const part = searchParams.get("part")

  if (!part) {
    return NextResponse.json({ reliability: null })
  }

  // failures
  const { data: failures } = await supabase
    .from("part_failure_registry")
    .select("*")
    .eq("part_number", part)

  // installs
  const { data: installs } = await supabase
    .from("job_parts")
    .select("*")
    .eq("part_number", part)

  const failureCount = failures?.length || 0
  const installCount = installs?.length || 1

  const failureRate = failureCount / installCount

  const reliabilityScore = Math.max(
    0,
    10 - failureRate * 10
  )

  return NextResponse.json({
    reliability: {
      part,
      installs: installCount,
      failures: failureCount,
      failureRate,
      score: reliabilityScore.toFixed(2)
    }
  })

}