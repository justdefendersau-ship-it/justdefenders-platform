"use client"

/*
============================================================
JustDefenders
Set New Password Page
Timestamp: 23 Feb 2026 18:12
============================================================
*/

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function ResetPassword() {

  const router = useRouter()

  const [password, setPassword] = useState("")
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.updateUser({
      password
    })

    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    setMessage("Password updated successfully.")
    setTimeout(() => {
      router.push("/login")
    }, 2000)
  }

  return (
    <main style={{ padding: 40, maxWidth: 400 }}>

      <h1>Set New Password</h1>

      <form onSubmit={handleUpdate}>

        <div style={{ marginBottom: 12 }}>
          <label>New Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: 10,
            width: "100%",
            background: "#333",
            color: "white",
            border: "none"
          }}
        >
          {loading ? "Updating..." : "Update Password"}
        </button>

      </form>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

    </main>
  )
}