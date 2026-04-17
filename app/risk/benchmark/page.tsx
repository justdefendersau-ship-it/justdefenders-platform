"use client"

/*
=====================================================
FLEET PERCENTILE BENCHMARK PAGE
=====================================================
*/

import { useEffect, useState } from "react"
import { calculatePercentile } from "@/lib/fleetBenchmark"

export default function BenchmarkPage() {

  const [percentile, setPercentile] = useState(0)

  useEffect(() => {
    const sampleRisks = [40, 55, 60, 72, 80]
    const orgRisk = 60
    setPercentile(calculatePercentile(orgRisk, sampleRisks))
  }, [])

  return (
    <div style={{ padding: 40 }}>
      <h1>Fleet Benchmark</h1>
      <div>Your Risk Percentile: {percentile.toFixed(1)}%</div>
    </div>
  )
}