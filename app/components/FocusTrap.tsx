"use client"

/*
=====================================================
FOCUS TRAP FOR MODALS
Timestamp: 28 Feb 2026 16:05
=====================================================
*/

import { useEffect, useRef } from "react"

export default function FocusTrap({
  children
}: {
  children: React.ReactNode
}) {

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const focusable = ref.current?.querySelectorAll<HTMLElement>(
      "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
    )

    focusable?.[0]?.focus()
  }, [])

  return (
    <div ref={ref}>
      {children}
    </div>
  )
}