/*
Timestamp: 7 March 2026 — 21:15
File: /app/lib/notificationBus.ts

Purpose:
Global Command Center Notification Bus

Handles:

• event ingestion
• severity classification
• event buffering
• database persistence
*/

import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

interface NotificationEvent {

 type: string
 message: string

 vin?: string
 component?: string

 source?: string

 severity?: string

}

let notificationQueue: NotificationEvent[] = []

/*
Function 1
Event Ingestion
*/

export async function publishNotification(event: NotificationEvent){

 const classified = classifyNotification(event)

 enqueueNotification(classified)

 await storeNotification(classified)

}

/*
Function 2
Queue / Buffer
*/

function enqueueNotification(event: NotificationEvent){

 notificationQueue.push(event)

 if(notificationQueue.length > 100){
  notificationQueue.shift()
 }

}

export function dequeueNotification(){

 return notificationQueue.shift()

}

/*
Function 3
Severity Classification
*/

function classifyNotification(event: NotificationEvent): NotificationEvent{

 if(event.severity){
  return event
 }

 const msg = event.message.toLowerCase()

 if(msg.includes("critical") || msg.includes("failure cascade")){
  event.severity = "critical"
 }
 else if(msg.includes("risk") || msg.includes("failure")){
  event.severity = "high"
 }
 else if(msg.includes("warning")){
  event.severity = "warning"
 }
 else{
  event.severity = "info"
 }

 return event

}

/*
Function 4
Persistence Layer
*/

async function storeNotification(event: NotificationEvent){

 try{

  await supabase
   .from("command_center_notifications")
   .insert({

    type: event.type,
    severity: event.severity,
    message: event.message,

    vin: event.vin || null,
    component: event.component || null,

    source: event.source || "system"

   })

 }catch(err){

  console.error("Notification persistence error:",err)

 }

}