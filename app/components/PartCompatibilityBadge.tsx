"use client"

// Timestamp: 13 March 2026 17:25
// Part Compatibility Badge

import { useEffect, useState } from "react"

export default function PartCompatibilityBadge({
  vin,
  part
}: {
  vin: string
  part: string
}) {

  const [status, setStatus] = useState<string>("checking")

  useEffect(() => {

    async function checkCompatibility() {

      const res = await fetch(
        `/api/parts/compatibility?vin=${vin}&part=${part}`
      )

      const data = await res.json()

      if (data.compatible === true) {
        setStatus("compatible")
      } else if (data.compatible === false) {
        setStatus("not-compatible")
      } else {
        setStatus("unknown")
      }

    }

    checkCompatibility()

  }, [vin, part])

  if (status === "checking") return null

  if (status === "compatible") {
    return (
      <span className="text-green-600 font-semibold">
        ✔ Compatible with your vehicle
      </span>
    )
  }

  if (status === "not-compatible") {
    return (
      <span className="text-red-600 font-semibold">
        ✖ Not compatible
      </span>
    )
  }

  return (
    <span className="text-yellow-600 font-semibold">
      ⚠ Compatibility unknown
    </span>
  )

}