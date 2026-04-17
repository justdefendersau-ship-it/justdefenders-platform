/*
Timestamp: 6 March 2026 02:15
File: app/api/intelligence/reliability-timeline/route.ts

Purpose
-------
Generate time-series reliability data for the
Global Defender Intelligence Dashboard.

Aggregates failures by month.
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

type Timeline = {
 month:string
 failures:number
}

export async function GET(){

 try{

  const { data, error } = await supabase
   .from("fleet_part_failures")
   .select("created_at")

  if(error){

   console.error("Timeline query error:",error)

   return NextResponse.json([])

  }

  const months:Record<string,number> = {}

  data?.forEach((row:any)=>{

   const month =
    new Date(row.created_at)
     .toISOString()
     .slice(0,7)

   months[month] = (months[month] || 0) + 1

  })

  const results:Timeline[] =
   Object.entries(months)
    .map(([month,count]) => ({

     month,
     failures:count

    }))
    .sort((a,b)=> a.month.localeCompare(b.month))

  return NextResponse.json(results)

 }
 catch(err){

  console.error("Timeline engine error:",err)

  return NextResponse.json([])

 }

}