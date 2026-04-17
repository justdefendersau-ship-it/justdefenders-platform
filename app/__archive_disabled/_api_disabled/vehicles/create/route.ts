/*
Create Vehicle API
Timestamp: 13 March 2026 20:04
Creates a new vehicle record
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req:Request){

const body = await req.json()

const vin = body.vin
const nickname = body.nickname
const make = body.make
const model = body.model
const year = body.year

if(!vin){

return NextResponse.json(
{error:"VIN required"},
{status:400}
)

}

const { error } = await supabase
.from("vehicles")
.insert({
vin,
nickname,
make,
model,
year,
created_at:new Date()
})

if(error){

return NextResponse.json(
{error:error.message},
{status:500}
)

}

return NextResponse.json({
success:true
})

}