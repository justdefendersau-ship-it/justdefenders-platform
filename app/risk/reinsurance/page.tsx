"use client"

/*
=====================================================
REINSURANCE PRICING DASHBOARD
=====================================================
*/

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { monteCarloRisk } from "@/lib/riskSimulation"
import { calculateReinsurancePremium } from "@/lib/reinsurance"

export default function ReinsurancePage() {

  const [premium, setPremium] = useState(0)

  useEffect(() => { run() }, [])

  async function run() {

    const { data: issues } = await supabase
      .from("defender_known_issues")
      .select("*")

    const expectedLoss = monteCarloRisk(issues || [])
    const premium = calculateReinsurancePremium(expectedLoss)

    setPremium(premium)
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Reinsurance Pricing</h1>
      <div>Recommended Premium: ${premium.toFixed(2)}</div>
    </div>
  )
}