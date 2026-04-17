/*
Timestamp: 6 March 2026 00:20
Failure Cluster Detection API
Uses part_name instead of part_number.
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(){

  try{

    const { data, error } = await supabase
      .from("fleet_part_failures")
      .select("part_name,failure_type")

    if(error){

      console.error("Cluster query error:",error)
      return NextResponse.json([])

    }

    const clusters:Record<string,number> = {}

    data?.forEach((row:any)=>{

      const key = `${row.part_name}_${row.failure_type}`

      clusters[key] = (clusters[key] || 0) + 1

    })

    const results = Object.entries(clusters)
      .filter(([_,count]) => count >= 3)
      .map(([key,count]) => {

        const [part_name,failure_type] = key.split("_")

        return {

          part_name,
          failure_type,
          occurrences:count

        }

      })

    return NextResponse.json(results)

  }
  catch(err){

    console.error("Cluster engine error:",err)

    return NextResponse.json([])

  }

}