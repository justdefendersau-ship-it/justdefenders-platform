/*
Timestamp: 5 March 2026 13:25
File: app/components/MachineLearningPredictions.tsx

Purpose
-------
Displays machine learning failure predictions for key vehicle systems.

Predictions represent probability of failure within the next
maintenance window.

This panel represents the predictive intelligence layer
of the fleet analytics platform.
*/

"use client"

import { useEffect, useState } from "react"

type Prediction = {
  engine: number
  turbocharger: number
  injectors: number
  coolingSystem: number
}

export default function MachineLearningPredictions() {

  const [data, setData] = useState<Prediction | null>(null)

  useEffect(() => {

    async function loadPredictions() {

      const res = await fetch("/api/ml/predictions")
      const json = await res.json()

      setData(json)

    }

    loadPredictions()

  }, [])

  if (!data) {
    return <div>Loading ML predictions...</div>
  }

  const predictions = [
    { name: "Engine", value: data.engine },
    { name: "Turbocharger", value: data.turbocharger },
    { name: "Fuel Injectors", value: data.injectors },
    { name: "Cooling System", value: data.coolingSystem }
  ]

  return (

    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">

      <h2 className="text-lg font-semibold mb-4">
        Machine Learning Failure Predictions
      </h2>

      <div className="space-y-4">

        {predictions.map((item) => (

          <div key={item.name}>

            <div className="flex justify-between text-sm mb-1">

              <span>{item.name}</span>

              <span>{Math.round(item.value * 100)}%</span>

            </div>

            <div className="w-full bg-gray-200 rounded h-3">

              <div
                className="bg-blue-500 h-3 rounded"
                style={{ width: `${item.value * 100}%` }}
              />

            </div>

          </div>

        ))}

      </div>

    </div>

  )

}