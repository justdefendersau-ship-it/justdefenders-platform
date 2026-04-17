/* Timestamp: 12 March 2026 22:10 */
/* Mobile Companion Diagnostic API */

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET() {

 const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
 )

 let dbStatus = "unknown"
 let vehicleCount = 0

 try {

  const { data, error } = await supabase
   .from("vehicles")
   .select("vin")

  if(error){
   dbStatus = "error"
  } else {
   dbStatus = "ok"
   vehicleCount = data?.length || 0
  }

 } catch(e) {

  dbStatus = "connection_failed"

 }

 return NextResponse.json({

  status:"mobile_diagnostic",

  database:dbStatus,

  vehicles:vehicleCount,

  timestamp:new Date().toISOString()

 })

}