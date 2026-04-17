/*
Vehicle Health Score API
Timestamp: 13 March 2026 15:03
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
.from("vehicle_health_scores")
.select("health_score,risk_level")
.eq("vin",vin)
.order("calculated_at",{ascending:false})
.limit(1)
.single()

if(error || !data){

return NextResponse.json({

score:0,
risk:"UNKNOWN"

})

}

return NextResponse.json({

score:data.health_score,
risk:data.risk_level

})

}