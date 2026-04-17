// Timestamp: 13 March 2026 20:35
// Maintenance Learning Agent

import { getSupabaseServerClient } from "@/lib/supabaseServer"

export async function runMaintenanceLearningAgent() {

  const supabase = getSupabaseServerClient()

  const { data: failures } = await supabase
    .from("part_failure_registry")
    .select("part_number, mileage")

  if (!failures) return

  const averages: Record<string, number[]> = {}

  failures.forEach((f: any) => {

    if (!averages[f.part_number]) {
      averages[f.part_number] = []
    }

    averages[f.part_number].push(f.mileage)

  })

  for (const part in averages) {

    const values = averages[part]

    const avg =
      values.reduce((a, b) => a + b, 0) / values.length

    await supabase
      .from("component_reliability_scores")
      .upsert({
        component: part,
        avg_failure_km: Math.round(avg)
      })

  }

}