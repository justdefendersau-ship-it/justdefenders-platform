// Timestamp 7 March 2026 10:15
// Move Part Between Vehicles

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {

 const body = await req.json()

 const { part_id, new_vehicle_id } = body

 await supabase
  .from("my_shed_parts")
  .update({ vehicle_id: new_vehicle_id })
  .eq("id", part_id)

 await supabase
  .from("shed_movements")
  .insert({
   part_id,
   movement_type: "vehicle_transfer",
   to_vehicle: new_vehicle_id
  })

 return NextResponse.json({
  status: "part_moved"
 })

}