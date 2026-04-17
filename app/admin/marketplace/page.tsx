// =====================================================
// JustDefenders ©
// File: /lib/data/admin.ts
// Timestamp: 22 March 2026 10:25 (Sydney)
// Purpose: Admin marketplace analytics
// =====================================================

import { createClient } from "@/lib/supabaseClient";

export async function getAllSupplierAnalytics() {
  const supabase = createClient();

  const { data, error } = await supabase.rpc(
    "get_all_supplier_analytics"
  );

  if (error) {
    console.error("getAllSupplierAnalytics error:", error);
    return [];
  }

  return data || [];
}