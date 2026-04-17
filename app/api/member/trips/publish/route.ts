// route.ts
// Timestamp: 10 March 2026 16:50
// Commentary:
// Publishes a trip report to the community.

import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req:Request){

 const body = await req.json()

 const { error } = await supabase
  .from("trip_reports")
  .insert(body)

 if(error){
  return NextResponse.json({ error })
 }

 return NextResponse.json({ success:true })

}