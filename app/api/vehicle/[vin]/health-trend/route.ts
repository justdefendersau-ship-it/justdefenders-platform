/* Timestamp: 12 March 2026 21:47 */
/* Vehicle Health Trend API */

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

 const { data, error } = await supabase
  .from("vehicle_health_history")
  .select("health_score, recorded_at")
  .eq("vin", vin)
  .order("recorded_at", { ascending: true })
  .limit(30)

 if (error) {
  return NextResponse.json(
   { error: error.message },
   { status: 500 }
  )
 }

 return NextResponse.json(data)

}