/*
Timestamp: 8 March 2026 — 07:15
File: /app/api/analytics/reliability-timeline/route.ts

Purpose:
Return reliability timeline data for dashboard charts.

This safe version prevents crashes if database queries fail.
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(){

 try{

  const { data, error } = await supabase
   .from("maintenance_records")
   .select("created_at")

  if(error){

   console.error("Timeline query error:", error)

   return NextResponse.json([])

  }

  const timeline =
   data?.map(r=>({

    date: r.created_at?.split("T")[0],
    failures: 1

   })) || []

  return NextResponse.json(timeline)

 }catch(err){

  console.error("Timeline API crash:", err)

  return NextResponse.json([])

 }

}