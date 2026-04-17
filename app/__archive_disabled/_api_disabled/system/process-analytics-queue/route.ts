// Timestamp 6 March 2026 16:08
// File: /app/api/system/process-analytics-queue/route.ts

/*
Incremental Analytics Worker

Processes queued analytics updates instead of scanning
entire datasets.

This dramatically reduces Supabase compute load.
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {

  try {

    const { data: jobs } = await supabase
      .from("analytics_refresh_queue")
      .select("*")
      .eq("processed", false)
      .limit(50)

    if (!jobs || jobs.length === 0) {

      return NextResponse.json({
        message: "No analytics jobs in queue"
      })

    }

    for (const job of jobs) {

      if (job.entity_type === "part") {

        const { data: part } = await supabase
          .from("part_failure_registry")
          .select("*")
          .eq("part_number", job.entity_id)
          .single()

        if (!part) continue

        const reliabilityScore = Math.max(
          0,
          100 - part.failure_rate * 100
        )

        await supabase
          .from("component_failure_stats")
          .upsert({

            component: part.part_name,
            total_failures: part.failure_count,
            vehicles_affected: part.vehicles_affected,
            avg_severity: part.failure_rate,
            last_calculated: new Date()

          })

      }

      await supabase
        .from("analytics_refresh_queue")
        .update({ processed: true })
        .eq("id", job.id)

    }

    return NextResponse.json({

      message: "Analytics queue processed",
      jobs_processed: jobs.length

    })

  } catch (err: any) {

    return NextResponse.json({
      error: err.message
    }, { status: 500 })

  }

}