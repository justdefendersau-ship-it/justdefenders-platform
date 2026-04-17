// =====================================================
// JustDefenders ©
// File: /lib/hooks/useRealtimeDashboard.ts
// Timestamp: 22 March 2026 17:45 (Sydney)
// Purpose: Realtime dashboard updates (CLIENT SAFE)
// =====================================================

"use client";

import { useEffect } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabaseBrowser";

export function useRealtimeDashboard(userId: string) {
  useEffect(() => {
    if (!userId) return;

    const supabase = createBrowserSupabaseClient();

    // --------------------------------------------------
    // SUBSCRIBE TO REALTIME CHANGES
    // --------------------------------------------------
    const channel = supabase
      .channel("dashboard-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "activity_logs",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          console.log("Realtime activity update:", payload);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "alerts",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          console.log("Realtime alert update:", payload);
        }
      )
      .subscribe();

    // --------------------------------------------------
    // CLEANUP
    // --------------------------------------------------
    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);
}