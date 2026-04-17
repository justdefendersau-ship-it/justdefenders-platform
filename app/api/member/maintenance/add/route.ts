// route.ts
// Timestamp: 10 March 2026 12:25
// Commentary:
// Adds a maintenance record for a vehicle.

import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req:Request){

 const body = await req.json()

 const { error } = await supabase
  .from("maintenance_records")
  .insert(body)

 if(error){
  return NextResponse.json({ error })
 }

 return NextResponse.json({ success:true })

}