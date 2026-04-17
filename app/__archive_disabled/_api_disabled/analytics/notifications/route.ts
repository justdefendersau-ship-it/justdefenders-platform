/*
Timestamp: 7 March 2026 — 21:18
File: /app/api/analytics/notifications/route.ts

Purpose:
Provide notification feed for Command Center
and TopNav notification bell.
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
   .from("command_center_notifications")
   .select(`
    id,
    type,
    severity,
    message,
    vin,
    component,
    source,
    created_at,
    acknowledged
   `)
   .order("created_at",{ ascending:false })
   .limit(50)

  if(error){
   console.error("Notification feed error:",error)
   return NextResponse.json([])
  }

  return NextResponse.json(data || [])

 }catch(err){

  console.error("Notification API error:",err)

  return NextResponse.json([])

 }

}