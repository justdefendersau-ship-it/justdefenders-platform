/*
Timestamp: 7 March 2026 — 23:04
File: /app/admin/parts/page.tsx

Purpose:
Admin panel for parts intelligence tools.
*/

"use client"

import CrossReferenceDiscoveryTool from "@/app/components/CrossReferenceDiscoveryTool"

export default function PartsAdminPage(){

 return(

 <div className="p-8 space-y-6">

  <h1 className="text-2xl font-semibold">

   Parts Intelligence Admin

  </h1>

  <CrossReferenceDiscoveryTool />

 </div>

 )

}