/*
============================================================
JustDefenders
Invite Members Page
Date: 22 Feb 2026
============================================================
*/

"use client"

import { useState } from "react"
import { supabase } from "../../lib/supabaseClient"

export default function InvitePage() {

  const [email, setEmail] = useState("")
  const [role, setRole] = useState("member")
  const [message, setMessage] = useState("")

  async function sendInvite() {

    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (!user) return

    const { data: profile } =
      await supabase
        .from("profiles")
        .select("organization_id")
        .eq("id", user.id)
        .single()

    if (!profile?.organization_id) {
      setMessage("No organization found.")
      return
    }

    const token = crypto.randomUUID()

    const { error } =
      await supabase
        .from("organization_invites")
        .insert({
          organization_id: profile.organization_id,
          email,
          role,
          token,
          expires_at: new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000
          )
        })

    if (error) {
      setMessage("Invite failed.")
      return
    }

    const inviteLink =
      `${window.location.origin}/accept-invite?token=${token}`

    setMessage(
      `Invite created. Share this link:\n${inviteLink}`
    )
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>Invite Member</h1>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="member">Member</option>
        <option value="admin">Admin</option>
      </select>

      <button onClick={sendInvite}>
        Send Invite
      </button>

      <p style={{ whiteSpace: "pre-wrap" }}>
        {message}
      </p>
    </main>
  )
}