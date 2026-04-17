"use client"

/*
Timestamp: 8 March 2026 — 22:45
Voice Command Fleet AI Copilot
*/

import { useState } from "react"

export default function VoiceAICopilot(){

 const [question,setQuestion] = useState("")
 const [answer,setAnswer] = useState("")

 async function askAI(text:string){

  const res = await fetch("/api/analytics/ai-copilot",{

   method:"POST",

   headers:{
    "Content-Type":"application/json"
   },

   body:JSON.stringify({question:text})

  })

  const data = await res.json()

  setAnswer(data.answer)

 }

 function startListening(){

  const SpeechRecognition =
   (window as any).SpeechRecognition ||
   (window as any).webkitSpeechRecognition

  if(!SpeechRecognition){
   alert("Speech recognition not supported in this browser.")
   return
  }

  const recognition = new SpeechRecognition()

  recognition.lang = "en-US"

  recognition.onresult = (event:any)=>{

   const transcript = event.results[0][0].transcript

   setQuestion(transcript)

   askAI(transcript)

  }

  recognition.start()

 }

 return(

  <div className="bg-slate-700 border border-slate-600 rounded-xl p-6">

   <h2 className="text-lg font-semibold mb-4">
    Voice Command AI Copilot
   </h2>

   <div className="mb-3 text-sm text-slate-300">
    Ask a fleet reliability question using voice.
   </div>

   <button
    onClick={startListening}
    className="px-4 py-2 bg-green-600 rounded"
   >
    Start Voice Command
   </button>

   {question && (

    <div className="mt-4 text-slate-300">
     Question: {question}
    </div>

   )}

   {answer && (

    <div className="mt-2 text-slate-300">
     Answer: {answer}
    </div>

   )}

  </div>

 )
}