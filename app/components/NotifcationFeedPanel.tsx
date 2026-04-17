/*
Timestamp: 8 March 2026 — 06:05
File: /app/components/RealtimeNotificationBridge.tsx

Purpose:
Realtime notification bridge.

Subscribes to Supabase realtime events on the
command_center_notifications table and logs or
dispatches incoming notifications.

This allows dashboards to update instantly when
autonomous agents or analytics engines create alerts.
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
   .channel("realtime-command-center-notifications")
   .on(
    "postgres_changes",
    {
     event: "INSERT",
     schema: "public",
     table: "command_center_notifications"
    },
    (payload)=>{

     console.log(
      "Realtime notification received:",
      payload.new
     )

     // future improvement:
     // dispatch to notification state store
     // or trigger toast alerts

    }
   )
   .subscribe()

  return ()=>{

   supabase.removeChannel(channel)

  }

 },[])

 return null

}