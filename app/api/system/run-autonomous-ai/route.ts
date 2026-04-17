// Timestamp 7 March 2026
// File: /app/api/system/run-autonomous-ai/route.ts

/*
Autonomous Reliability AI

Continuously analyzes platform intelligence
and generates reliability insights.
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {

  try {

    const { data: anomalies } = await supabase
      .from("reliability_anomalies")
      .select("*")

    if (anomalies) {

      for (const a of anomalies) {

        if (a.severity > 70) {

          await supabase
            .from("ai_reliability_insights")
            .insert({

              insight_type: "failure_spike",

              entity: a.entity_id,

              severity: a.severity,

              description:
                `Severe reliability anomaly detected for ${a.entity_id}`

            })

        }

      }

    }

    const { data: suppliers } = await supabase
      .from("supplier_failure_stats")
      .select("*")

    if (suppliers) {

      for (const s of suppliers) {

        if (s.failure_rate > 0.12) {

          await supabase
            .from("ai_reliability_insights")
            .insert({

              insight_type: "supplier_risk",

              entity: s.supplier_id,

              severity: s.failure_rate * 100,

              description:
                `Supplier reliability risk detected: ${s.supplier_id}`

            })

        }

      }

    }

    const { data: demand } = await supabase
      .from("market_demand_forecasts")
      .select("*")

    if (demand) {

      for (const d of demand) {

        if (d.demand_score > 80) {

          await supabase
            .from("ai_reliability_insights")
            .insert({

              insight_type: "parts_demand_spike",

              entity: d.part_number,

              severity: d.demand_score,

              description:
                `Demand spike detected for ${d.part_number}`

            })

        }

      }

    }

    return NextResponse.json({

      message: "Autonomous AI analysis completed"

    })

  } catch (err: any) {

    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    )

  }

}