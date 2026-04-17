// Timestamp 7 March 2026
// File: /app/api/system/build-materialized-intelligence/route.ts

/*
Materialized Intelligence Builder

Precomputes reliability analytics
for fast dashboard queries.
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

    if (components) {

      for (const c of components) {

        const reliability =
          100 - ((c.failure_rate || 0) * 100)

        await supabase
          .from("analytics.component_reliability")
          .upsert({

            part_number: c.part_number,

            failures: c.failure_count,

            vehicles_affected: c.vehicles_affected,

            failure_rate: c.failure_rate,

            reliability_score: reliability,

            last_updated: new Date()

          })

      }

    }

    const { data: suppliers } = await supabase
      .from("supplier_failure_stats")
      .select("*")

    if (suppliers) {

      for (const s of suppliers) {

        const reliability =
          100 - ((s.failure_rate || 0) * 100)

        await supabase
          .from("analytics.supplier_reliability")
          .upsert({

            supplier_id: s.supplier_id,

            total_failures: s.failure_count,

            failure_rate: s.failure_rate,

            reliability_score: reliability,

            last_updated: new Date()

          })

      }

    }

    const { data: fleets } = await supabase
      .from("materialized_fleet_health")
      .select("*")

    if (fleets) {

      for (const f of fleets) {

        await supabase
          .from("analytics.fleet_health")
          .upsert({

            organization_id: f.organization_id,

            fleet_size: f.fleet_size,

            fleet_risk_score: f.fleet_risk_score,

            predicted_failures: f.predicted_failures,

            reliability_score: 100 - f.fleet_risk_score,

            last_updated: new Date()

          })

      }

    }

    return NextResponse.json({

      message: "Materialized intelligence updated"

    })

  } catch (err: any) {

    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    )

  }

}