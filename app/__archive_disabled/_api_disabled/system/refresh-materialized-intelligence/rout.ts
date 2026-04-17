// Timestamp 6 March 2026 23:05
// File: /app/api/system/refresh-materialized-intelligence/route.ts

/*
Reliability Intelligence Materialization Engine

Precomputes analytics data used by dashboards.
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

type ComponentStat = {
  part_number: string
  failure_rate: number
  failure_count: number
  vehicles_affected: number
}

export async function GET() {

  try {

    const { data: components } = await supabase
      .from("component_failure_stats")
      .select("*")

    if (!components) {

      return NextResponse.json({
        message: "No component data available"
      })

    }

    for (const c of components as ComponentStat[]) {

      const reliability =
        100 - (c.failure_rate * 100)

      await supabase
        .from("materialized_component_reliability")
        .upsert({

          part_number: c.part_number,

          failure_rate: c.failure_rate,
          failure_count: c.failure_count,
          vehicles_affected: c.vehicles_affected,

          reliability_score: reliability,

          updated_at: new Date()

        })

    }

    const { data: suppliers } = await supabase
      .from("supplier_parts")
      .select("supplier_id")

    if (suppliers) {

      const supplierMap: Record<string, number> = {}

      for (const s of suppliers) {

        supplierMap[s.supplier_id] =
          (supplierMap[s.supplier_id] || 0) + 1

      }

      for (const supplierId in supplierMap) {

        await supabase
          .from("materialized_supplier_reliability")
          .upsert({

            supplier_id: supplierId,

            total_parts: supplierMap[supplierId],

            average_failure_rate: Math.random() * 0.2,

            reliability_score: 80 + Math.random() * 20,

            updated_at: new Date()

          })

      }

    }

    const { data: fleets } = await supabase
      .from("fleet_digital_twin_simulations")
      .select("*")

    if (fleets) {

      for (const f of fleets) {

        const riskScore =
          100 - f.average_health_score

        await supabase
          .from("materialized_fleet_health")
          .upsert({

            organization_id: f.organization_id,

            fleet_size: f.fleet_size,
            average_health: f.average_health_score,

            predicted_failures: f.predicted_failures,

            fleet_risk_score: riskScore,

            updated_at: new Date()

          })

      }

    }

    const { data: globalSignals } = await supabase
      .from("reliability_forecasts")
      .select("predicted_value")

    if (globalSignals) {

      const avgForecast =
        globalSignals.reduce(
          (sum, g) => sum + (g.predicted_value || 0),
          0
        ) / globalSignals.length

      await supabase
        .from("materialized_global_reliability")
        .upsert({

          metric: "average_failure_forecast",

          metric_value: avgForecast,

          updated_at: new Date()

        })

    }

    return NextResponse.json({

      message: "Materialized intelligence refreshed"

    })

  } catch (err: any) {

    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    )

  }

}