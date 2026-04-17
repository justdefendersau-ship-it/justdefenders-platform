/*
Maintenance Prediction API
Timestamp: 13 March 2026 15:19
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req:Request){

const {searchParams} = new URL(req.url)

const vin = searchParams.get("vin")

const {data,error} = await supabase
.from("component_digital_twins")
.select("part_number,remaining_life_km,failure_probability")
.eq("vin",vin)
.order("remaining_life_km",{ascending:true})
.limit(5)

if(error){

return NextResponse.json([])

}

const result = data?.map(c=>({

component:c.part_number,
remaining_km:c.remaining_life_km,
risk:c.failure_probability

}))

return NextResponse.json(result)

}