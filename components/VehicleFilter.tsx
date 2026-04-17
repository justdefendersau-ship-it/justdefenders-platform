'use client'

// JustDefenders ©
// File: /components/VehicleFilter.tsx
// Timestamp: 30 March 2026 00:20

export default function VehicleFilter({
  vehicles,
  onChange,
}: any) {
  return (
    <select
      onChange={(e) => onChange(e.target.value)}
      className="bg-gray-900 p-2 rounded-lg"
    >
      <option value="all">All Vehicles</option>
      {vehicles.map((v: any) => (
        <option key={v.id} value={v.id}>
          {v.vin}
        </option>
      ))}
    </select>
  )
}