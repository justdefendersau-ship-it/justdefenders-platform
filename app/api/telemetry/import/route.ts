// Timestamp 7 March 2026 10:50
// OBD Telemetry Import

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {

 const body = await req.json()

 await supabase
  .from("vehicle_telemetry")
  .insert(body)

 return NextResponse.json({
  status: "telemetry_imported"
 })

}