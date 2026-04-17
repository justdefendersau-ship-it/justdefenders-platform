"use client"

/*
JustDefenders ©
File: app/components/RiskAlertsPanel.tsx
Timestamp: 17 March 2026 00:48

Alerts & Risk Notifications Panel

Features
• header inside panel
• alert icons restored
• clickable rows
• consistent panel height
*/

import Link from "next/link"
import { AlertTriangle, Wrench, Fuel } from "lucide-react"

export default function RiskAlertsPanel(){

  const alerts=[

    {
      id:"cooling-warning",
      icon:<AlertTriangle size={18} className="text-red-400"/>,
      text:"Cooling system warning"
    },

    {
      id:"service-overdue",
      icon:<Wrench size={18} className="text-yellow-400"/>,
      text:"Service overdue"
    },

    {
      id:"fuel-anomaly",
      icon:<Fuel size={18} className="text-green-400"/>,
      text:"Fuel anomaly detected"
    }

  ]

  return(

    <div
      className="bg-slate-800 rounded-xl p-6 flex flex-col"
      style={{height:"9cm"}}
    >

      {/* panel header */}

      <h2 className="text-lg font-semibold text-white mb-4">
        Alerts & Risk Notifications
      </h2>

      {/* alert rows */}

      <div className="flex flex-col gap-3">

        {alerts.map((alert)=>(

          <Link
            key={alert.id}
            href={`/alerts/${alert.id}`}
            className="flex items-center gap-3 px-3 py-2 rounded hover:bg-slate-700 transition cursor-pointer"
          >

            {/* icon */}

            <div>
              {alert.icon}
            </div>

            {/* text */}

            <div className="text-gray-300">
              {alert.text}
            </div>

          </Link>

        ))}

      </div>

    </div>

  )

}