/*
Vehicle Reliability Score API
Timestamp: 13 March 2026 14:42
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
.from("vehicle_reliability_scores")
.select("reliability_score,percentile_rank,model_average,fleet_average")
.eq("vin",vin)
.single()

if(error || !data){

return NextResponse.json({

score:0,
percentile:100,
model_avg:0,
fleet_avg:0

})

}

return NextResponse.json({

score:data.reliability_score,
percentile:data.percentile_rank,
model_avg:data.model_average,
fleet_avg:data.fleet_average

})

}