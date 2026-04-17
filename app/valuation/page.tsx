"use client"

// Timestamp 6 March 2026 19:35
// File: /app/valuation/page.tsx

import { useState } from "react"

export default function VehicleValuationPage() {

 const [vin, setVin] = useState("")
 const [valuation, setValuation] = useState<any>(null)

 async function lookup() {

   const res = await fetch(`/api/valuation/vehicle?vin=${vin}`)
   const data = await res.json()

   setValuation(data.valuation)

 }

 return (

   <div className="p-10 space-y-6">

     <h1 className="text-3xl font-bold">

       Defender Vehicle Valuation

     </h1>

     <div className="flex space-x-2">

       <input
         value={vin}
         onChange={(e)=>setVin(e.target.value)}
         placeholder="Enter VIN"
         className="border p-3 w-full"
       />

       <button
         onClick={lookup}
         className="bg-black text-white px-4 py-2 rounded"
       >
         Evaluate
       </button>

     </div>

     {valuation && (

       <div className="space-y-2 border-t pt-4">

         <div>Base Value: ${valuation.base_market_value}</div>

         <div>
           Reliability Adjusted Value:
           ${valuation.reliability_adjusted_value}
         </div>

         <div>
           Predicted Value (12m):
           ${valuation.predicted_value_12m}
         </div>

         <div>
           Insurance Risk Tier:
           {valuation.insurance_risk_tier}
         </div>

       </div>

     )}

   </div>

 )

}