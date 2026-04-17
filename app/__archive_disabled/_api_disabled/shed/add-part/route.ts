// Timestamp 7 March 2026 10:15
// Add Part to My Shed

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {

 const body = await req.json()

 const {
  organization_id,
  vehicle_id,
  vin,
  part_number,
  part_name,
  quantity,
  purchase_price,
  location
 } = body

 const { data } = await supabase
  .from("my_shed_parts")
  .insert({
   organization_id,
   vehicle_id,
   vin,
   part_number,
   part_name,
   quantity,
   purchase_price,
   location
  })
  .select()

 return NextResponse.json({
  status: "part_added",
  part: data
 })

}