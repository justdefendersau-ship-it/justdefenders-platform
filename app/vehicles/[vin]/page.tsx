/**
 * =====================================================
 * JustDefenders ©
 * FILE: /app/vehicles/[vin]/page.tsx
 * TIMESTAMP: 20 March 2026 09:45 (Sydney)
 * PURPOSE:
 * FIX Next.js 16 params (Promise) + safe VIN handling
 * =====================================================
 */

import VehicleHealthSparkline from "@/app/components/VehicleHealthSparkline"
import TripReadinessPanel from "@/app/components/TripReadinessPanel"

type Params = Promise<{
  vin: string
}>

export default async function VehiclePage({
  params,
}: {
  params: Params
}) {
  // =====================================================
  // REQUIRED: unwrap params (Next.js 16)
  // =====================================================
  const { vin } = await params

  // =====================================================
  // SAFETY: prevent undefined API calls
  // =====================================================
  if (!vin) {
    return (
      <div className="p-6 text-red-400">
        VIN not provided
      </div>
    )
  }

  // =====================================================
  // PAGE RENDER
  // =====================================================
  return (
    <div className="w-full space-y-6">

      {/* ========================= */}
      {/* HEADER */}
      {/* ========================= */}
      <h1 className="text-2xl font-semibold">
        Vehicle: {vin}
      </h1>

      {/* ========================= */}
      {/* HEALTH TREND */}
      {/* ========================= */}
      <div className="bg-slate-800 p-6 rounded-xl">
        <VehicleHealthSparkline vin={vin} />
      </div>

      {/* ========================= */}
      {/* TRIP READINESS */}
      {/* ========================= */}
      <div className="bg-slate-800 p-6 rounded-xl">
        <TripReadinessPanel vin={vin} />
      </div>

    </div>
  )
}