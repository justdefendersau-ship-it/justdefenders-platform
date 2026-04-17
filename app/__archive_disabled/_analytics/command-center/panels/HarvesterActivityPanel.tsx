// HarvesterActivityPanel.tsx
// Timestamp: 10 March 2026 19:05
// Commentary:
// Displays live activity from the forum failure harvester.

"use client"

import { useEffect, useState } from "react"

export default function HarvesterActivityPanel(){

 const [data,setData] = useState<any>(null)

 useEffect(()=>{

  async function load(){

   try{

    const res = await fetch("/api/admin/harvester-status")
    const result = await res.json()

    setData(result)

   }catch{

    setData({
     status:"offline",
     lastCrawl:"unknown",
     threadsScanned:0,
     failuresHarvested:0
    })

   }

  }

  load()

 },[])

 if(!data){
  return <div>Loading harvester status...</div>
 }

 return(

  <div>

   <h2 className="text-lg font-semibold text-gray-900 mb-3">
    Harvester Activity
   </h2>

   <div className="text-base text-gray-900">
    Status: {data.status}
   </div>

   <div className="text-base text-gray-900">
    Last Crawl: {data.lastCrawl}
   </div>

   <div className="text-base text-gray-900">
    Threads Scanned: {data.threadsScanned}
   </div>

   <div className="text-base text-gray-900">
    Failures Harvested: {data.failuresHarvested}
   </div>

  </div>

 )

}