/*
Vehicle API
Timestamp: 13 March 2026 18:18
Returns vehicle details by VIN
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
.from("vehicles")
.select("*")
.eq("vin",params.vin)
.single()

if(error){

return NextResponse.json({error:error.message},{status:500})

}

return NextResponse.json(data)

}