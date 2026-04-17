/**
 * =====================================================
 * JustDefenders ©
 * FILE: /app/components/Sidebar.tsx
 * TIMESTAMP: 21 March 2026 14:00 (Sydney)
 * PURPOSE:
 * SIDEBAR WITH COLOURED ICONS + GREY TEXT
 * =====================================================
 */

"use client"

import { useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Car,
  Wrench,
  Fuel,
  Map,
  Package
} from "lucide-react"

export default function Sidebar() {
  const router = useRouter()

  const itemClass =
    "flex items-center gap-3 px-4 py-2 cursor-pointer text-slate-300 hover:text-white hover:bg-slate-800 rounded"

  return (
    <div className="h-full bg-slate-900 p-4 space-y-2">

      <div
        className={itemClass}
        onClick={() => router.push("/")}
      >
        <LayoutDashboard className="text-blue-400" size={18}/>
        Command Centre
      </div>

      <div
        className={itemClass}
        onClick={() => router.push("/vehicles")}
      >
        <Car className="text-green-400" size={18}/>
        Vehicles
      </div>

      <div
        className={itemClass}
        onClick={() => router.push("/maintenance")}
      >
        <Wrench className="text-yellow-400" size={18}/>
        Maintenance
      </div>

      <div
        className={itemClass}
        onClick={() => router.push("/fuel")}
      >
        <Fuel className="text-red-400" size={18}/>
        Fuel
      </div>

      <div
        className={itemClass}
        onClick={() => router.push("/trips")}
      >
        <Map className="text-purple-400" size={18}/>
        Trips
      </div>

      <div
        className={itemClass}
        onClick={() => router.push("/parts")}
      >
        <Package className="text-indigo-400" size={18}/>
        Parts
      </div>

    </div>
  )
}