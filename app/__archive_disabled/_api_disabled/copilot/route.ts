"use client"

// Timestamp 7 March 2026 01:10
// File: /app/copilot/page.tsx

import { useState } from "react"

export default function CopilotPage() {

  const [question, setQuestion] = useState("")
  const [response, setResponse] = useState<any>(null)

  async function askCopilot() {

    const res = await fetch("/api/copilot", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        question
      })

    })

    const data = await res.json()

    setResponse(data)

  }

  return (

    <div className="p-10 max-w-3xl">

      <h1 className="text-3xl font-bold mb-6">

        Reliability AI Copilot

      </h1>

      <input

        value={question}

        onChange={(e) => setQuestion(e.target.value)}

        placeholder="Ask a reliability question..."

        className="border p-3 w-full rounded mb-4"

      />

      <button

        onClick={askCopilot}

        className="bg-black text-white px-4 py-2 rounded"

      >

        Ask Copilot

      </button>

      {response && (

        <pre className="mt-6 bg-gray-100 p-4 rounded text-sm overflow-auto">

          {JSON.stringify(response, null, 2)}

        </pre>

      )}

    </div>

  )

}