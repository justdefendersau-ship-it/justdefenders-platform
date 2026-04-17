/**
 * ============================================================
 * JustDefenders © VIN History Engine (REAL)
 * ============================================================
 */

export async function getVinHistory(vin) {

  if (!vin) return [];

  try {

    const res = await fetch('/api/vin-history', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vin })
    });

    const json = await res.json();

    if (json.error) {
      console.error('VIN history error:', json.error);
      return [];
    }

    return json.data || [];

  } catch (err) {
    console.error('VIN history fetch failed:', err.message);
    return [];
  }
}
