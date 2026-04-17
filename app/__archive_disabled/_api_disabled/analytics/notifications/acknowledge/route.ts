/*
Timestamp: 7 March 2026 — 21:36
File: /app/api/analytics/notifications/acknowledge/route.ts

Purpose:
Allow command center users to acknowledge notifications.
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req:Request){

 try{

  const body = await req.json()

  const { id, user } = body

  await supabase
   .from("command_center_notifications")
   .update({

    acknowledged: true,
    acknowledged_by: user || "operator",
    acknowledged_at: new Date()

   })
   .eq("id",id)

  return NextResponse.json({ success:true })

 }catch(err){

  console.error("Notification acknowledge error:",err)

  return NextResponse.json({ success:false })

 }

}