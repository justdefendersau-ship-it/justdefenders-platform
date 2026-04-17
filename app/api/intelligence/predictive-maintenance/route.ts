/*
Timestamp: 6 March 2026 01:15
File: app/api/intelligence/predictive-maintenance/route.ts

Purpose
-------
Predictive maintenance engine.

Analyzes fleet failure data and generates alerts
for vehicles that are statistically likely to fail soon.

Used by:
Fleet Intelligence Command Center
VIN Reliability Dashboard
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

type Alert = {
  vin:string
  component:string
  predicted_risk:number
  severity:string
}

export async function GET(){

  try{

    const { data, error } = await supabase
      .from("fleet_part_failures")
      .select("vin,part_name")

    if(error){

      console.error("Predictive maintenance query error:",error)

      return NextResponse.json([])

    }

    const vinParts:Record<string,Record<string,number>> = {}

    data?.forEach((row:any)=>{

      if(!vinParts[row.vin]){

        vinParts[row.vin] = {}

      }

      vinParts[row.vin][row.part_name] =
        (vinParts[row.vin][row.part_name] || 0) + 1

    })

    const alerts:Alert[] = []

    Object.entries(vinParts).forEach(([vin,parts])=>{

      Object.entries(parts).forEach(([component,count])=>{

        if(count >= 2){

          const risk = Math.min(count * 20,100)

          let severity = "Low"

          if(risk > 40) severity = "Medium"
          if(risk > 70) severity = "High"

          alerts.push({

            vin,
            component,
            predicted_risk:risk,
            severity

          })

        }

      })

    })

    return NextResponse.json(alerts)

  }
  catch(err){

    console.error("Predictive maintenance engine error:",err)

    return NextResponse.json([])

  }

}