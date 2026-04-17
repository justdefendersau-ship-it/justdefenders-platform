/*
Fleet Comparison API
Timestamp: 13 March 2026 15:35
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

vehicle_score:0,
model_average:0,
fleet_average:0,
percentile:100

})

}

return NextResponse.json({

vehicle_score:data.reliability_score,
model_average:data.model_average,
fleet_average:data.fleet_average,
percentile:data.percentile_rank

})

}