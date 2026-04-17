/*
Vehicle Trips API
Timestamp: 13 March 2026 19:16
Returns trips for a vehicle
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(
req:Request,
{ params }:{ params:{ vin:string }}
){

const { data,error } = await supabase
.from("trips")
.select("date,name,distance_km,duration")
.eq("vin",params.vin)
.order("date",{ascending:false})
.limit(10)

if(error){

return NextResponse.json({error:error.message},{status:500})

}

return NextResponse.json(data || [])

}