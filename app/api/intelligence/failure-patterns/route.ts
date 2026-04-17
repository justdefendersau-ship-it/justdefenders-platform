/*
Timestamp: 6 March 2026 00:45
File: app/api/intelligence/failure-patterns/route.ts

Purpose
-------
AI-style pattern detection for Defender failures.

Detects clusters based on:
• model
• part_name
• failure_type

Used by the Fleet Intelligence Command Center.
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

type Pattern = {
  model:string
  part_name:string
  failure_type:string
  count:number
}

export async function GET(){

  try{

    const { data, error } = await supabase
      .from("fleet_part_failures")
      .select("model,part_name,failure_type")

    if(error){

      console.error("Failure pattern query error:",error)

      return NextResponse.json([])

    }

    const patterns:Record<string,number> = {}

    data?.forEach((row:any)=>{

      const key =
        `${row.model}_${row.part_name}_${row.failure_type}`

      patterns[key] = (patterns[key] || 0) + 1

    })

    const results:Pattern[] =
      Object.entries(patterns)
        .filter(([_,count]) => count >= 4)
        .map(([key,count]) => {

          const [model,part_name,failure_type] =
            key.split("_")

          return {
            model,
            part_name,
            failure_type,
            count
          }

        })

    return NextResponse.json(results)

  }
  catch(err){

    console.error("Failure pattern engine error:",err)

    return NextResponse.json([])

  }

}