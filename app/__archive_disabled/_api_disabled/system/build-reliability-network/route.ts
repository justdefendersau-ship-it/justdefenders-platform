// Timestamp 7 March 2026
// File: /app/api/system/build-reliability-network/route.ts

/*
Reliability Data Network Engine

Aggregates anonymized fleet data into
global reliability benchmarks.
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {

  try {

    const { data: components } = await supabase
      .from("component_failure_stats")
      .select("*")

    if (!components) {

      return NextResponse.json({
        message: "No component data"
      })

    }

    for (const c of components) {

      const industryFailureRate =
        (c.failure_rate || 0)

      const benchmarkScore =
        100 - (industryFailureRate * 100)

      await supabase
        .from("global_reliability_benchmarks")
        .upsert({

          component: c.part_number,

          industry_failure_rate:
            industryFailureRate,

          benchmark_score:
            benchmarkScore,

          sample_size:
            c.vehicles_affected || 0,

          last_updated: new Date()

        })

      if (industryFailureRate > 0.15) {

        await supabase
          .from("network_reliability_signals")
          .insert({

            component: c.part_number,

            signal_type: "industry_failure_spike",

            severity:
              industryFailureRate * 100,

            description:
              `Industry-wide failure spike detected for ${c.part_number}`

          })

      }

    }

    return NextResponse.json({

      message: "Reliability network updated"

    })

  } catch (err: any) {

    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    )

  }

}