// route.ts
// Timestamp: 10 March 2026 12:30
// Commentary:
// Calculates upcoming service reminders.

import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(){

 const { data:services } = await supabase
  .from("defender_maintenance_schedule")
  .select("*")

 const { data:records } = await supabase
  .from("maintenance_records")
  .select("*")
  .order("odometer",{ ascending:false })

 const reminders = services?.map(s=>{

  const last = records?.find(r=>r.service_type === s.service_type)

  if(!last) return null

  return {

   service:s.service_type,
   due_km:last.odometer + s.interval_km

  }

 })

 return NextResponse.json(reminders)

}