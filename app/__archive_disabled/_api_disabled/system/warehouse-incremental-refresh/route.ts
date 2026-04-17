// Timestamp 7 March 2026 04:40
// Incremental Warehouse Refresh Engine

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase=createClient(
 process.env.SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(){

 const { data: updatedComponents } =
 await supabase
  .from("component_failure_stats")
  .select("*")
  .gte("last_updated",
       new Date(Date.now()-3600000).toISOString())

 const updates:any[]=[]

 for(const c of updatedComponents ?? []){

  updates.push({

   part_number:c.part_number,
   failure_count:c.failure_count,
   vehicles_affected:c.vehicles_affected,
   failure_rate:c.failure_rate

  })

 }

 if(updates.length){

  await supabase
   .schema("reliability_dw")
   .from("fact_failures")
   .upsert(updates,{
    onConflict:"part_number"
   })

 }

 return NextResponse.json({

  incremental_updates:updates.length

 })

}