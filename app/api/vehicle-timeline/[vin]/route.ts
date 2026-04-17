// ------------------------------------------------------
// File: app/api/vehicle-timeline/[vin]/route.ts
// Timestamp: 18 March 2026 00:28
// JustDefenders ©
//
// Vehicle Service + Reliability + Prediction Timeline
// ------------------------------------------------------

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(
  request: Request,
  { params }: { params: { vin: string } }
) {

  const vin = params.vin

  const { data: fuel } = await supabase
    .from("fuel_logs")
    .select("date, litres")
    .eq("vin", vin)

  const { data: maintenance } = await supabase
    .from("maintenance_records")
    .select("service_date, description")
    .eq("vin", vin)

  const { data: failures } = await supabase
    .from("community_failure_reports")
    .select("report_date, title")
    .eq("vin", vin)

  const { data: health } = await supabase
    .from("vehicle_health_history")
    .select("recorded_at, health_score")
    .eq("vin", vin)

  const { data: predictions } = await supabase
    .from("failure_predictions")
    .select("prediction_date, component, probability")
    .eq("vin", vin)

  const timeline: any[] = []

  fuel?.forEach(f => {
    timeline.push({
      date: f.date,
      type: "fuel",
      title: "Fuel Log",
      description: `${f.litres}L Diesel`
    })
  })

  maintenance?.forEach(m => {
    timeline.push({
      date: m.service_date,
      type: "maintenance",
      title: "Maintenance",
      description: m.description
    })
  })

  failures?.forEach(f => {
    timeline.push({
      date: f.report_date,
      type: "failure",
      title: "Failure",
      description: f.title
    })
  })

  health?.forEach(h => {
    timeline.push({
      date: h.recorded_at,
      type: "health",
      title: "Health Score Update",
      description: `Vehicle health score ${h.health_score}`
    })
  })

  predictions?.forEach(p => {
    timeline.push({
      date: p.prediction_date,
      type: "prediction",
      title: "Predicted Failure Risk",
      description: `${p.component} risk ${(p.probability * 100).toFixed(0)}%`
    })
  })

  timeline.sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return NextResponse.json(timeline)

}