/*
Timestamp: 7 March 2026 — 21:40
File: /app/components/TopNavNotificationBell.tsx

Purpose:
Top navigation notification bell
displaying number of active alerts.
*/

"use client"

import { useEffect,useState } from "react"

interface Notification{

 id:number
 message:string
 severity:string
 acknowledged:boolean

}

export default function TopNavNotificationBell(){

 const [notifications,setNotifications] = useState<Notification[]>([])

 useEffect(()=>{

  async function load(){

   const res = await fetch("/api/analytics/notifications")
   const data = await res.json()

   if(Array.isArray(data)){
    setNotifications(data.filter(n=>!n.acknowledged))
   }

  }

  load()

  const interval = setInterval(load,10000)

  return ()=>clearInterval(interval)

 },[])

 const count = notifications.length

 return(

 <div className="relative">

  <div className="text-xl cursor-pointer">
   🔔
  </div>

  {count > 0 && (

   <div className="absolute -top-2 -right-2 bg-red-500 text-xs px-2 py-0.5 rounded-full">

    {count}

   </div>

  )}

 </div>

 )

}