// Timestamp 7 March 2026
// File: /app/api/system/queue-reliability-event/route.ts

/*
Queue Reliability Event

Adds reliability events to the distributed
processing queue.
*/

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {

  const body = await req.json()

  const {

    event_type,
    entity_id,
    severity,
    payload

  } = body

  await supabase
    .from("reliability_event_queue")
    .insert({

      event_type,
      entity_id,
      severity,
      payload,
      status: "pending"

    })

  return NextResponse.json({

    message: "Event queued"

  })

}