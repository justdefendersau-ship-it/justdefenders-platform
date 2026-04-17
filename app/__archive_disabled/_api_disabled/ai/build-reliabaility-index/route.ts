// Timestamp 6 March 2026 16:20
// File: /app/api/ai/build-reliability-index/route.ts

/*
Global Defender Reliability Index Engine
Compatible with existing schema
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

function calculateScore(rate: number) {

  return Math.max(0, 100 - (rate * 100))

}

export async function POST() {

  const { data: components } = await supabase
    .from("component_failure_stats")
    .select("*")

  const { data: suppliers } = await supabase
    .from("supplier_failure_stats")
    .select("*")

  const inserts = []

  if (components) {

    for (const c of components) {

      const rate = c.failure_rate ?? 0
      const score = calculateScore(rate)

      inserts.push({

        entity_type: "component",
        entity_id: c.part_number,
        reliability_score: score,
        failure_rate: rate,
        vehicles_observed: c.vehicles_affected,
        confidence: Math.min(1, (c.vehicles_affected ?? 0) / 100),
        updated_at: new Date()

      })

    }

  }

  if (suppliers) {

    for (const s of suppliers) {

      const rate = s.failure_rate ?? 0
      const score = calculateScore(rate)

      inserts.push({

        entity_type: "supplier",
        entity_id: s.supplier_id,
        reliability_score: score,
        failure_rate: rate,
        vehicles_observed: s.vehicles_affected,
        confidence: Math.min(1, (s.vehicles_affected ?? 0) / 100),
        updated_at: new Date()

      })

    }

  }

  if (inserts.length > 0) {

    await supabase
      .from("defender_reliability_index")
      .insert(inserts)

  }

  return NextResponse.json({

    entries_generated: inserts.length

  })

}