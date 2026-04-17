"use client"

/*
Timestamp: 9 March 2026 — 03:05
Realtime Reliability Event Stream
*/

import { useEffect } from "react"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(

 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

)

export default function RealtimeEventStream(){

 useEffect(()=>{

  const channel = supabase

   .channel("reliability-events")

   .on(
    "postgres_changes",
    {
     event:"*",
     schema:"public"
    },

    async (payload)=>{

     await fetch("/api/realtime/event-processor",{

      method:"POST",

      headers:{
       "Content-Type":"application/json"
      },

      body:JSON.stringify({
       table:payload.table,
       type:payload.eventType,
       data:payload.new
      })

     })

    }

   )

   .subscribe()

  return ()=>{

   supabase.removeChannel(channel)

  }

 },[])

 return null

}