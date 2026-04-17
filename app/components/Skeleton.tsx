/*
=====================================================
SKELETON LOADING COMPONENT
Timestamp: 28 Feb 2026 12:45
=====================================================
*/

"use client"

export default function Skeleton({ height = 20 }: { height?: number }) {
  return (
    <div
      style={{
        height,
        background: "#ddd",
        marginBottom: 10,
        borderRadius: 4,
        animation: "pulse 1.5s infinite"
      }}
    />
  )
}