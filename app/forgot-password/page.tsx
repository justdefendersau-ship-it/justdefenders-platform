"use client"

/*
============================================================
JustDefenders
Forgot Password Page
Timestamp: 23 Feb 2026 18:10
============================================================
*/

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function ForgotPassword() {

  const [email, setEmail] = useState("")
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleReset(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000/reset-password"
    })

    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    setMessage("Password reset email sent. Check your inbox.")
  }

  return (
    <main style={{ padding: 40, maxWidth: 400 }}>

      <h1>Reset Password</h1>

      <form onSubmit={handleReset}>

        <div style={{ marginBottom: 12 }}>
          <label>Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

      </form>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

    </main>
  )
}