"use client"

/*
=====================================================
NAVIGATION (MINIMAL STABLE VERSION)
Timestamp: 1 March 2026 14:35

This version:
✔ No custom typing
✔ No JSX return typing
✔ No context usage
✔ Pure safe JSX
=====================================================
*/

import Link from "next/link"

export default function Nav() {

  return (
    <nav>

      <div>
        <Link href="/dashboard">Dashboard</Link>{" "}
        <Link href="/vehicles">Vehicles</Link>{" "}
        <Link href="/maintenance">Maintenance</Link>{" "}
        <Link href="/parts">Parts</Link>{" "}
        <Link href="/shed">My Shed</Link>{" "}
        <Link href="/fuel">Fuel</Link>{" "}
        <Link href="/fuel/analytics">Fuel Analytics</Link>{" "}
        <Link href="/intelligence">Intelligence</Link>
      </div>

    </nav>
  )
}