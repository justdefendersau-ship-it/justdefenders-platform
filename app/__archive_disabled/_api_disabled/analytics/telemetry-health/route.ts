// Timestamp 7 March 2026 10:50
// Telemetry Health Analysis

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: Request) {

 const { searchParams } = new URL(req.url)
 const vehicle_id = searchParams.get("vehicle_id")

 const { data } = await supabase
  .from("vehicle_telemetry")
  .select("*")
  .eq("vehicle_id", vehicle_id)
  .order("timestamp", { ascending: false })
  .limit(100)

 const avgTemp =
  data?.reduce((a: any, b: any) => a + (b.engine_temp || 0), 0) /
  (data?.length || 1)

 return NextResponse.json({

  average_engine_temp: avgTemp,
  telemetry_samples: data?.length

 })

}