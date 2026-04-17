"use client"

/*
JustDefenders ©
File: app/components/FleetHealthPanel.tsx
Timestamp: 17 March 2026 01:05

Fleet Health Overview Panel

Updated
• spacing aligned with Alerts & Risk Notifications
• rows clickable
• header inside panel
*/

import Link from "next/link"

export default function FleetHealthPanel(){

  const healthData=[

    {id:"healthy",label:"Healthy",value:18,color:"text-green-400"},
    {id:"warning",label:"Warning",value:4,color:"text-yellow-400"},
    {id:"critical",label:"Critical",value:1,color:"text-red-400"}

  ]

  return(

    <div
      className="bg-slate-800 rounded-xl p-6 flex flex-col"
      style={{height:"9cm"}}
    >

      {/* panel header */}

      <h2 className="text-lg font-semibold text-white mb-4">
        Fleet Health Overview
      </h2>

      {/* health rows */}

      <div className="flex flex-col gap-3">

        {healthData.map((item)=>(

          <Link
            key={item.id}
            href={`/fleet/health/${item.id}`}
            className="flex justify-between items-center px-3 py-2 rounded hover:bg-slate-700 transition cursor-pointer"
          >

            {/* label */}

            <div className="text-gray-300">
              {item.label}
            </div>

            {/* value */}

            <div className={`text-lg font-semibold ${item.color}`}>
              {item.value}
            </div>

          </Link>

        ))}

      </div>

    </div>

  )

}