/*
Vehicle Telemetry Ingestion API
Timestamp: 14 March 2026 01:31
Accepts telemetry data from vehicles and stores in Supabase
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request:Request){

try{

const body = await request.json()

const {

vin,
latitude,
longitude,
speed,
rpm,
engine_load,
coolant_temp,
intake_temp,
battery_voltage,
fuel_level,
odometer

} = body

if(!vin){

return NextResponse.json(
{ error:"VIN required" },
{ status:400 }
)

}

const { error } = await supabase
.from("vehicle_telemetry")
.insert([{

vin,
latitude,
longitude,
speed,
rpm,
engine_load,
coolant_temp,
intake_temp,
battery_voltage,
fuel_level,
odometer

}])

if(error){

return NextResponse.json(
{ error:error.message },
{ status:500 }
)

}

return NextResponse.json({

status:"telemetry recorded"

})

}catch(err:any){

return NextResponse.json(
{ error:err.message },
{ status:500 }
)

}

}