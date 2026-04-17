// route.ts
// Timestamp: 10 March 2026 11:15
// Commentary:
// Returns fuel station locations for map visualisation.

import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(){

 const { data,error } = await supabase
  .from("fuel_logs")
  .select("station,price,latitude,longitude,date")

 if(error){
  return NextResponse.json({ error })
 }

 return NextResponse.json(data)

}