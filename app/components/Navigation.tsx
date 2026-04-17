// Navigation.tsx
// Timestamp: 10 March 2026 00:28
// Commentary:
// Dynamic navigation built from feature registry.

"use client"

import Link from "next/link"
import { features } from "@/features/featureRegistry"

export default function Navigation(){

 const memberFeatures =
  features.filter(f => f.category === "member")

 return(

  <nav className="flex flex-col gap-2 p-4">

   {memberFeatures.map(f => (

    <Link
     key={f.id}
     href={f.route}
     className="text-blue-600 hover:underline"
    >
     {f.name}
    </Link>

   ))}

  </nav>

 )

}