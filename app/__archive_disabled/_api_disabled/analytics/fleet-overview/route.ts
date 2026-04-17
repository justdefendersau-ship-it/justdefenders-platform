import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(){

const vehicles = await supabase
.from("vehicles")
.select("vin, health_score")

const telemetry = await supabase
.from("vehicle_telemetry")
.select("vin")

const fuel = await supabase
.from("fuel_logs")
.select("total_cost")

const totalVehicles = vehicles.data?.length || 0

const avgHealth =
vehicles.data?.reduce((a,v)=>a+(v.health_score||0),0) /
(totalVehicles || 1)

const telemetryEvents = telemetry.data?.length || 0

const fuelSpend =
fuel.data?.reduce((a,f)=>a+(f.total_cost||0),0) || 0

return NextResponse.json({

totalVehicles,
avgHealth,
telemetryEvents,
fuelSpend

})

}