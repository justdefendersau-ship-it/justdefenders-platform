"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function DebugAuth() {

  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    async function load() {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
      console.log("AUTH USER:", data.user)
    }
    load()
  }, [])

  return (
    <main style={{ padding: 40 }}>
      <h1>Auth Debug</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </main>
  )
}