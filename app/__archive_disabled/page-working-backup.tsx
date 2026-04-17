// Timestamp: 14 March 2026 16:15
// JustDefenders ©
// File: /app/page.tsx
//
// PURPOSE
// Fine-tune dashboard width so panels match the original design
// proportions (~10 cm per panel).
//
// CHANGE
// Container width increased slightly from 1100px → 1180px
// to restore original panel width without affecting margins.

"use client"

import FleetHealthPanel from "@/app/components/FleetHealthPanel"
import RiskAlertsPanel from "@/app/components/RiskAlertsPanel"
import MyVehiclesPanel from "@/app/components/MyVehiclesPanel"
import RecentActivityFeed from "@/app/components/RecentActivityFeed"
import NetworkIntelligencePanel from "@/app/components/NetworkIntelligencePanel"
import QuickActionsPanel from "@/app/components/QuickActionsPanel"

export default function Dashboard(){

  const panelStyle =
    "bg-slate-900 border border-slate-800 shadow-lg rounded-xl p-6"

  return(

    <div className="px-40 py-8 space-y-8">

      {/* Dashboard width constraint */}

      <div className="max-w-[1180px] mx-auto space-y-8">

        {/* Page Heading */}

        <h1 className="text-3xl font-bold">
          JustDefenders Command Centre
        </h1>


        {/* Row 1 */}

        <div className="grid grid-cols-3 gap-6">

          <div className={`${panelStyle} h-[220px] flex flex-col`}>

            <h2 className="text-lg font-semibold mb-4">
              Fleet Health Overview
            </h2>

            <FleetHealthPanel/>

          </div>


          <div className={`${panelStyle} h-[220px] flex flex-col`}>

            <h2 className="text-lg font-semibold mb-4">
              Alerts & Risk Notifications
            </h2>

            <RiskAlertsPanel/>

          </div>


          <div className={`${panelStyle} h-[220px] flex flex-col`}>

            <h2 className="text-lg font-semibold mb-4">
              My Vehicles
            </h2>

            <div className="flex-1 overflow-y-auto pr-2">
              <MyVehiclesPanel/>
            </div>

          </div>

        </div>


        {/* Row 2 */}

        <div className="grid grid-cols-2 gap-6">

          <div className={panelStyle}>

            <h2 className="text-lg font-semibold mb-4">
              Recent Activity
            </h2>

            <RecentActivityFeed/>

          </div>


          <div className={panelStyle}>

            <h2 className="text-lg font-semibold mb-4">
              Network Intelligence
            </h2>

            <NetworkIntelligencePanel/>

          </div>

        </div>


        {/* Row 3 */}

        <div className={panelStyle}>

          <h2 className="text-lg font-semibold mb-4">
            Quick Actions
          </h2>

          <QuickActionsPanel/>

        </div>

      </div>

    </div>

  )

}