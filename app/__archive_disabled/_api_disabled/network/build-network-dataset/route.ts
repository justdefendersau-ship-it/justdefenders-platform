// Timestamp 6 March 2026 17:15
// File: /app/api/network/build-network-dataset/route.ts

/*
Defender Reliability Network Aggregator

Builds anonymized reliability signals
from fleet failure data.
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST() {

  const { data: failures } = await supabase
    .from("component_failure_stats")
    .select("*")

  const networkEvents = []

  if (failures) {

    for (const f of failures) {

      networkEvents.push({

        component: f.part_number,
        supplier_id: null,
        model: "Defender",
        production_year: null,
        failure_event: true,
        mileage: null,
        region: "global"

      })

    }

  }

  if (networkEvents.length > 0) {

    await supabase
      .from("reliability_network_events")
      .insert(networkEvents)

  }

  return NextResponse.json({

    events_generated: networkEvents.length

  })

}