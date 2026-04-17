"use client"

/*
=====================================================
AXE DEV TOOL INTEGRATION
Timestamp: 28 Feb 2026 17:50
=====================================================
Development only accessibility scanner
=====================================================
*/

import { useEffect } from "react"

export default function AxeDevTool() {

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      import("axe-core").then((axe) => {
        axe.default.run(document, {}, (err, results) => {
          if (results.violations.length) {
            console.warn("A11Y Violations:", results.violations)
          }
        })
      })
    }
  }, [])

  return null
}