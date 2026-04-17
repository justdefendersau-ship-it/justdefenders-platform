/*
Vehicle Failure Prediction API
Timestamp: 13 March 2026 14:23
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
.from("vehicle_failure_predictions")
.select("predicted_failure_km,predicted_failure_probability")
.eq("vin",vin)
.order("predicted_failure_km",{ascending:true})

if(error){

return NextResponse.json([])

}

const result = data?.map(p=>({

mileage:p.predicted_failure_km,
probability:p.predicted_failure_probability

}))

return NextResponse.json(result)

}