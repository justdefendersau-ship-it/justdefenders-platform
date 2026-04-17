"use client"

/*
JustDefenders ©
File: app/components/MyVehiclesPanel.tsx
Timestamp: 17 March 2026 01:32

My Vehicles Panel

Features
• header inside panel
• same size as Fleet Health & Alerts
• sparkline health trend
• vertical scroll
• clickable rows
*/

import Link from "next/link"

export default function MyVehiclesPanel(){

  const vehicles=[

    {
      vin:"SALLDKAF8YA000006",
      name:"Defender 110",
      trend:[80,82,84,86,88]
    },

    {
      vin:"SALLDHMF8YA123456",
      name:"Outback Explorer",
      trend:[72,74,76,78,79]
    },

    {
      vin:"SALLDHMF8YA654321",
      name:"Workshop Loaner",
      trend:[65,64,63,62,61]
    },

    {
      vin:"SALLDKAF8YA777777",
      name:"Touring Defender",
      trend:[85,86,87,88,90]
    },

    {
      vin:"SALLDKAF8YA555555",
      name:"Expedition Rig",
      trend:[70,71,72,73,74]
    },

    {
      vin:"SALLDKAF8YA333333",
      name:"Club Support Vehicle",
      trend:[60,59,58,57,56]
    }

  ]

  return(

    <div
      className="bg-slate-800 rounded-xl p-6 flex flex-col"
      style={{height:"9cm"}}
    >

      {/* panel header */}

      <h2 className="text-lg font-semibold text-white mb-4">
        My Vehicles
      </h2>

      {/* scroll container */}

      <div
        className="overflow-y-auto space-y-2"
        style={{height:"6.4cm"}}
      >

        {vehicles.map((vehicle)=>(

          <Link
            key={vehicle.vin}
            href={`/vehicles/${vehicle.vin}`}
            className="flex justify-between items-center px-3 py-2 rounded bg-slate-700 hover:bg-slate-600 transition"
          >

            {/* vehicle name */}

            <div className="text-gray-300">
              {vehicle.name}
            </div>

            {/* sparkline */}

            <div className="flex items-end gap-[2px]">

              {vehicle.trend.map((v,i)=>(

                <div
                  key={i}
                  className="w-[4px] bg-green-400 rounded-sm"
                  style={{height:`${v/12}px`}}
                />

              ))}

            </div>

          </Link>

        ))}

      </div>

    </div>

  )

}