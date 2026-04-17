"use client"

import { useEffect,useState } from "react"

import DashboardHeroHeader from "@/app/components/DashboardHeroHeader"
import HealthBadge from "@/app/components/HealthBadge"
import FuelSpendChart from "@/app/components/FuelSpendChart"
import RecentActivityFeed from "@/app/components/RecentActivityFeed"

interface VehicleHealth {

  vin:string
  avg_engine_temp:number
  max_engine_temp:number
  avg_engine_load:number
}

export default function VehicleHealthPage(){

  const [vehicles,setVehicles]=useState<any[]>([])

  useEffect(()=>{

    fetch("/api/analytics/vehicle-health")
      .then(r=>r.json())
      .then(setVehicles)

  },[])

  const activities=[

    "Fuel fill recorded",
    "Telemetry uploaded",
    "Maintenance invoice imported",
    "Vehicle health score updated"

  ]

  return (

    <div className="p-8 space-y-8">

      <DashboardHeroHeader/>

      <div className="grid grid-cols-3 gap-6">

        {vehicles.map(v=>(

          <div
            key={v.vin}
            className="bg-white p-6 rounded-xl shadow"
          >

            <h2 className="font-semibold mb-2">
              {v.vin}
            </h2>

            <HealthBadge score={85}/>

            <p className="text-sm mt-2">
              Avg Temp {v.avg_engine_temp?.toFixed(1)}°C
            </p>

          </div>

        ))}

      </div>

      <FuelSpendChart data={[]} />

      <RecentActivityFeed activities={activities} />

    </div>

  )

}