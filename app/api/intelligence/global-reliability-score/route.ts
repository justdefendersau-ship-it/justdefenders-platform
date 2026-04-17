/*
Timestamp: 5 March 2026 22:05
File: app/api/intelligence/global-reliability-score/route.ts

Purpose
-------
Compute the Defender Global Reliability Score.

This API aggregates vehicle failure signals and returns
a reliability metric used by the analytics dashboard.
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(){

  try{

    const { data:vehicles } =
      await supabase
        .from("vehicles")
        .select("id")

    const { data:alerts } =
      await supabase
        .from("risk_alerts")
        .select("vehicle_id")

    const vehicleCount = vehicles?.length || 1
    const failureCount = alerts?.length || 0

    const failureRate =
      Math.round((failureCount / vehicleCount) * 100)

    const score =
      Math.max(100 - failureRate, 60)

    return NextResponse.json({

      score:Math.round(score),
      vehicles:vehicleCount,
      failures:failureCount

    })

  }
  catch(err){

    console.error("Global reliability score error:",err)

    return NextResponse.json(
      { error:"Failed to calculate score" },
      { status:500 }
    )

  }

}