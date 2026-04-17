/*
Fleet Health API
Timestamp: 13 March 2026 17:03
Returns fleet health distribution
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(){

const { data } = await supabase
.from("vehicle_health_scores")
.select("health_score")

let healthy = 0
let warning = 0
let critical = 0

data?.forEach(v => {

if(v.health_score >= 80){

healthy++

}else if(v.health_score >= 50){

warning++

}else{

critical++

}

})

return NextResponse.json({

healthy,
warning,
critical

})

}