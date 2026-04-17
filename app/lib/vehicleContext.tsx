"use client"

/*
=====================================================
GLOBAL VEHICLE CONTEXT
Timestamp: 1 March 2026 09:00
=====================================================
*/

import { createContext, useContext, useState } from "react"

type VehicleContextType = {
  vehicleId: string | null
  setVehicleId: (id: string) => void
}

const VehicleContext = createContext<VehicleContextType | null>(null)

export function VehicleProvider({ children }: any) {

  const [vehicleId, setVehicleId] = useState<string | null>(null)

  return (
    <VehicleContext.Provider value={{ vehicleId, setVehicleId }}>
      {children}
    </VehicleContext.Provider>
  )
}

export function useVehicle() {
  const ctx = useContext(VehicleContext)
  if (!ctx) throw new Error("VehicleProvider missing")
  return ctx
}