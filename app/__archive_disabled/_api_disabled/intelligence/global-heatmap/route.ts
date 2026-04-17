/*
Timestamp: 6 March 2026 01:40
File: app/api/intelligence/global-heatmap/route.ts

Purpose
-------
Generates geographic reliability data for the
Global Defender Intelligence Heatmap.

Aggregates failures by region.

Used by:
Fleet Intelligence Command Center
Global Defender Intelligence Map
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

type RegionHeat = {
  region:string
  failures:number
}

export async function GET(){

  try{

    const { data, error } = await supabase
      .from("fleet_part_failures")
      .select("region")

    if(error){

      console.error("Heatmap query error:",error)

      return NextResponse.json([])

    }

    const regions:Record<string,number> = {}

    data?.forEach((row:any)=>{

      const region = row.region || "Unknown"

      regions[region] = (regions[region] || 0) + 1

    })

    const results:RegionHeat[] =
      Object.entries(regions).map(([region,count])=>({

        region,
        failures:count

      }))

    return NextResponse.json(results)

  }
  catch(err){

    console.error("Heatmap engine error:",err)

    return NextResponse.json([])

  }

}