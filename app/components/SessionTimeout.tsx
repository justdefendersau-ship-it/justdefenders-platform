/*
=====================================================
SESSION TIMEOUT HANDLER
Timestamp: 28 Feb 2026 12:45
=====================================================
*/

"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function SessionTimeout() {

  const router = useRouter()

  useEffect(() => {

    let timer: any

    function resetTimer() {
      clearTimeout(timer)
      timer = setTimeout(() => {
        alert("Session expired.")
        router.push("/login")
      }, 1000 * 60 * 30)
    }

    window.addEventListener("mousemove", resetTimer)
    window.addEventListener("keydown", resetTimer)

    resetTimer()

    return () => {
      clearTimeout(timer)
    }

  }, [])

  return null
}