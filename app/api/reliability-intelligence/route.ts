 ------------------------------------------------------
 File appapireliability-intelligenceroute.ts
 Timestamp 18 March 2026 0822
 JustDefenders ©

 Global Reliability Intelligence API
 Aggregates failure data into insights
 ------------------------------------------------------

import { NextResponse } from nextserver
import { createClient } from @supabasesupabase-js

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {

  const { data, error } = await supabase
    .from(community_failure_reports)
    .select(component)

  if (error) {
    return NextResponse.json({ error error.message }, { status 500 })
  }

  const counts Recordstring, number = {}

  data.forEach((row) = {

    const key = row.component  Unknown

    counts[key] = (counts[key]  0) + 1

  })

  const sorted = Object.entries(counts)
    .map(([component, count]) = ({ component, count }))
    .sort((a, b) = b.count - a.count)

  return NextResponse.json({
    total_failures data.length  0,
    top_components sorted.slice(0, 10)
  })

}