"use client"

/*
=====================================================
KEYBOARD NAVIGATION VISUAL OVERLAY
Timestamp: 28 Feb 2026 17:50
=====================================================
*/

import { useEffect } from "react"

export default function KeyboardOverlay() {

  useEffect(() => {

    function showOutline(e: KeyboardEvent) {
      if (e.key === "Tab") {
        document.body.classList.add("keyboard-nav")
      }
    }

    window.addEventListener("keydown", showOutline)

    return () => {
      window.removeEventListener("keydown", showOutline)
    }

  }, [])

  return null
}