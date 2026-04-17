// Timestamp: 13 March 2026 18:50
// Defender Intelligence Feed API

import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabaseServer"

export async function GET() {

  const supabase = getSupabaseServerClient()

  const events: any[] = []

  // Failure reports
  const { data: failures } = await supabase
    .from("community_failure_reports")
    .select("component, created_at")
    .limit(10)

  failures?.forEach((f: any) => {
    events.push({
      type: "failure",
      message: `${f.component} failure reported`,
      time: f.created_at
    })
  })

  // Maintenance logs
  const { data: maintenance } = await supabase
    .from("maintenance_records")
    .select("description, created_at")
    .limit(10)

  maintenance?.forEach((m: any) => {
    events.push({
      type: "maintenance",
      message: `Maintenance logged – ${m.description}`,
      time: m.created_at
    })
  })

  // Supplier price updates
  const { data: prices } = await supabase
    .from("supplier_price_history")
    .select("part_number_id, price, created_at")
    .limit(10)

  prices?.forEach((p: any) => {
    events.push({
      type: "price",
      message: `Price update for part ${p.part_number_id}`,
      time: p.created_at
    })
  })

  // Forum activity
  const { data: posts } = await supabase
    .from("forum_posts")
    .select("title, created_at")
    .limit(10)

  posts?.forEach((p: any) => {
    events.push({
      type: "forum",
      message: `Forum: ${p.title}`,
      time: p.created_at
    })
  })

  // Sort newest first
  events.sort((a, b) =>
    new Date(b.time).getTime() - new Date(a.time).getTime()
  )

  return NextResponse.json({ events: events.slice(0, 20) })

}