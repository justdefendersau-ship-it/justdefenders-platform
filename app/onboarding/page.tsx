"use client"

// Timestamp 7 March 2026
// File: /app/onboarding/page.tsx

import { useState } from "react"

export default function Onboarding() {

  const [name, setName] = useState("")

  async function createOrg() {

    await fetch("/api/org/create", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({

        name

      })

    })

    alert("Organization created")

  }

  return (

    <div className="p-10 max-w-xl">

      <h1 className="text-3xl font-bold mb-6">

        Fleet Onboarding

      </h1>

      <input

        value={name}

        onChange={(e) => setName(e.target.value)}

        placeholder="Organization name"

        className="border p-3 w-full mb-4"

      />

      <button
        onClick={createOrg}
        className="bg-black text-white px-4 py-2 rounded"
      >

        Create Fleet

      </button>

    </div>

  )

}