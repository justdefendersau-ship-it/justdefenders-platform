/*
Dashboard Recent Activity API
Timestamp: 14 March 2026 07:28
Returns recent maintenance and fuel activity with vehicle information and health score
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(){

/*
Fetch maintenance records
*/

const { data:maintenance } = await supabase
.from("maintenance_logs")
.select(`
id,
description,
service_date,
vin,
cost,
vehicles (
year,
make,
model,
nickname,
health_score
)
`)
.order("service_date",{ ascending:false })
.limit(25)

/*
Fetch fuel records
*/

const { data:fuel } = await supabase
.from("fuel_logs")
.select(`
id,
date,
vin,
cost,
vehicles (
year,
make,
model,
nickname,
health_score
)
`)
.order("date",{ ascending:false })
.limit(25)

/*
Normalize activity events
*/

const events:any[] = []

maintenance?.forEach(m => {

events.push({
title: m.description || "Maintenance",
type: "Maintenance",
date: m.service_date,
vin: m.vin,
cost: m.cost || 0,
vehicle: m.vehicles
})

})

fuel?.forEach(f => {

events.push({
title: "Fuel entry recorded",
type: "Fuel Log",
date: f.date,
vin: f.vin,
cost: f.cost || 0,
vehicle: f.vehicles
})

})

/*
Sort newest first
*/

events.sort((a,b)=> new Date(b.date).getTime() - new Date(a.date).getTime())

/*
Return latest activity
*/

return NextResponse.json(events.slice(0,25))

}