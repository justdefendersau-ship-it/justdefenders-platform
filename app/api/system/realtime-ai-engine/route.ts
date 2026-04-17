// Timestamp 7 March 2026
// File: /app/api/system/realtime-ai-engine/route.ts

/*
Real-Time Reliability AI Engine

Processes reliability events
and generates AI insights instantly.
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {

  try {

    const { data: events } = await supabase
      .from("reliability_events")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50)

    if (!events) {

      return NextResponse.json({
        message: "No events"
      })

    }

    for (const e of events) {

      if (e.severity > 80) {

        await supabase
          .from("ai_reliability_insights")
          .insert({

            insight_type: e.event_type,

            entity: e.entity_id,

            severity: e.severity,

            description:
              `Critical reliability signal detected for ${e.entity_id}`

          })

      }

    }

    return NextResponse.json({

      message: "Real-time AI processed events"

    })

  } catch (err: any) {

    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    )

  }

}