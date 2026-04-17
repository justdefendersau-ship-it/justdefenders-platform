// route.ts
// Timestamp: 10 March 2026 18:45
// Commentary:
// Returns route markers for community expedition map.

import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(){

 const { data,error } = await supabase
  .from("trip_reports")
  .select("id,title,trip_id")

 if(error){
  return NextResponse.json({ error })
 }

 const routes = data.map(r => ({
  id:r.id,
  title:r.title,
  latitude:-25,
  longitude:133
 }))

 return NextResponse.json(routes)

}