"use client"

// Timestamp 7 March 2026
// File: /app/reports/page.tsx

import { useState } from "react"

export default function ReportsPage() {

  const [org, setOrg] = useState("")
  const [url, setUrl] = useState("")

  async function generate() {

    const res = await fetch("/api/reports/generate", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({

        organization_id: org

      })

    })

    const data = await res.json()

    setUrl(data.pdf_url)

  }

  return (

    <div className="p-10 max-w-xl">

      <h1 className="text-3xl font-bold mb-6">

        Reliability Reports

      </h1>

      <input

        value={org}

        onChange={(e) => setOrg(e.target.value)}

        placeholder="Organization ID"

        className="border p-3 w-full mb-4"

      />

      <button
        onClick={generate}
        className="bg-black text-white px-4 py-2 rounded"
      >

        Generate Report

      </button>

      {url && (

        <a
          href={url}
          className="block mt-6 text-blue-600 underline"
        >

          Download Report

        </a>

      )}

    </div>

  )

}