"use client"

// Timestamp: 13 March 2026 14:55
// VIN Entry Page

import { useState } from "react"

export default function AddVehiclePage() {

  const [vin, setVin] = useState("")
  const [loading, setLoading] = useState(false)
  const [vehicle, setVehicle] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  async function registerVehicle() {

    setLoading(true)
    setError(null)

    try {

      const res = await fetch("/api/vehicles/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ vin })
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Registration failed")
      } else {
        setVehicle(data.vehicle)
      }

    } catch (err) {
      setError("Server error")
    }

    setLoading(false)
  }

  return (
    <div className="max-w-xl mx-auto p-6">

      <h1 className="text-2xl font-bold mb-6">
        Add Vehicle
      </h1>

      <div className="space-y-4">

        <input
          type="text"
          placeholder="Enter VIN"
          value={vin}
          onChange={(e) => setVin(e.target.value.toUpperCase())}
          className="w-full border rounded-lg p-3"
        />

        <button
          onClick={registerVehicle}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          {loading ? "Decoding VIN..." : "Register Vehicle"}
        </button>

        {error && (
          <div className="text-red-600">
            {error}
          </div>
        )}

      </div>

      {vehicle && (

        <div className="mt-8 border rounded-lg p-4">

          <h2 className="text-xl font-semibold mb-3">
            Vehicle Registered
          </h2>

          <p>
            <strong>VIN:</strong> {vehicle.vin}
          </p>

          <p>
            <strong>Make:</strong> {vehicle.make}
          </p>

          <p>
            <strong>Model:</strong> {vehicle.model}
          </p>

          <p>
            <strong>Engine:</strong> {vehicle.engine}
          </p>

          <p>
            <strong>Year:</strong> {vehicle.year}
          </p>

        </div>

      )}

    </div>
  )
}