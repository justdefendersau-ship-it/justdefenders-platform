// =====================================================
// JustDefenders ©
// File: /lib/data/supplier.ts
// Purpose: Supplier analytics data access
// =====================================================

import { createClient } from "@/lib/supabaseClient";

export async function getSupplierAnalytics(supplierId: string) {
  const supabase = createClient();

  const { data, error } = await supabase.rpc(
    "get_supplier_analytics",
    { s_id: supplierId }
  );

  if (error) {
    console.error("getSupplierAnalytics error:", error);
    return null;
  }

  return data;
}