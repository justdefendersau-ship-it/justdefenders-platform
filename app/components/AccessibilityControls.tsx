"use client"

/*
=====================================================
ACCESSIBILITY CONTROLS PANEL
Timestamp: 28 Feb 2026 16:05
=====================================================
*/

import { useState, useEffect } from "react"

export default function AccessibilityControls() {

  const [contrast, setContrast] = useState(false)

  useEffect(() => {
    document.body.classList.toggle("high-contrast", contrast)
  }, [contrast])

  return (
    <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
      <button
        className="button"
        onClick={() => setContrast(!contrast)}
        aria-pressed={contrast}
      >
        {contrast ? "Disable High Contrast" : "Enable High Contrast"}
      </button>
    </div>
  )
}