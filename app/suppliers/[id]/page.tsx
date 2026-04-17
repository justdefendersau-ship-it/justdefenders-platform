// =====================================================
// JustDefenders ©
// File: /app/suppliers/[id]/page.tsx
// Timestamp: 22 March 2026 10:15 (Sydney)
// Purpose: Supplier profile with analytics
// =====================================================

import { createClient } from "@/lib/supabaseClient";
import { getSupplierAnalytics } from "@/lib/data/supplier";

import SupplierAnalytics from "@/components/supplier/SupplierAnalytics";

export default async function SupplierPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient();
  const supplierId = params.id;

  // ----------------------------------------------------
  // DATA
  // ----------------------------------------------------
  const { data: supplier } = await supabase
    .from("suppliers")
    .select("*")
    .eq("id", supplierId)
    .single();

  const { data: parts } = await supabase
    .from("parts")
    .select("*")
    .eq("supplier_id", supplierId);

  const analytics = await getSupplierAnalytics(supplierId);

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">
          {supplier?.name}
        </h1>

        <div className="text-sm text-gray-400">
          ⭐ {supplier?.rating}
        </div>
      </div>

      {/* ANALYTICS */}
      <SupplierAnalytics analytics={analytics} />

      {/* CONTACT */}
      <div className="panel">
        <div className="text-sm text-gray-400 mb-2">
          Contact
        </div>

        {supplier?.phone && <div>📞 {supplier.phone}</div>}
        {supplier?.email && <div>✉️ {supplier.email}</div>}
      </div>

      {/* PARTS */}
      <div className="panel">
        <div className="text-sm text-gray-400 mb-2">
          Parts
        </div>

        {parts?.map((p: any) => (
          <div key={p.id} className="flex justify-between text-sm py-1">
            <span>{p.name}</span>
            <span>${p.price}</span>
          </div>
        ))}
      </div>

    </div>
  );
}