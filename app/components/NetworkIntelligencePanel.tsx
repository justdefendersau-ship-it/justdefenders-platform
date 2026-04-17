"use client"

/*
JustDefenders ©
File: app/components/NetworkIntelligencePanel.tsx
Timestamp: 17 March 2026 02:02

Network Intelligence Panel

Features
• panel size matches Recent Activity
• header inside panel
• icons on left
• clickable rows
*/

import Link from "next/link"
import { Globe, Package, AlertTriangle, TrendingUp } from "lucide-react"

export default function NetworkIntelligencePanel(){

  const intelligence=[

    {
      id:"supplier-reliability",
      icon:<Globe size={18} className="text-blue-400"/>,
      text:"Supplier reliability update"
    },

    {
      id:"parts-price-change",
      icon:<Package size={18} className="text-purple-400"/>,
      text:"Parts price fluctuation"
    },

    {
      id:"failure-pattern",
      icon:<AlertTriangle size={18} className="text-red-400"/>,
      text:"Failure pattern detected"
    },

    {
      id:"availability-shift",
      icon:<TrendingUp size={18} className="text-green-400"/>,
      text:"Market availability shift"
    }

  ]

  return(

    <div
      className="bg-slate-800 rounded-xl p-6 flex flex-col"
      style={{height:"9cm"}}
    >

      {/* panel header */}

      <h2 className="text-lg font-semibold text-white mb-4">
        Network Intelligence
      </h2>

      {/* intelligence rows */}

      <div className="flex flex-col gap-3">

        {intelligence.map((item)=>(

          <Link
            key={item.id}
            href={`/network/${item.id}`}
            className="flex items-center gap-3 px-3 py-2 rounded hover:bg-slate-700 transition cursor-pointer"
          >

            {/* icon */}

            <div>
              {item.icon}
            </div>

            {/* text */}

            <div className="text-gray-300">
              {item.text}
            </div>

          </Link>

        ))}

      </div>

    </div>

  )

}