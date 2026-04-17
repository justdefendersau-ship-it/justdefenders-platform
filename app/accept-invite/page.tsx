/*
============================================================
JustDefenders
Accept Invite Page
Date: 22 Feb 2026
============================================================
*/

"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { supabase } from "../../lib/supabaseClient"

export default function AcceptInvitePage() {

  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [message, setMessage] = useState("Processing invite...")

  useEffect(() => {
    if (token) acceptInvite()
  }, [token])

  async function acceptInvite() {

    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (!user) {
      setMessage("Please login first.")
      return
    }

    const { data: invite } =
      await supabase
        .from("organization_invites")
        .select("*")
        .eq("token", token)
        .single()

    if (!invite || invite.accepted) {
      setMessage("Invalid or expired invite.")
      return
    }

    if (new Date(invite.expires_at) < new Date()) {
      setMessage("Invite expired.")
      return
    }

    // Update profile
    await supabase
      .from("profiles")
      .update({
        organization_id: invite.organization_id,
        role: invite.role
      })
      .eq("id", user.id)

    // Mark invite accepted
    await supabase
      .from("organization_invites")
      .update({ accepted: true })
      .eq("id", invite.id)

    setMessage("Invite accepted. Redirecting...")

    setTimeout(() => {
      window.location.href = "/dashboard"
    }, 1500)
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>Accepting Invite</h1>
      <p>{message}</p>
    </main>
  )
}