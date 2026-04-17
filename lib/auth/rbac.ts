// =====================================================
// JustDefenders ©
// File: /lib/auth/rbac.ts
// Purpose: RBAC helper functions
// =====================================================

import { createClient } from "@/lib/supabaseClient";

export async function getUserRole(userId: string, orgId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("organisation_members")
    .select("role")
    .eq("user_id", userId)
    .eq("organisation_id", orgId)
    .single();

  if (error) {
    console.error("getUserRole error:", error);
    return "viewer";
  }

  return data?.role || "viewer";
}

// ----------------------------------------------------
// PERMISSION CHECKS
// ----------------------------------------------------

export function canEdit(role: string) {
  return role === "admin" || role === "mechanic";
}

export function isAdmin(role: string) {
  return role === "admin";
}