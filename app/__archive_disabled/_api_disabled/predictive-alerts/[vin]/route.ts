/*
Predictive Maintenance Alert Engine
Timestamp: 14 March 2026 02:26
Detects telemetry anomalies and generates alerts
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

/*
Load recent telemetry
*/

const { data:telemetry } = await supabase
.from("vehicle_telemetry")
.select("*")
.eq("vin",vin)
.order("timestamp",{ ascending:false })
.limit(50)

if(!telemetry || telemetry.length === 0){

return NextResponse.json([])

}

const alerts:any[] = []

/*
Cooling system analysis
*/

const temps = telemetry
.map(t=>t.coolant_temp)
.filter(Boolean)

if(temps.length){

const avgTemp =
temps.reduce((a,b)=>a+b,0)/temps.length

if(avgTemp > 95){

alerts.push({
type:"cooling",
severity:"warning",
message:"Cooling system running hotter than normal"
})

}

if(avgTemp > 105){

alerts.push({
type:"cooling",
severity:"critical",
message:"Possible overheating detected"
})

}

}

/*
Battery analysis
*/

const voltages = telemetry
.map(t=>t.battery_voltage)
.filter(Boolean)

if(voltages.length){

const avgVoltage =
voltages.reduce((a,b)=>a+b,0)/voltages.length

if(avgVoltage < 12.5){

alerts.push({
type:"battery",
severity:"warning",
message:"Battery voltage below normal"
})

}

if(avgVoltage < 12){

alerts.push({
type:"battery",
severity:"critical",
message:"Battery or charging system fault"
})

}

}

/*
Engine load analysis
*/

const loads = telemetry
.map(t=>t.engine_load)
.filter(Boolean)

if(loads.length){

const avgLoad =
loads.reduce((a,b)=>a+b,0)/loads.length

if(avgLoad > 85){

alerts.push({
type:"engine",
severity:"warning",
message:"Engine frequently operating under heavy load"
})

}

}

/*
Return alerts
*/

return NextResponse.json(alerts)

}