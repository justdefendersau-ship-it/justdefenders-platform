/*
Timestamp: 5 March 2026 16:50
File: app/components/SelfLearningModel.tsx

Purpose
-------
Displays results of the self-learning failure model.

Shows:

• learned component failure probabilities
• supplier reliability scores
*/

"use client"

import { useEffect, useState } from "react"

type ComponentStat = {

  partId: string
  probability: number

}

type SupplierScore = {

  supplierName: string
  reliabilityScore: number

}

export default function SelfLearningModel() {

  const [components, setComponents] = useState<ComponentStat[]>([])
  const [suppliers, setSuppliers] = useState<SupplierScore[]>([])

  useEffect(() => {

    async function loadModel() {

      const res = await fetch("/api/ml/self-learning")
      const json = await res.json()

      setComponents(json.components)
      setSuppliers(json.suppliers)

    }

    loadModel()

  }, [])

  if (!components.length) {

    return <div>Training self-learning failure model...</div>

  }

  return (

    <div className="bg-white border rounded-xl p-6 shadow-sm">

      <h2 className="text-lg font-semibold mb-4">
        Self-Learning Failure Model
      </h2>

      <div className="grid grid-cols-2 gap-6">

        <div>

          <h3 className="font-semibold mb-2">
            Component Failure Probabilities
          </h3>

          <div className="space-y-2 text-sm">

            {components.map((c, i) => (

              <div key={i}>

                {c.partId.slice(0,8)} — {Math.round(c.probability*100)}%

              </div>

            ))}

          </div>

        </div>

        <div>

          <h3 className="font-semibold mb-2">
            Supplier Reliability
          </h3>

          <div className="space-y-2 text-sm">

            {suppliers.map((s, i) => (

              <div key={i}>

                {s.supplierName} — {Math.round(s.reliabilityScore*100)}%

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>

  )

}