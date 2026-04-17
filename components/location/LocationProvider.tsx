// =====================================================
// JustDefenders ©
// File: /components/location/LocationProvider.tsx
// Timestamp: 22 March 2026 15:20 (Sydney)
// Purpose: Capture user location globally
// =====================================================

"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabaseClient";

const supabase = createClient();

export default function LocationProvider() {
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        console.log("User location:", lat, lon);

        // Optional: store or send to API
        await supabase.from("user_locations").insert({
          latitude: lat,
          longitude: lon,
        });
      },
      (error) => {
        console.warn("Geolocation error:", error);
      }
    );
  }, []);

  return null;
}