/*
=====================================================
GLOBAL ERROR BOUNDARY
Timestamp: 28 Feb 2026 12:45
=====================================================
*/

"use client"

import { useEffect } from "react"

export default function GlobalError({
  error,
  reset
}: {
  error: Error
  reset: () => void
}) {

  useEffect(() => {
    console.error("Global UI Error:", error)
  }, [error])

  return (
    <div style={{
      padding: 40,
      textAlign: "center"
    }}>
      <h1>Something went wrong.</h1>
      <p>The system encountered an unexpected error.</p>

      <button
        onClick={() => reset()}
        style={{ padding: "8px 16px", marginTop: 20 }}
      >
        Try Again
      </button>
    </div>
  )
}