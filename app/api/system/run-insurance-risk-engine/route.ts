// Timestamp 7 March 2026
// File: /app/api/system/run-insurance-risk-engine/route.ts

/*
Insurance Risk Scoring Engine

Calculates actuarial risk scores for vehicles,
fleets, components, and suppliers.
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {

  try {

    const { data: vehicles } = await supabase
      .from("vin_failure_predictions")
      .select("*")

    if (vehicles) {

      for (const v of vehicles) {

        const riskScore =
          (v.failure_probability || 0) * 100

        await supabase
          .from("insurance_vehicle_risk")
          .upsert({

            vin: v.vin,

            predicted_failure_probability:
              v.failure_probability,

            maintenance_risk:
              v.maintenance_risk || 0,

            reliability_score:
              100 - riskScore,

            insurance_risk_score: riskScore,

            updated_at: new Date()

          })

      }

    }

    const { data: fleets } = await supabase
      .from("materialized_fleet_health")
      .select("*")

    if (fleets) {

      for (const f of fleets) {

        const expectedFailures =
          (f.predicted_failures || 0)

        await supabase
          .from("insurance_fleet_risk")
          .upsert({

            organization_id: f.organization_id,

            fleet_size: f.fleet_size,

            average_failure_probability:
              f.fleet_risk_score / 100,

            fleet_risk_score: f.fleet_risk_score,

            expected_annual_failures:
              expectedFailures,

            updated_at: new Date()

          })

      }

    }

    const { data: components } = await supabase
      .from("component_failure_stats")
      .select("*")

    if (components) {

      for (const c of components) {

        const risk =
          (c.failure_rate || 0) * 100

        await supabase
          .from("insurance_component_risk")
          .upsert({

            part_number: c.part_number,

            failure_rate: c.failure_rate,

            reliability_score: 100 - risk,

            insurance_risk_score: risk,

            updated_at: new Date()

          })

      }

    }

    const { data: suppliers } = await supabase
      .from("supplier_failure_stats")
      .select("*")

    if (suppliers) {

      for (const s of suppliers) {

        const risk =
          (s.failure_rate || 0) * 100

        await supabase
          .from("insurance_supplier_risk")
          .upsert({

            supplier_id: s.supplier_id,

            failure_rate: s.failure_rate,

            reliability_score: 100 - risk,

            supplier_risk_score: risk,

            updated_at: new Date()

          })

      }

    }

    return NextResponse.json({

      message: "Insurance risk scores calculated"

    })

  } catch (err: any) {

    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    )

  }

}