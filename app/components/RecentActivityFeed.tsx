"use client"

/*
JustDefenders ©
File: app/components/RecentActivityFeed.tsx
Timestamp: 16 March 2026 23:40

Recent Activity Feed

Fixes in this version:
• restored coloured activity icons (fuel / service / breakdown)
• guaranteed vertical scroll
• navigation to vehicle page
• dropdown filter
• 6 visible rows with scroll for additional entries
*/

import Link from "next/link"
import { useState } from "react"
import { Fuel, Wrench, AlertTriangle } from "lucide-react"

export default function RecentActivityFeed(){

  const [filter,setFilter]=useState("all")

  const activities=[

    {id:"1",vin:"SALLDKAF8YA000006",type:"fuel",status:"green",description:"Fuel entry recorded",vehicle:"Defender 110",date:"11/03/2026"},
    {id:"2",vin:"SALLDHMF8YA123456",type:"mechanical",status:"amber",description:"Service completed",vehicle:"Outback Explorer",date:"10/03/2026"},
    {id:"3",vin:"SALLDHMF8YA654321",type:"breakdown",status:"red",description:"Starter motor failure",vehicle:"Workshop Loaner",date:"09/03/2026"},
    {id:"4",vin:"SALLDKAF8YA777777",type:"fuel",status:"green",description:"Fuel entry recorded",vehicle:"Touring Defender",date:"08/03/2026"},
    {id:"5",vin:"SALLDKAF8YA555555",type:"mechanical",status:"amber",description:"Maintenance inspection",vehicle:"Expedition Rig",date:"07/03/2026"},
    {id:"6",vin:"SALLDKAF8YA333333",type:"breakdown",status:"red",description:"Cooling system warning",vehicle:"Club Support Vehicle",date:"06/03/2026"},
    {id:"7",vin:"SALLDKAF8YA222222",type:"fuel",status:"green",description:"Fuel entry recorded",vehicle:"Desert Rover",date:"05/03/2026"},
    {id:"8",vin:"SALLDKAF8YA111111",type:"mechanical",status:"amber",description:"Brake inspection",vehicle:"Defender 90",date:"04/03/2026"},
    {id:"9",vin:"SALLDKAF8YA444444",type:"breakdown",status:"red",description:"Alternator failure",vehicle:"Workshop Loaner",date:"03/03/2026"}

  ]

  const filtered =
    filter==="all"
      ? activities
      : activities.filter(a=>a.type===filter)

  function statusColour(status:string){

    if(status==="green") return "bg-green-500"
    if(status==="amber") return "bg-yellow-400"
    return "bg-red-500"

  }

  function activityIcon(type:string){

    if(type==="fuel"){
      return(
        <div className="bg-green-500/20 p-1 rounded">
          <Fuel size={18} strokeWidth={2.5} className="text-green-400"/>
        </div>
      )
    }

    if(type==="mechanical"){
      return(
        <div className="bg-yellow-500/20 p-1 rounded">
          <Wrench size={18} strokeWidth={2.5} className="text-yellow-400"/>
        </div>
      )
    }

    return(
      <div className="bg-red-500/20 p-1 rounded">
        <AlertTriangle size={18} strokeWidth={2.5} className="text-red-400"/>
      </div>
    )

  }

  return(

    <div className="bg-slate-800 rounded-xl p-6 flex flex-col" style={{height:"9cm"}}>

      {/* panel header */}

      <div className="flex justify-between items-center mb-2">

        <h2 className="text-lg font-semibold text-white">
          Recent Activity
        </h2>

        <select
          value={filter}
          onChange={(e)=>setFilter(e.target.value)}
          className="bg-slate-700 text-xs px-2 py-1 rounded"
        >

          <option value="all">All Activity</option>
          <option value="fuel">Fuel</option>
          <option value="mechanical">Mechanical</option>
          <option value="breakdown">Breakdown</option>

        </select>

      </div>

      {/* column headings */}

      <div className="flex text-xs text-gray-400 pb-1">

        <div className="flex-1 ml-[2.5cm]">
          Description
        </div>

        <div className="w-[140px] -ml-[2cm]">
          Vehicle
        </div>

        <div className="w-[95px] text-right -ml-[1.5cm]">
          Date
        </div>

      </div>

      {/* scroll container */}

      <div
        className="overflow-y-auto space-y-1 pr-1"
        style={{height:"6.4cm"}}
      >

        {filtered.map((a)=>(

          <Link
            key={a.id}
            href={`/vehicles/${a.vin}`}
            className="block px-3 py-2 rounded flex items-center gap-3 text-sm bg-slate-700 hover:bg-slate-600 transition"
          >

            {activityIcon(a.type)}

            <div className={`w-2 h-2 rounded-full ${statusColour(a.status)}`} />

            <div className="flex-1 ml-[0.5cm]">
              {a.description}
            </div>

            <div className="w-[140px] text-gray-300 -ml-[1.5cm]">
              {a.vehicle}
            </div>

            <div className="w-[95px] text-gray-400 text-right -ml-[1.5cm]">
              {a.date}
            </div>

          </Link>

        ))}

      </div>

    </div>

  )

}