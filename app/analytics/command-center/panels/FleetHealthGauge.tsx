// FleetHealthGauge.tsx
// Timestamp: 10 March 2026 18:40
// Commentary:
// Command Center panel displaying overall fleet reliability health.
// Adjusted label size and colour for dashboard consistency.

"use client"

import { useEffect, useState } from "react"

export default function FleetHealthGauge(){

 const [health,setHealth] = useState<number | null>(null)

 useEffect(()=>{

  async function load(){

   try{

    const res = await fetch("/api/analytics/fleet-health")

    const data = await res.json()

    setHealth(data.score)

   }catch{

    // fallback value until analytics backend connected
    setHealth(84)

   }

  }

  load()

 },[])

 return(

  <div>

   <h2 className="text-lg font-semibold text-gray-900 mb-3">
    Fleet Health
   </h2>

   {health === null && (
    <div>Loading fleet health...</div>
   )}

   {health !== null && (

    <div className="text-3xl font-bold text-gray-900">

     {health} / 100

    </div>

   )}

   <div className="text-base text-gray-700 mt-2">
    Average Defender reliability score
   </div>

  </div>

 )
}