 "use client"

/*
JustDefenders ©
File: app/components/QuickActionsPanel.tsx
Timestamp: 17 March 2026 02:24

Quick Actions Panel

Features
• five action buttons
• full width layout
• clickable navigation
*/

import Link from "next/link"

export default function QuickActionsPanel(){

  const actions=[

    {
      label:"Add Vehicle",
      href:"/add-vehicle",
      colour:"bg-blue-600 hover:bg-blue-500"
    },

    {
      label:"Log Fuel",
      href:"/fuel",
      colour:"bg-green-600 hover:bg-green-500"
    },

    {
      label:"Log Maintenance",
      href:"/maintenance",
      colour:"bg-orange-500 hover:bg-orange-400"
    },

    {
      label:"Report Failure",
      href:"/alerts",
      colour:"bg-red-600 hover:bg-red-500"
    },

    {
      label:"Parts Search",
      href:"/parts",
      colour:"bg-purple-600 hover:bg-purple-500"
    }

  ]

  return(

    <div className="grid grid-cols-5 gap-4">

      {actions.map((action)=>(

        <Link
          key={action.label}
          href={action.href}
          className={`${action.colour} text-white text-center py-3 rounded-lg font-semibold transition`}
        >

          {action.label}

        </Link>

      ))}

    </div>

  )

}