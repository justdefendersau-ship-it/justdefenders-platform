/*
Timestamp: 8 March 2026 — 04:17
File: /app/admin/suppliers/page.tsx

Purpose:
Supplier administration interface.
*/

"use client"

import SupplierManagerPanel from "@/app/components/SupplierManagerPanel"
import SupplierImportPanel from "@/app/components/SupplierImportPanel"

export default function SupplierAdminPage(){

 return(

 <div className="p-8 space-y-6">

  <h1 className="text-2xl font-semibold">

   Supplier Management

  </h1>

  <SupplierImportPanel />

  <SupplierManagerPanel />

 </div>

 )

}