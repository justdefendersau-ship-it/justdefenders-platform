// Timestamp 7 March 2026 07:10
// Invoice Import API

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req:Request){

 const body = await req.json()

 const {
  vehicle_id,
  vin,
  workshop_name,
  invoice_number,
  invoice_date,
  items,
  total_amount
 } = body

 const { data: invoice } =
 await supabase
  .from("workshop_invoices")
  .insert({
   vehicle_id,
   vin,
   workshop_name,
   invoice_number,
   invoice_date,
   total_amount
  })
  .select()
  .single()

 if(items && items.length){

  const invoiceItems = items.map((i:any)=>({

   invoice_id:invoice.id,
   part_number:i.part_number,
   description:i.description,
   quantity:i.quantity,
   unit_price:i.unit_price,
   line_total:i.quantity * i.unit_price,
   item_type:i.item_type

  }))

  await supabase
   .from("workshop_invoice_items")
   .insert(invoiceItems)

 }

 return NextResponse.json({

  invoice_id:invoice.id,
  status:"invoice_imported"

 })

}