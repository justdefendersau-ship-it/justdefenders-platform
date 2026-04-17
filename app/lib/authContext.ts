/*
============================================================
JustDefenders
Auth Context Helper
Date: 22 Feb 2026
============================================================
Centralised profile + organization loader
Prevents missing organization_id on inserts
============================================================
*/

import { supabase } from "./supabaseClient"

export async function getCurrentProfile() {

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user)
    throw new Error("User not authenticated")

  const { data: profile, error } =
    await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single()

  if (error || !profile)
    throw new Error("Profile not found")

  if (!profile.organization_id)
    throw new Error("Organization missing")

  return profile
}