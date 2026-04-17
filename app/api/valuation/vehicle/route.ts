// Timestamp 6 March 2026 19:35
// File: /app/api/valuation/vehicle/route.ts

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: Request) {

 const { searchParams } = new URL(req.url)

 const vin = searchParams.get("vin")

 const { data } = await supabase
   .from("vehicle_valuations")
   .select("*")
   .eq("vin", vin)
   .order("generated_at", { ascending: false })
   .limit(1)
   .single()

 return NextResponse.json({

   valuation: data

 })

}