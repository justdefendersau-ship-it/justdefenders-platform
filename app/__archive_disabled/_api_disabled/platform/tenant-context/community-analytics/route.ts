/*
Timestamp: 5 March 2026 12:22
File: app/api/platform/community-analytics/route.ts

Community Fleet Analytics Engine

Purpose
-------
Aggregates vehicle data across users who have
opted-in to community analytics.

Privacy
-------
Only members with community_data_opt_in = true
are included.

Outputs
-------
total vehicles
total contributing members
average vehicle age
community maintenance estimate
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET() {

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: users } = await supabase
    .from("profiles")
    .select("id,community_data_opt_in")
    .eq("community_data_opt_in", true)

  const userIds = users?.map(u => u.id) || []

  const { data: vehicles } = await supabase
    .from("vehicles")
    .select("id,year,owner_id")
    .in("owner_id", userIds)

  const currentYear = new Date().getFullYear()

  let ageSum = 0

  vehicles?.forEach(v => {

    if (v.year) {
      ageSum += currentYear - v.year
    }

  })

  const averageAge =
    vehicles?.length
      ? ageSum / vehicles.length
      : 0

  const estimatedMaintenanceCost =
    vehicles?.length
      ? vehicles.length * 800
      : 0

  return NextResponse.json({

    totalVehicles: vehicles?.length || 0,
    totalMembers: users?.length || 0,
    averageVehicleAge: Number(averageAge.toFixed(1)),
    estimatedMaintenanceCost

  })

}