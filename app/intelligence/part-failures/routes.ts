/*
Timestamp: 5 March 2026 12:52
File: app/api/intelligence/part-failures/route.ts

Global Parts Failure Registry

Purpose
-------
Aggregates parts failures from maintenance records
across the fleet.
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET() {

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data } = await supabase
    .from("maintenance_predictions")
    .select("part_name,part_number")

  const counts: Record<string, number> = {}

  data?.forEach(r => {

    const key = r.part_number

    counts[key] = (counts[key] || 0) + 1

  })

  const results = Object.entries(counts).map(([part,count]) => ({

    partNumber: part,
    failures: count

  }))

  return NextResponse.json(results)

}