"use client"

/*
=====================================================
ADVANCED ACTUARIAL RISK PAGE
=====================================================
*/

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { monteCarloRisk } from "@/lib/riskSimulation"

export default function AdvancedRiskPage() {

  const [expectedLoss, setExpectedLoss] = useState(0)

  useEffect(() => { run() }, [])

  async function run() {

    const { data: issues } = await supabase
      .from("defender_known_issues")
      .select("*")

    const result = monteCarloRisk(issues || [])

    setExpectedLoss(result)
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Advanced Risk Simulation</h1>
      <div>Monte Carlo Expected Loss: ${expectedLoss.toFixed(2)}</div>
    </div>
  )
}