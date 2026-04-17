// =====================================================
// JustDefenders ©
// File: /lib/data/user.ts
// Purpose: Fetch stored user location
// =====================================================

import { createClient } from "@/lib/supabaseClient";

export async function getUserLocation(userId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("user_profiles")
    .select("latitude, longitude")
    .eq("user_id", userId)
    .single();

  if (error || !data) {
    console.error("getUserLocation error:", error);
    return null;
  }

  return data;
}