// =====================================================
// JustDefenders ©
// File: /lib/utils/geocode.ts
// Timestamp: 22 March 2026 14:28 (Sydney)
// Purpose: Reverse geocode + brand detection
// =====================================================

import { detectFuelBrand } from "./fuelBrand";

export async function reverseGeocode(lat: number, lon: number) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
    );

    const data = await res.json();

    const rawText =
      data?.display_name || data?.name || "";

    const locationName =
      data?.name ||
      data?.address?.fuel ||
      data?.address?.road ||
      "Unknown Location";

    const city =
      data?.address?.city ||
      data?.address?.town ||
      data?.address?.suburb;

    const country = data?.address?.country_code;

    const brand = detectFuelBrand(rawText);

    return {
      location_name: locationName,
      city,
      country_code: country,
      brand,
      fuel_station: rawText,
    };
  } catch (err) {
    console.error("Reverse geocode failed:", err);
    return null;
  }
}