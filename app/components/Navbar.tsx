/**
 * =====================================================
 * JustDefenders ©
 * FILE: /app/components/Navbar.tsx
 * TIMESTAMP: 19 March 2026 19:50 (Sydney)
 * PURPOSE:
 * REMOVE WIDTH CONSTRAINT — allow full layout expansion
 * =====================================================
 */

"use client"

export default function Navbar() {
  return (
    <div className="w-full px-6 py-4 flex justify-between items-center bg-black text-white border-b border-neutral-800">

      {/* LEFT */}
      <div className="text-lg font-semibold">
        JustDefenders
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4 text-sm text-gray-400">
        <span>Dashboard</span>
        <span>Vehicles</span>
        <span>Parts</span>
      </div>

    </div>
  )
}