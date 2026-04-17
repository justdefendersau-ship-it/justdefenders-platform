// Timestamp 7 March 2026 02:05
// File: /app/api/ai/vehicle-twin/route.ts

/*
Vehicle Digital Twin Query Engine
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req:Request){

 const { searchParams } = new URL(req.url)

 const vin = searchParams.get("vin")

 const { data } =
 await supabase
  .from("vehicle_digital_twins")
  .select("*")
  .eq("vin",vin)
  .single()

 return NextResponse.json(data)

}