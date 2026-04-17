/*
Timestamp: 5 March 2026 19:45
File: app/api/intelligence/failure-heatmap/route.ts

Purpose
-------
Calculate regional Defender reliability scores.

Output Example
--------------
[
  { region:"UK", failures:14, vehicles:120, reliability:88 },
  { region:"USA", failures:9, vehicles:75, reliability:91 }
]

This powers the Global Failure Heatmap.
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(){

  try{

    const { data:vehicles } = await supabase
      .from("vehicles")
      .select("id, country")

    const { data:failures } = await supabase
      .from("risk_alerts")
      .select("vehicle_id")

    if(!vehicles) return NextResponse.json([])

    const regionMap:any = {}

    vehicles.forEach(v=>{

      if(!regionMap[v.country]){

        regionMap[v.country] = {
          region:v.country,
          vehicles:0,
          failures:0
        }

      }

      regionMap[v.country].vehicles++

    })

    failures?.forEach(f=>{

      const vehicle = vehicles.find(v=>v.id===f.vehicle_id)

      if(vehicle && regionMap[vehicle.country]){

        regionMap[vehicle.country].failures++

      }

    })

    const result = Object.values(regionMap).map((r:any)=>({

      ...r,

      reliability:
        r.vehicles === 0
        ? 100
        : Math.round(100 - (r.failures / r.vehicles)*100)

    }))

    return NextResponse.json(result)

  }
  catch(err){

    console.error(err)

    return NextResponse.json({error:"heatmap failed"},{status:500})

  }

}