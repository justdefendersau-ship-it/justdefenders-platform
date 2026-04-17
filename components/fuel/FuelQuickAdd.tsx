// =====================================================
// JustDefenders ©
// File: /components/fuel/FuelQuickAdd.tsx
// Timestamp: 22 March 2026 14:50 (Sydney)
// Purpose: Fuel logging with safe geo + brand capture
// =====================================================

"use client";

import { useEffect, useState } from "react";
import { reverseGeocode } from "@/lib/utils/geocode";

export default function FuelQuickAdd({ vehicleId }: { vehicleId: string }) {
  const [litres, setLitres] = useState("");
  const [cost, setCost] = useState("");
  const [odometer, setOdometer] = useState("");

  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  const [locationName, setLocationName] = useState<string | null>(null);
  const [brand, setBrand] = useState<string | null>(null);

  const [geoReady, setGeoReady] = useState(false);
  const [loading, setLoading] = useState(false);

  // ----------------------------------------------------
  // GEO + BRAND DETECTION
  // ----------------------------------------------------
  useEffect(() => {
    if (!navigator.geolocation) {
      setGeoReady(true);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        setLatitude(lat);
        setLongitude(lon);

        const geo = await reverseGeocode(lat, lon);

        if (geo) {
          setLocationName(geo.location_name);
          setBrand(geo.brand);
        }

        setGeoReady(true);
      },
      (error) => {
        console.warn("Geolocation denied:", error);
        setGeoReady(true); // allow fallback
      }
    );
  }, []);

  // ----------------------------------------------------
  // SUBMIT
  // ----------------------------------------------------
  async function handleSubmit() {
    setLoading(true);

    await fetch("/api/fuel/add", {
      method: "POST",
      body: JSON.stringify({
        vehicle_id: vehicleId,
        litres: Number(litres),
        cost: Number(cost),
        odometer: Number(odometer),

        fuel_type: "diesel",

        latitude,
        longitude,
        location_name: locationName,
        brand,
      }),
    });

    setLitres("");
    setCost("");
    setOdometer("");

    setLoading(false);
  }

  return (
    <div className="panel space-y-3">

      <div className="text-sm text-gray-400">
        Quick Fuel Log
      </div>

      {/* GEO STATUS */}
      {!geoReady && (
        <div className="text-xs text-yellow-500">
          Getting location...
        </div>
      )}

      {/* LOCATION */}
      {(locationName || brand) && (
        <div className="text-xs text-gray-500">
          📍 {locationName} {brand && `• ${brand}`}
        </div>
      )}

      {/* INPUTS */}
      <div className="grid grid-cols-3 gap-2">

        <input
          placeholder="Litres"
          value={litres}
          onChange={(e) => setLitres(e.target.value)}
          className="bg-gray-800 p-2 rounded text-sm"
        />

        <input
          placeholder="$ Cost"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          className="bg-gray-800 p-2 rounded text-sm"
        />

        <input
          placeholder="Odo"
          value={odometer}
          onChange={(e) => setOdometer(e.target.value)}
          className="bg-gray-800 p-2 rounded text-sm"
        />

      </div>

      {/* BUTTON */}
      <button
        onClick={handleSubmit}
        disabled={loading || !geoReady}
        className="w-full bg-green-600 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Saving..." : geoReady ? "Log Fuel" : "Getting Location..."}
      </button>

    </div>
  );
}