// route.ts
// Timestamp: 9 March 2026 22:00
// Commentary:
// Adds a part to My Shed directly from Parts Search results.

import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req:Request){

 const body = await req.json()

 const part = {
  part_name: body.part_name,
  part_number: body.part_number,
  quantity: 1,
  location: "Garage",
  notes: `Added from supplier ${body.supplier}`
 }

 const { error } = await supabase
  .from("my_shed_inventory")
  .insert(part)

 if(error){
  return NextResponse.json({ error })
 }

 return NextResponse.json({ success:true })

}