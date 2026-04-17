// Timestamp: 6 March 2026 — 13:24
// File: /app/api/analytics/supplier-heatmap/route.ts

/*
Supplier Failure Heatmap Engine

Creates a matrix showing:

Supplier vs Component Failures

This powers the analytics dashboard heatmap.

Data source:
fleet_part_failures
jlr_part_registry

Output format:
{
 supplier: "Bosch",
 component: "Turbocharger",
 failures: 18
}
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {

  try {

    // ------------------------------------------
    // Load failures
    // ------------------------------------------

    const { data: failures } = await supabase
      .from("fleet_part_failures")
      .select(`
        part_number
      `)

    // ------------------------------------------
    // Load registry
    // ------------------------------------------

    const { data: parts } = await supabase
      .from("jlr_part_registry")
      .select(`
        part_number,
        supplier,
        component
      `)

    const registry: Record<string, any> = {}

    parts?.forEach(p => {
      registry[p.part_number] = p
    })

    // ------------------------------------------
    // Build heatmap
    // ------------------------------------------

    const heatmap: Record<string, Record<string, number>> = {}

    failures?.forEach(f => {

      const part = registry[f.part_number]

      if (!part) return

      const supplier = part.supplier
      const component = part.component

      if (!heatmap[supplier]) {
        heatmap[supplier] = {}
      }

      if (!heatmap[supplier][component]) {
        heatmap[supplier][component] = 0
      }

      heatmap[supplier][component] += 1

    })

    // Flatten for frontend

    const rows: any[] = []

    Object.entries(heatmap).forEach(([supplier, components]) => {

      Object.entries(components).forEach(([component, count]) => {

        rows.push({
          supplier,
          component,
          failures: count
        })

      })

    })

    return NextResponse.json({
      heatmap: rows
    })

  } catch (err: any) {

    return NextResponse.json({
      error: err.message
    }, { status: 500 })

  }

}