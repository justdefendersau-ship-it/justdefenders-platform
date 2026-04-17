// Timestamp 6 March 2026 17:32
// File: /app/api/system/build-failure-cascade-predictions/route.ts

/*
Failure Cascade Prediction Engine

Uses failure_relationships to determine which
components are likely to fail after another component fails.
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

type Relationship = {
  part_a: string
  part_b: string
  co_failure_count: number
  relationship_strength: number
}

/* -------------------------------------------------- */

export async function GET() {

  try {

    const { data: relationships } = await supabase
      .from("failure_relationships")
      .select("*")
      .gt("relationship_strength", 0.1)

    if (!relationships || relationships.length === 0) {

      return NextResponse.json({
        message: "No failure relationships available"
      })

    }

    const typedRelationships = relationships as Relationship[]

    const cascades: any[] = []

    for (const rel of typedRelationships) {

      const probability =
        rel.relationship_strength * 100

      cascades.push({

        source_part: rel.part_a,
        predicted_part: rel.part_b,
        cascade_probability: probability,
        relationship_strength: rel.relationship_strength

      })

      cascades.push({

        source_part: rel.part_b,
        predicted_part: rel.part_a,
        cascade_probability: probability,
        relationship_strength: rel.relationship_strength

      })

    }

    for (const cascade of cascades) {

      await supabase
        .from("failure_cascade_predictions")
        .upsert({

          source_part: cascade.source_part,
          predicted_part: cascade.predicted_part,
          cascade_probability: cascade.cascade_probability,
          relationship_strength: cascade.relationship_strength,
          last_calculated: new Date()

        })

    }

    return NextResponse.json({

      message: "Failure cascade predictions generated",

      cascades_created: cascades.length

    })

  } catch (err: any) {

    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    )

  }

}