/*
Timestamp: 5 March 2026 12:26
File: app/components/CommunityDataToggle.tsx

Purpose
-------
Allows users to opt-in or opt-out of contributing
their fleet data to community analytics.

Default
-------
Disabled unless user enables it.
*/

"use client"

import { useState } from "react"

export default function CommunityDataToggle() {

  const [enabled, setEnabled] = useState(false)

  async function toggle() {

    const newValue = !enabled
    setEnabled(newValue)

    await fetch("/api/platform/update-community-setting", {
      method: "POST",
      body: JSON.stringify({
        community_data_opt_in: newValue
      })
    })

  }

  return (

    <div className="border rounded-lg p-4 bg-white shadow-sm">

      <h3 className="text-sm font-semibold mb-2">
        Community Data Sharing
      </h3>

      <button
        onClick={toggle}
        className="border px-3 py-1 rounded text-sm"
      >

        {enabled ? "Disable Sharing" : "Enable Sharing"}

      </button>

      <p className="text-xs text-gray-500 mt-2">
        Share anonymous vehicle data to improve
        community reliability analytics.
      </p>

    </div>

  )

}