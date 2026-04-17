import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// -----------------------------
// GET DASHBOARD DATA
// -----------------------------
export async function getDashboardData() {

  const alertsRes = await supabase
    .from('alerts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(20);

  const telemetryRes = await supabase
    .from('telemetry')
    .select('*')
    .order('recorded_at', { ascending: false })
    .limit(50);

  const latestDiagnosis = alertsRes.data
    ? alertsRes.data.find(function(a){ return a.type === 'DIAGNOSIS'; })
    : null;

  const latestRepair = alertsRes.data
    ? alertsRes.data.find(function(a){ return a.type === 'REPAIR'; })
    : null;

  const latestCost = alertsRes.data
    ? alertsRes.data.find(function(a){ return a.type === 'COST'; })
    : null;

  const parts = alertsRes.data
    ? alertsRes.data.filter(function(a){ return a.type === 'PART'; })
    : [];

  return {
    alerts: alertsRes.data || [],
    telemetry: telemetryRes.data || [],
    diagnosis: latestDiagnosis,
    repair: latestRepair,
    cost: latestCost,
    parts: parts
  };
}
