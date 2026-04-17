/*
Fuel Analytics API
Timestamp: 14 March 2026 01:02
Calculates real-world fuel economy statistics
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

const vin = params.vin

const { data,error } = await supabase
.from("fuel_logs")
.select("litres,odometer")
.eq("vin",vin)
.order("odometer",{ ascending:true })

if(error){
return NextResponse.json({ error:error.message },{ status:500 })
}

if(!data || data.length < 2){

return NextResponse.json({
avg_km_per_l:0,
best_km_per_l:0,
worst_km_per_l:0,
range_estimate:0
})

}

let consumptions:number[] = []

for(let i=1;i<data.length;i++){

const km = data[i].odometer - data[i-1].odometer
const litres = data[i].litres

if(litres > 0){

const economy = km / litres
consumptions.push(economy)

}

}

const avg =
consumptions.reduce((a,b)=>a+b,0) / consumptions.length

const best = Math.max(...consumptions)
const worst = Math.min(...consumptions)

const range = avg * 75

return NextResponse.json({

avg_km_per_l:avg.toFixed(2),
best_km_per_l:best.toFixed(2),
worst_km_per_l:worst.toFixed(2),
range_estimate:Math.round(range)

})

}