"use client"

/*
=====================================================
ACTUARIAL RISK DASHBOARD
Timestamp: 26 Feb 2026 20:30
=====================================================
*/

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function RiskPage() {

  const [riskScore, setRiskScore] = useState(0)
  const [expectedLoss, setExpectedLoss] = useState(0)

  useEffect(() => { calculate() }, [])

  async function calculate() {

    const { data: issues } = await supabase
      .from("defender_known_issues")
      .select("*")

    const { data: maintenance } = await supabase
      .from("maintenance_records")
      .select("*")

    let totalRisk = 0
    let loss = 0

    issues?.forEach(issue => {
      totalRisk += issue.risk_level
      loss += issue.estimated_cost * (issue.risk_level / 100)
    })

    setRiskScore(Math.min(100, totalRisk))
    setExpectedLoss(loss)
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Actuarial Risk Dashboard</h1>

      <div>Risk Score: {riskScore}</div>
      <div>Expected Loss: ${expectedLoss.toFixed(2)}</div>
    </div>
  )
}