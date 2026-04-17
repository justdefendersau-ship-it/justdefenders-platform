// route.ts
// Timestamp: 9 March 2026 22:12
// Commentary:
// API returning reliability alerts.

import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(){

 const { data,error } = await supabase
  .from("reliability_alerts")
  .select("*")
  .order("created_at",{ ascending:false })
  .limit(20)

 if(error){
  return NextResponse.json({ error })
 }

 return NextResponse.json(data)

}