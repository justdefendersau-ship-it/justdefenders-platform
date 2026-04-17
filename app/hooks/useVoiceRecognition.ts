/*
Timestamp: 8 March 2026 — 02:33
File: /app/hooks/useVoiceRecognition.ts

Purpose:
Voice recognition hook for Fleet AI Copilot.
*/

"use client"

import { useState } from "react"

export default function useVoiceRecognition(){

 const [listening,setListening] = useState(false)

 function startListening(callback:(text:string)=>void){

  const SpeechRecognition =
   (window as any).SpeechRecognition ||
   (window as any).webkitSpeechRecognition

  if(!SpeechRecognition){
   alert("Speech recognition not supported in this browser")
   return
  }

  const recognition = new SpeechRecognition()

  recognition.lang = "en-US"

  recognition.onstart = ()=>{

   setListening(true)

  }

  recognition.onresult = (event:any)=>{

   const transcript = event.results[0][0].transcript

   callback(transcript)

  }

  recognition.onend = ()=>{

   setListening(false)

  }

  recognition.start()

 }

 return{

  listening,
  startListening

 }

}