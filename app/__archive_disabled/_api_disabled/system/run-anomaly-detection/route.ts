// Timestamp 7 March 2026 00:40
// File: /app/api/system/run-anomaly-detection/route.ts

/*
Automated Reliability Anomaly Detection Engine

Detects abnormal reliability patterns across
components, suppliers, and fleets.
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
}

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

    let anomaliesDetected = 0

    for (const c of components as ComponentStat[]) {

      if (c.failure_rate > 0.3) {

        const severity =
          Math.min(1, c.failure_rate)

        const score =
          c.failure_rate * 100

        await supabase
          .from("reliability_anomalies")
          .insert({

            anomaly_type: "failure_spike",

            entity_type: "component",

            entity_id: c.part_number,

            severity: severity,

            anomaly_score: score,

            description:
              `Failure spike detected for component ${c.part_number}`,

            detected_at: new Date()

          })

        anomaliesDetected++

      }

    }

    const { data: suppliers } = await supabase
      .from("supplier_failure_stats")
      .select("*")

    if (suppliers) {

      for (const s of suppliers) {

        if (s.failure_rate > 0.25) {

          await supabase
            .from("reliability_anomalies")
            .insert({

              anomaly_type: "supplier_degradation",

              entity_type: "supplier",

              entity_id: s.supplier_id,

              severity: s.failure_rate,

              anomaly_score: s.failure_rate * 100,

              description:
                `Supplier reliability degradation detected for supplier ${s.supplier_id}`,

              detected_at: new Date()

            })

          anomaliesDetected++

        }

      }

    }

    const { data: fleets } = await supabase
      .from("materialized_fleet_health")
      .select("*")

    if (fleets) {

      for (const f of fleets) {

        if (f.fleet_risk_score > 30) {

          await supabase
            .from("reliability_anomalies")
            .insert({

              anomaly_type: "fleet_risk_spike",

              entity_type: "fleet",

              entity_id: f.organization_id,

              severity: f.fleet_risk_score / 100,

              anomaly_score: f.fleet_risk_score,

              description:
                `Fleet reliability risk spike detected for organization ${f.organization_id}`,

              detected_at: new Date()

            })

          anomaliesDetected++

        }

      }

    }

    return NextResponse.json({

      message: "Anomaly detection complete",
      anomalies_detected: anomaliesDetected

    })

  } catch (err: any) {

    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    )

  }

}