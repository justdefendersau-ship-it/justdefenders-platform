"use client"

/*
Timestamp: 8 March 2026 — 22:25
Fleet Reliability AI Copilot Panel
*/

import { useState } from "react"

export default function FleetAICopilot(){

 const [question,setQuestion] = useState("")
 const [answer,setAnswer] = useState("")

 async function ask(){

  const res = await fetch("/api/analytics/ai-copilot",{

   method:"POST",

   headers:{
    "Content-Type":"application/json"
   },

   body:JSON.stringify({
    question
   })

  })

  const data = await res.json()

  setAnswer(data.answer)

 }

 return(

  <div className="bg-slate-700 border border-slate-600 rounded-xl p-6">

   <h2 className="text-lg font-semibold mb-4">
    Fleet Reliability AI Copilot
   </h2>

   <input
    className="w-full p-2 mb-3 bg-slate-800 border border-slate-600 rounded"
    placeholder="Ask a reliability question…"
    value={question}
    onChange={(e)=>setQuestion(e.target.value)}
   />

   <button
    onClick={ask}
    className="px-4 py-2 bg-blue-600 rounded"
   >
    Ask
   </button>

   {answer && (

    <div className="mt-4 text-slate-300">

     {answer}

    </div>

   )}

  </div>

 )
}