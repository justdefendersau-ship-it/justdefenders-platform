// Timestamp 7 March 2026 07:10
// Move invoice to another vehicle

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase=createClient(
 process.env.SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req:Request){

 const body = await req.json()

 const { invoice_id,new_vehicle_id,new_vin } = body

 await supabase
  .from("workshop_invoices")
  .update({

   vehicle_id:new_vehicle_id,
   vin:new_vin

  })
  .eq("id",invoice_id)

 return NextResponse.json({

  status:"invoice_moved"

 })

}