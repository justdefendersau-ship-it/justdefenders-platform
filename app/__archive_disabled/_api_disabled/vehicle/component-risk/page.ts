/*
Vehicle Component Risk API
Timestamp: 13 March 2026 14:06
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req:Request){

const { searchParams } = new URL(req.url)

const vin = searchParams.get("vin")

const { data,error } = await supabase
.from("component_digital_twins")
.select("part_number,failure_probability")
.eq("vin",vin)

if(error){

return NextResponse.json([])

}

const componentMap:any = {}

data?.forEach(d=>{

const key = d.part_number

if(!componentMap[key]){

componentMap[key] = {
component:key,
risk:d.failure_probability
}

}

})

return NextResponse.json(Object.values(componentMap))

}