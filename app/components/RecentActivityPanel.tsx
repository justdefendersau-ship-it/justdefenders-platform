"use client"

/*
JustDefenders ©
File: app/components/RecentActivityFeed.tsx
Timestamp: 16 March 2026 16:06

Recent Activity feed
Restores sparkline and row click behaviour.
*/

import { useState } from "react"

export default function RecentActivityFeed(){

  const [selected,setSelected] = useState<number | null>(null)

  const activities = [

    {
      description:"Fuel entry recorded",
      vehicle:"Outback Explorer",
      date:"11 Mar",
      health:[80,82,84]
    },

    {
      description:"Service completed",
      vehicle:"Defender 110",
      date:"10 Mar",
      health:[72,73,75]
    },

    {
      description:"Starter motor failure",
      vehicle:"Workhorse",
      date:"09 Mar",
      health:[65,64,63]
    }

  ]

  return(

    <div className="bg-slate-800 rounded-xl p-6">

      <div className="space-y-2 overflow-y-auto max-h-[240px]">

        {activities.map((a,i)=>(

          <button
            key={i}
            onClick={()=>setSelected(i)}
            className={`w-full text-left p-3 rounded-lg transition
            ${selected===i
              ? "bg-slate-600"
              : "bg-slate-700 hover:bg-slate-600"}`}
          >

            <div className="flex justify-between">

              <span>{a.description}</span>
              <span className="text-sm text-gray-400">{a.date}</span>

            </div>

            <div className="text-sm text-gray-400 mb-2">
              {a.vehicle}
            </div>

            {/* sparkline */}

            <div className="flex gap-1">

              {a.health.map((h,index)=>(
                <div
                  key={index}
                  style={{height:h/2}}
                  className="w-1 bg-green-400"
                />
              ))}

            </div>

          </button>

        ))}

      </div>

    </div>

  )

}