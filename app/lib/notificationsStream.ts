/*
Timestamp: 8 March 2026 — 01:36
File: /app/lib/notificationStream.ts

Purpose:
Realtime Notification Stream Engine

Functions:
subscribeToNotifications
broadcastNotificationEvent
notificationStreamController
*/

import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

let channel:any = null

export function subscribeToNotifications(callback:(payload:any)=>void){

 if(channel){
  return
 }

 channel = supabase.channel("command-center-notifications")

 channel
  .on(
   "postgres_changes",
   {
    event:"INSERT",
    schema:"public",
    table:"command_center_notifications"
   },
   payload=>{
    callback(payload.new)
   }
  )
  .subscribe()

}

export async function broadcastNotificationEvent(event:any){

 await supabase
  .from("command_center_notifications")
  .insert(event)

}

export function notificationStreamController(){

 if(!channel){
  return
 }

 channel.on("close",()=>{

  console.warn("Notification stream closed")

 })

 channel.on("error",(err:any)=>{

  console.error("Notification stream error:",err)

 })

}