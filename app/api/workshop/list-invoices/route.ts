// Timestamp 7 March 2026 07:10
// List invoices for vehicle

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req:Request){

 const { searchParams } = new URL(req.url)

 const vehicle_id = searchParams.get("vehicle_id")

 const { data } =
 await supabase
  .from("workshop_invoices")
  .select("*")
  .eq("vehicle_id",vehicle_id)
  .order("invoice_date",{ascending:false})

 return NextResponse.json({

  invoices:data

 })

}