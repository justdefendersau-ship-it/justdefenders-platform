"use client"

import { useEffect, useState } from "react"
import { useVehicle } from "@/lib/vehicleContext"
import FuelChart from "../../components/FuelChart"

export default function FuelAnalyticsPage() {

  const { vehicleId } = useVehicle()

  const [data, setData] = useState<any>(null)
  const [comparison, setComparison] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!vehicleId) return
    loadData()
  }, [vehicleId])

  useEffect(() => {
    window.addEventListener("fuelUpdated", loadData)
    return () => window.removeEventListener("fuelUpdated", loadData)
  }, [vehicleId])

  async function loadData() {

    setLoading(true)

    const res = await fetch(`/api/fuel/analytics?vehicle_id=${vehicleId}`)
    const json = await res.json()

    const compRes = await fetch(`/api/fuel/compare`)
    const compJson = await compRes.json()

    setData(json)
    setComparison(compJson)
    setLoading(false)
  }

  if (!vehicleId)
    return <div className="card">Select a vehicle</div>

  if (loading)
    return <div className="card">Loading...</div>

  if (!data)
    return <div className="card">No fuel data</div>

  return (
    <div>

      <div className="card">
        <h2>Fuel Analytics</h2>
        <p>Average L/100km: {data.avgFuel}</p>
        <p>Total Spend: ${data.totalSpend}</p>
        <p>Cost per km: ${data.costPerKm}</p>
        <p>Engine Health: {data.engineHealth}%</p>
      </div>

      <div className="card">
        <h3>Fuel Trend</h3>
        <FuelChart data={data.trend} />
      </div>

      <div className="card">
        <h3>Fleet Comparison</h3>
        {comparison.map(v => (
          <div key={v.vehicle_id}>
            Vehicle {v.vehicle_id} — Avg: {v.avgFuel.toFixed(2)}
          </div>
        ))}
      </div>

    </div>
  )
}