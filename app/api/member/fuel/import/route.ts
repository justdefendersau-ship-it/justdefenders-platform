// route.ts
// Timestamp: 10 March 2026 10:40
// Commentary:
// Imports fuel log CSV rows into fuel_logs table.

import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req:Request){

 const body = await req.json()

 const rows = body.rows

 const { error } = await supabase
  .from("fuel_logs")
  .insert(rows)

 if(error){
  return NextResponse.json({ error })
 }

 return NextResponse.json({ success:true })

}