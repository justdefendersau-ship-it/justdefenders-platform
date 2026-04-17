// Timestamp 7 March 2026 07:10
// Delete invoice

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase=createClient(
 process.env.SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req:Request){

 const body = await req.json()

 const { invoice_id } = body

 await supabase
  .from("workshop_invoice_items")
  .delete()
  .eq("invoice_id",invoice_id)

 await supabase
  .from("workshop_invoices")
  .delete()
  .eq("id",invoice_id)

 return NextResponse.json({

  status:"invoice_deleted"

 })

}