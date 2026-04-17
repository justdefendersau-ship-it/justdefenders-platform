// Timestamp 7 March 2026 00:05
// File: /app/api/ai/autonomous-controller/route.ts

/*
Autonomous Reliability AI Controller

Runs scheduled intelligence tasks
to keep reliability models updated.
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function log(task:string,status:string,details:string){

 await supabase
  .from("autonomous_ai_activity")
  .insert({

   task,
   status,
   details

  })

}

export async function POST(){

 try{

  // Rebuild reliability index
  await fetch(
   process.env.NEXT_PUBLIC_BASE_URL +
   "/api/ai/build-reliability-index",
   { method:"POST" }
  )

  await log(
   "rebuild_reliability_index",
   "success",
   "Reliability index updated"
  )


  // Rebuild demand forecasts
  await fetch(
   process.env.NEXT_PUBLIC_BASE_URL +
   "/api/ai/demand-forecast",
   {
    method:"POST",
    headers:{
     "Content-Type":"application/json"
    },
    body: JSON.stringify({

     horizon_days:180

    })
   }
  )

  await log(
   "demand_forecast_update",
   "success",
   "Demand forecasts regenerated"
  )


  // Detect alerts
  await fetch(
   process.env.NEXT_PUBLIC_BASE_URL +
   "/api/system/detect-alerts",
   { method:"POST" }
  )

  await log(
   "alert_detection",
   "success",
   "Alert detection executed"
  )


  return NextResponse.json({

   message:"Autonomous AI cycle completed"

  })

 }catch(e:any){

  await log(
   "autonomous_cycle",
   "error",
   e.message
  )

  return NextResponse.json({

   error:e.message

  })

 }

}