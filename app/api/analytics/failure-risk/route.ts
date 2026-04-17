// Timestamp: 14 March 2026 10:50
// Failure Risk Prediction API

import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabaseServer"

export async function GET() {

  const supabase = getSupabaseServerClient()

  const { data } = await supabase
    .from("vehicle_failure_predictions")
    .select(`
      vin,
      component,
      probability,
      vehicles (
        nickname,
        model
      )
    `)
    .order("probability", { ascending: false })
    .limit(5)

  const risks = (data || []).map((r: any) => ({

    vin: r.vin,
    component: r.component,
    risk: Math.round((r.probability || 0) * 100),
    vehicle: r.vehicles?.nickname || r.vehicles?.model || "Vehicle"

  }))

  return NextResponse.json({ risks })

}