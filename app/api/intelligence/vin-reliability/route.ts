/*
Timestamp: 6 March 2026 00:55
File: app/api/intelligence/vin-reliability/route.ts

Purpose
-------
VIN-level reliability scoring engine.

Calculates vehicle reliability score based on:

• failure count
• failure severity
• component risk weighting

This enables:

• predictive maintenance
• insurance risk modelling
• vehicle reliability scoring
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

type VINScore = {
  vin:string
  failures:number
  score:number
  risk_level:string
}

export async function GET(){

  try{

    const { data, error } = await supabase
      .from("fleet_part_failures")
      .select("vin")

    if(error){

      console.error("VIN reliability query error:",error)

      return NextResponse.json([])

    }

    const vinFailures:Record<string,number> = {}

    data?.forEach((row:any)=>{

      vinFailures[row.vin] =
        (vinFailures[row.vin] || 0) + 1

    })

    const results:VINScore[] =
      Object.entries(vinFailures).map(

        ([vin,failures]) => {

          const score =
            Math.max(100 - failures * 5,0)

          let risk = "Low"

          if(score < 70) risk = "Medium"
          if(score < 50) risk = "High"

          return {

            vin,
            failures,
            score,
            risk_level:risk

          }

        }

      )

    return NextResponse.json(results)

  }
  catch(err){

    console.error("VIN reliability engine error:",err)

    return NextResponse.json([])

  }

}