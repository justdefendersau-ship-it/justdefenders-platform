// Timestamp: 6 March 2026 — 13:52
// File: /app/api/system/build-intelligence-tables/route.ts

/*
JustDefenders Intelligence Aggregation Engine
TypeScript-safe version

Builds precomputed analytics tables for fast dashboards.
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

/* -------------------------------------------------- */
/* Type Definitions                                   */
/* -------------------------------------------------- */

type FailureRow = {
  vin: string
  part_number: string
  severity: number
  organization_id: string
}

type PartRegistry = {
  part_number: string
  supplier: string
  component: string
}

type SupplierAgg = {
  supplier: string
  total_failures: number
  vehicles: Set<string>
  severity_total: number
}

type ComponentAgg = {
  component: string
  total_failures: number
  vehicles: Set<string>
  severity_total: number
}

type VinAgg = {
  vin: string
  total_failures: number
  high_severity_failures: number
}

type FleetAgg = {
  organization_id: string
  total_failures: number
}

/* -------------------------------------------------- */

export async function GET() {

  try {

    console.log("Building intelligence tables")

    /* --------------------------------------------- */
    /* Load base datasets                            */
    /* --------------------------------------------- */

    const { data: failures } = await supabase
      .from("fleet_part_failures")
      .select("vin, part_number, severity, organization_id")

    const { data: registry } = await supabase
      .from("jlr_part_registry")
      .select("part_number, supplier, component")

    const partLookup: Record<string, PartRegistry> = {}

    registry?.forEach((p: any) => {
      partLookup[p.part_number] = p
    })

    /* --------------------------------------------- */
    /* Aggregation structures                        */
    /* --------------------------------------------- */

    const supplierStats: Record<string, SupplierAgg> = {}
    const componentStats: Record<string, ComponentAgg> = {}
    const vinStats: Record<string, VinAgg> = {}
    const fleetStats: Record<string, FleetAgg> = {}

    /* --------------------------------------------- */
    /* Aggregate metrics                             */
    /* --------------------------------------------- */

    failures?.forEach((f: FailureRow) => {

      const part = partLookup[f.part_number]
      if (!part) return

      const supplier = part.supplier
      const component = part.component
      const vin = f.vin
      const org = f.organization_id

      /* Supplier */

      if (!supplierStats[supplier]) {
        supplierStats[supplier] = {
          supplier,
          total_failures: 0,
          vehicles: new Set(),
          severity_total: 0
        }
      }

      supplierStats[supplier].total_failures++
      supplierStats[supplier].vehicles.add(vin)
      supplierStats[supplier].severity_total += f.severity || 1

      /* Component */

      if (!componentStats[component]) {
        componentStats[component] = {
          component,
          total_failures: 0,
          vehicles: new Set(),
          severity_total: 0
        }
      }

      componentStats[component].total_failures++
      componentStats[component].vehicles.add(vin)
      componentStats[component].severity_total += f.severity || 1

      /* VIN */

      if (!vinStats[vin]) {
        vinStats[vin] = {
          vin,
          total_failures: 0,
          high_severity_failures: 0
        }
      }

      vinStats[vin].total_failures++

      if (f.severity >= 4) {
        vinStats[vin].high_severity_failures++
      }

      /* Fleet */

      if (!fleetStats[org]) {
        fleetStats[org] = {
          organization_id: org,
          total_failures: 0
        }
      }

      fleetStats[org].total_failures++

    })

    /* --------------------------------------------- */
    /* Store supplier stats                          */
    /* --------------------------------------------- */

    for (const s of Object.values(supplierStats) as SupplierAgg[]) {

      const vehicles = s.vehicles.size
      const avgSeverity = s.severity_total / s.total_failures

      const reliabilityScore = Math.round(
        100 * (1 - Math.min(s.total_failures / 100, 1))
      )

      await supabase.from("supplier_failure_stats").upsert({

        supplier: s.supplier,
        total_failures: s.total_failures,
        vehicles_affected: vehicles,
        avg_severity: avgSeverity,
        reliability_score: reliabilityScore,
        last_calculated: new Date()

      })

    }

    /* --------------------------------------------- */
    /* Store component stats                         */
    /* --------------------------------------------- */

    for (const c of Object.values(componentStats) as ComponentAgg[]) {

      const vehicles = c.vehicles.size
      const avgSeverity = c.severity_total / c.total_failures

      await supabase.from("component_failure_stats").upsert({

        component: c.component,
        total_failures: c.total_failures,
        vehicles_affected: vehicles,
        avg_severity: avgSeverity,
        last_calculated: new Date()

      })

    }

    /* --------------------------------------------- */
    /* Store VIN stats                               */
    /* --------------------------------------------- */

    for (const v of Object.values(vinStats) as VinAgg[]) {

      const reliabilityScore = Math.max(
        0,
        100 - (v.total_failures * 5 + v.high_severity_failures * 10)
      )

      await supabase.from("vin_failure_stats").upsert({

        vin: v.vin,
        total_failures: v.total_failures,
        high_severity_failures: v.high_severity_failures,
        reliability_score: reliabilityScore,
        last_calculated: new Date()

      })

    }

    /* --------------------------------------------- */
    /* Store fleet stats                             */
    /* --------------------------------------------- */

    for (const f of Object.values(fleetStats) as FleetAgg[]) {

      const fleetRisk = Math.min(100, f.total_failures * 2)

      await supabase.from("fleet_failure_stats").upsert({

        organization_id: f.organization_id,
        total_failures: f.total_failures,
        fleet_risk_score: fleetRisk,
        last_calculated: new Date()

      })

    }

    /* --------------------------------------------- */

    return NextResponse.json({

      message: "Intelligence tables built successfully",

      suppliers_processed: Object.keys(supplierStats).length,
      components_processed: Object.keys(componentStats).length,
      vins_processed: Object.keys(vinStats).length,
      fleets_processed: Object.keys(fleetStats).length

    })

  } catch (err: any) {

    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    )

  }

}