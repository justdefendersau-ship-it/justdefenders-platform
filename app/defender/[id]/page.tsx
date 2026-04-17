/*
=====================================================
Defender Profile Page
Timestamp: 24 Feb 2026 16:45
• Deduplicates issues by issue_name
• Calculates health score
• Calculates repair exposure
=====================================================
*/

import { createClient } from "@supabase/supabase-js"

export default async function DefenderProfile({ params }: any) {

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  // Auth user
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return <div>Please login</div>

  // Load vehicle
  const { data: vehicle } = await supabase
    .from("vehicles")
    .select("*")
    .eq("id", params.id)
    .single()

  if (!vehicle) return <div>Vehicle not found</div>

  // Load maintenance records
  const { data: maintenance } = await supabase
    .from("maintenance_records")
    .select("*")
    .eq("vehicle_id", params.id)

  const currentKm =
    maintenance && maintenance.length > 0
      ? Math.max(...maintenance.map(m => m.odometer || 0))
      : 0

  // Load known issues for engine
  const { data: issues } = await supabase
    .from("defender_known_issues")
    .select("*")
    .eq("engine", vehicle.engine)

  // 🧹 REMOVE DUPLICATES HERE
  const uniqueIssues = Array.from(
    new Map(
      (issues || []).map(issue => [issue.issue_name, issue])
    ).values()
  )

  let totalExposure = 0
  let totalRiskScore = 0

  uniqueIssues.forEach(issue => {
    if (currentKm >= issue.typical_km) {
      totalExposure += issue.estimated_cost || 0
      totalRiskScore += issue.risk_level || 0
    }
  })

  const healthScore =
    totalRiskScore > 100 ? 0 : Math.max(100 - totalRiskScore, 0)

  return (
    <div style={{ padding: 40 }}>
      <h1>{vehicle.make} {vehicle.model}</h1>
      <p>Engine: {vehicle.engine}</p>
      <p>Current KM: {currentKm}</p>

      <hr />

      <h2>Health Score</h2>
      <h3>{healthScore} / 100</h3>

      <hr />

      <h2>Triggered Issues</h2>

      {uniqueIssues.filter(i => currentKm >= i.typical_km).length === 0 && (
        <p>No issues triggered at current mileage.</p>
      )}

      {uniqueIssues
        .filter(i => currentKm >= i.typical_km)
        .map(issue => (
          <div key={issue.id} style={{ marginBottom: 15 }}>
            <strong>{issue.issue_name}</strong><br/>
            Typical KM: {issue.typical_km}<br/>
            Estimated Cost: ${issue.estimated_cost}<br/>
            Risk Level: {issue.risk_level}
          </div>
        ))}

      <hr />

      <h2>Estimated Repair Exposure</h2>
      <h3>${totalExposure.toFixed(2)}</h3>

    </div>
  )
}