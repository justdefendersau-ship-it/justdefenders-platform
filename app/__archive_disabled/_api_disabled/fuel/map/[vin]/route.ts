/*
Fuel Map API
Timestamp: 14 March 2026 00:44
Returns GPS fuel events for vehicle
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

const { vin } = params

const { data,error } = await supabase
.from("fuel_logs")
.select("latitude,longitude,litres,date,fuel_station")
.eq("vin",vin)
.not("latitude","is",null)

if(error){

return NextResponse.json(
{ error:error.message },
{ status:500 }
)

}

return NextResponse.json(data)

}