// Timestamp: 5 March 2026 00:40
// Supabase session handshake page

"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
)

export default function AuthCallbackPage() {

  const router = useRouter()

  useEffect(() => {

    async function finishLogin() {

      const { data } = await supabase.auth.getSession()

      if (data?.session) {
        router.replace("/dashboard")
      } else {
        router.replace("/login")
      }

    }

    finishLogin()

  }, [router])

  return (
    <div className="max-w-md mx-auto mt-24 text-center">
      <p className="text-gray-500">
        Establishing session...
      </p>
    </div>
  )
}