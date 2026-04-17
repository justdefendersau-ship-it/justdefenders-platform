"use client"

/*
Timestamp: 8 March 2026 — 15:20
Top navigation bar
Removed slate palette
*/

export default function TopNav(){

 return (

  <header className="h-16 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between px-6">

   <div className="text-sm text-neutral-300">
    Fleet Intelligence Dashboard
   </div>

   <div className="flex items-center gap-4">

    <span className="text-neutral-400 text-sm">
     Global Defender Reliability
    </span>

    <div className="w-8 h-8 bg-neutral-700 rounded-full flex items-center justify-center text-sm">
     JD
    </div>

   </div>

  </header>

 )

}