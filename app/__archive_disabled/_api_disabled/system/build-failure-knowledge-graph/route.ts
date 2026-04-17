// Timestamp 6 March 2026 17:05
// File: /app/api/system/build-failure-knowledge-graph/route.ts

/*
Optimised Defender Failure Knowledge Graph Engine

Graph optimisation strategy:
1. Select statistically significant failure components
2. Limit graph nodes
3. Compute relationships only among relevant components

This reduces compute from O(n²) across all parts
to O(n²) across only relevant components.
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
  id: string
  part_number: string
  part_name: string
  failure_count: number
  vehicles_affected: number
  failure_rate: number
}

type Relationship = {
  part_a: string
  part_b: string
  co_failure_count: number
  relationship_strength: number
}

/* -------------------------------------------------- */

export async function GET() {

  try {

    /*
    STEP 1
    Load statistically relevant parts only
    */

    const { data: parts } = await supabase
      .from("part_failure_registry")
      .select("*")
      .gt("failure_count", 3)        // ignore rare failures
      .order("failure_count", { ascending: false })
      .limit(200)                   // graph node limit

    if (!parts || parts.length === 0) {

      return NextResponse.json({
        message: "No significant failure data available"
      })

    }

    const typedParts = parts as FailurePart[]

    /*
    STEP 2
    Build relationship graph
    */

    const relationships: Record<string, Relationship> = {}

    for (let i = 0; i < typedParts.length; i++) {

      for (let j = i + 1; j < typedParts.length; j++) {

        const partA = typedParts[i]
        const partB = typedParts[j]

        const key = `${partA.part_number}_${partB.part_number}`

        const coFailures =
          Math.min(partA.failure_count, partB.failure_count)

        const strength =
          coFailures /
          Math.max(partA.failure_count, partB.failure_count)

        if (strength < 0.05) continue

        relationships[key] = {

          part_a: partA.part_number,
          part_b: partB.part_number,
          co_failure_count: coFailures,
          relationship_strength: strength

        }

      }

    }

    /*
    STEP 3
    Store graph relationships
    */

    const values = Object.values(relationships) as Relationship[]

    for (const r of values) {

      await supabase
        .from("failure_relationships")
        .upsert({

          part_a: r.part_a,
          part_b: r.part_b,
          co_failure_count: r.co_failure_count,
          relationship_strength: r.relationship_strength,
          last_calculated: new Date()

        })

    }

    return NextResponse.json({

      message: "Optimised failure knowledge graph built",

      nodes: typedParts.length,
      relationships_created: values.length

    })

  } catch (err: any) {

    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    )

  }

}