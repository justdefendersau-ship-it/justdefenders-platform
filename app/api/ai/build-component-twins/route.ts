// Timestamp 7 March 2026 03:10
// Component Digital Twin Builder

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(){

 const twins:any[]=[]

 const { data: vehicles } =
 await supabase.from("vehicles").select("*")

 const { data: components } =
 await supabase.from("component_failure_stats").select("*")

 for(const v of vehicles ?? []){

  for(const c of components ?? []){

   const failure = c.failure_rate ?? 0.05

   twins.push({

    vehicle_id:v.id,
    vin:v.vin,
    part_number:c.part_number,

    component_health:100-(failure*100),

    remaining_life_km:80000*(1-failure),

    failure_probability:failure

   })

  }

 }

 if(twins.length){

  await supabase
   .from("component_digital_twins")
   .insert(twins)

 }

 return NextResponse.json({

  component_twins_created:twins.length

 })

}