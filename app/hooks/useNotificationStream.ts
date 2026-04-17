/*
Timestamp: 8 March 2026 — 01:39
File: /app/hooks/useNotificationStream.ts

Purpose:
React hook for realtime notification updates.

Functions:
handleIncomingNotification
useNotificationStream
*/

"use client"

import { useEffect } from "react"
import { subscribeToNotifications } from "@/app/lib/notificationStream"

export default function useNotificationStream(
 handler:(notification:any)=>void
){

 useEffect(()=>{

  subscribeToNotifications(notification=>{

   handleIncomingNotification(notification,handler)

  })

 },[])

}

function handleIncomingNotification(
 notification:any,
 handler:(notification:any)=>void
){

 handler(notification)

}