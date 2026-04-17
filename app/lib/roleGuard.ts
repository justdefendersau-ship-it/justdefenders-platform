/*
============================================================
JustDefenders
Role Guard Utility
Date: 22 Feb 2026
============================================================
*/

import { getCurrentProfile } from "./authContext"

export async function requireAdmin() {

  const profile = await getCurrentProfile()

  if (profile.role !== "admin") {
    throw new Error("Admin access required")
  }

  return profile
}