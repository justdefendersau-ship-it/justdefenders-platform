// Timestamp 6 March 2026 18:42
// File: /app/api/system/build-global-reliability-intelligence/route.ts

/*
Global Defender Reliability Intelligence Engine

Detects emerging reliability issues across
the Defender ecosystem.
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

/* -------------------------------------------------- */
/* Types                                              */
/* -------------------------------------------------- */

type FailurePart = {
  part_number: string
  part_name: string
  failure_count: number
  vehicles_affected: number
  failure_rate: number
}

/* -------------------------------------------------- */

export async function GET() {

  try {

    const { data: parts } = await supabase
      .from("part_failure_registry")
      .select("*")

    if (!parts || parts.length === 0) {

      return NextResponse.json({
        message: "No reliability data available"
      })

    }

    const typedParts = parts as FailurePart[]

    const signals: any[] = []

    for (const part of typedParts) {

      if (part.failure_rate > 0.2) {

        signals.push({

          signal_type: "high_failure_rate",

          entity: part.part_number,

          signal_strength: part.failure_rate * 100,

          trend_direction: "increasing"

        })

      }

      if (part.failure_count > 50) {

        signals.push({

          signal_type: "high_failure_volume",

          entity: part.part_number,

          signal_strength: part.failure_count,

          trend_direction: "stable"

        })

      }

    }

    for (const signal of signals) {

      await supabase
        .from("global_reliability_signals")
        .upsert({

          signal_type: signal.signal_type,

          entity: signal.entity,

          signal_strength: signal.signal_strength,

          trend_direction: signal.trend_direction,

          detected_at: new Date()

        })

    }

    return NextResponse.json({

      message: "Global reliability intelligence generated",

      signals_detected: signals.length

    })

  } catch (err: any) {

    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    )

  }

}