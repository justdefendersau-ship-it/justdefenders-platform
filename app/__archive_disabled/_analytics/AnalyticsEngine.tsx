"use client"

/*
Timestamp: 8 March 2026 — 14:25
File: /app/analytics/AnalyticsEngine.tsx

Purpose:
Analytics container wrapper for the dashboard.
Removes the navy background that was being injected
by the previous layout wrapper.
*/

export default function AnalyticsEngine({
 children,
}:{
 children: React.ReactNode
}){

 return (

  <div
   style={{
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    background: "#1f2937"  // neutral slate grey
   }}
  >

   {children}

  </div>

 )

}