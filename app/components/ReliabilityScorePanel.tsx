"use client"

/*
Timestamp 9 March 2026 07:00
Vehicle Reliability Score Panel
*/

import { useState } from "react"

export default function ReliabilityScorePanel(){

 const [score,setScore] = useState<number | null>(null)

 async function calculate(){

  const res = await fetch("/api/reliability/score",{

   method:"POST",

   headers:{
    "Content-Type":"application/json"
   },

   body:JSON.stringify({

    mileage:150000,
    failures:1,
    overdueMaintenance:1

   })

  })

  const json = await res.json()

  setScore(json.reliabilityScore)

 }

 return(

  <div className="p-6 border rounded-xl space-y-4">

   <h2 className="text-lg font-semibold">
    Defender Reliability Score
   </h2>

   <button
    onClick={calculate}
    className="px-4 py-2 bg-blue-600 text-white rounded"
   >
    Calculate Score
   </button>

   {score !== null && (

    <div className="text-4xl font-bold">

     {score} / 100

    </div>

   )}

  </div>

 )
}