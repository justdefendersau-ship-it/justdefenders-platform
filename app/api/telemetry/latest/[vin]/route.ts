/*
Vehicle Telemetry Latest API
Timestamp: 14 March 2026 01:45
Returns most recent telemetry record for a vehicle
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(
request:Request,
{ params }:{ params:{ vin:string } }
){

const vin = params.vin

const { data,error } = await supabase
.from("vehicle_telemetry")
.select("*")
.eq("vin",vin)
.order("timestamp",{ ascending:false })
.limit(1)
.single()

if(error){

return NextResponse.json(
{ error:error.message },
{ status:500 }
)

}

return NextResponse.json(data)

}