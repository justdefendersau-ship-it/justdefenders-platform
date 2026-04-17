// Timestamp 6 March 2026 17:45
// File: /app/api/system/process-event-stream/route.ts

/*
Reliability Event Stream Processor
Processes queued events and triggers AI engines
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST() {

  const { data: events } = await supabase
    .from("reliability_event_stream")
    .select("*")
    .eq("processed", false)
    .limit(100)

  if (!events || events.length === 0) {

    return NextResponse.json({
      processed: 0
    })

  }

  for (const e of events) {

    if (e.event_type === "telemetry") {

      await supabase
        .from("ai_reliability_insights")
        .insert({

          entity: e.entity_id,
          description: "Telemetry event processed",
          severity: 1

        })

    }

    await supabase
      .from("reliability_event_stream")
      .update({ processed: true })
      .eq("id", e.id)

  }

  return NextResponse.json({

    processed: events.length

  })

}