/*
Timestamp: 8 March 2026 — 06:12
File: /app/components/RealtimeNotificationBridge.tsx

Purpose:
Realtime Notification Bridge

Subscribes to Supabase realtime events for the
command_center_notifications table so alerts
appear instantly across the platform.
*/

"use client"

import { useEffect } from "react"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function RealtimeNotificationBridge(){

 useEffect(()=>{

  const channel = supabase
   .channel("command-center-notifications")
   .on(
    "postgres_changes",
    {
     event: "INSERT",
     schema: "public",
     table: "command_center_notifications"
    },
    payload=>{

     console.log(
      "Realtime notification:",
      payload.new
     )

    }
   )
   .subscribe()

  return ()=>{

   supabase.removeChannel(channel)

  }

 },[])

 return null

}