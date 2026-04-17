"use client"

/*
JustDefenders ©
File: app/components/RiskAlertsPanel.tsx
Timestamp: 16 March 2026 17:24

Alerts & Risk Notifications Panel

Restores:
• icons
• row click interaction
• correct panel height
*/

import { useState } from "react"
import { AlertTriangle, Wrench, Battery } from "lucide-react"

export default function RiskAlertsPanel(){

  const [selected,setSelected]=useState<number|null>(null)

  const alerts=[

    {
      icon:<AlertTriangle size={18} className="text-red-400"/>,
      text:"Turbo actuator failure risk detected"
    },

    {
      icon:<Wrench size={18} className="text-yellow-400"/>,
      text:"Service interval approaching"
    },

    {
      icon:<Battery size={18} className="text-green-400"/>,
      text:"Battery health normal"
    }

  ]

  return(

    <div className="bg-slate-800 rounded-xl p-6 h-[8.5cm]">

      <div className="space-y-3">

        {alerts.map((a,i)=>(

          <button
            key={i}
            onClick={()=>setSelected(i)}
            className={`flex items-center gap-3 w-full p-3 rounded-lg transition
            ${selected===i
              ? "bg-slate-600"
              : "bg-slate-700 hover:bg-slate-600"}`}
          >

            {a.icon}

            <span>{a.text}</span>

          </button>

        ))}

      </div>

    </div>

  )

}