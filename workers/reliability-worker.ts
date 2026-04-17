// Timestamp 7 March 2026
// File: /workers/reliability-worker.ts

/*
Distributed Reliability Worker

Processes queued reliability events
in parallel.
*/

import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function processQueue() {

  const { data: events } = await supabase
    .from("reliability_event_queue")
    .select("*")
    .eq("status", "pending")
    .limit(20)

  if (!events || events.length === 0) {

    console.log("No events")
    return

  }

  for (const e of events) {

    try {

      if (e.severity > 80) {

        await supabase
          .from("ai_reliability_insights")
          .insert({

            insight_type: e.event_type,

            entity: e.entity_id,

            severity: e.severity,

            description:
              `Critical reliability event detected for ${e.entity_id}`

          })

      }

      await supabase
        .from("reliability_event_queue")
        .update({

          status: "processed",
          processed_at: new Date()

        })
        .eq("id", e.id)

    } catch (err) {

      console.error("Worker error", err)

    }

  }

}

setInterval(processQueue, 2000)