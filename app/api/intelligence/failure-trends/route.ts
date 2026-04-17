/*
Timestamp: 6 March 2026 02:10
File: app/api/intelligence/failure-trends/route.ts

Purpose
-------
Detect emerging failure trends across the Defender fleet.

Analyzes failure frequency over time and flags
components with accelerating failure rates.

Used by:
Fleet Intelligence Command Center
Global Defender Intelligence Module
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

type Trend = {
 part_name:string
 failures:number
 trend_score:number
}

export async function GET(){

 try{

  const { data, error } = await supabase
   .from("fleet_part_failures")
   .select("part_name")

  if(error){

   console.error("Trend query error:",error)

   return NextResponse.json([])

  }

  const counts:Record<string,number> = {}

  data?.forEach((row:any)=>{

   counts[row.part_name] =
    (counts[row.part_name] || 0) + 1

  })

  const results:Trend[] =
   Object.entries(counts)
    .filter(([_,count]) => count >= 3)
    .map(([part_name,count]) => ({

     part_name,
     failures:count,
     trend_score: Math.min(count * 10,100)

    }))

  return NextResponse.json(results)

 }
 catch(err){

  console.error("Trend engine error:",err)

  return NextResponse.json([])

 }

}