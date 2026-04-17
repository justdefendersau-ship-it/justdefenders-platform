/*
Dashboard Overview API
Timestamp: 13 March 2026 16:02
Provides high level fleet metrics
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(){

/* Fleet Size */

const { count:vehicleCount } = await supabase
.from("vehicles")
.select("*",{count:"exact",head:true})

/* Average Health */

const { data:health } = await supabase
.from("vehicle_health_scores")
.select("health_score")

let avgHealth = 0

if(health && health.length){

avgHealth = Math.round(
health.reduce((a,b)=>a+b.health_score,0) / health.length
)

}

/* Fuel Spend */

const { data:fuel } = await supabase
.from("fuel_logs")
.select("total_cost")

let fuelSpend = 0

if(fuel){

fuelSpend = fuel.reduce((a,b)=>a+(b.total_cost || 0),0)

}

/* Maintenance Spend */

const { data:maintenance } = await supabase
.from("maintenance_records")
.select("cost")

let maintenanceSpend = 0

if(maintenance){

maintenanceSpend = maintenance.reduce((a,b)=>a+(b.cost || 0),0)

}

return NextResponse.json({

fleet_size:vehicleCount || 0,
average_health:avgHealth,
fuel_spend:fuelSpend,
maintenance_spend:maintenanceSpend

})

}