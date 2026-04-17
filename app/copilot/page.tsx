"use client"

// Timestamp 6 March 2026 23:25
// File: /app/copilot/page.tsx

import { useState } from "react"

export default function CopilotPage(){

const [question,setQuestion] = useState("")
const [answer,setAnswer] = useState<any>(null)

async function ask(){

const res =
 await fetch("/api/ai/copilot",{

 method:"POST",

 headers:{
  "Content-Type":"application/json"
 },

 body: JSON.stringify({

  user_id:null,
  question

 })

 })

const data = await res.json()

setAnswer(data)

}

return(

<div className="p-10 space-y-6">

<h1 className="text-3xl font-bold">
Reliability AI Copilot
</h1>

<div className="flex space-x-2">

<input
value={question}
onChange={(e)=>setQuestion(e.target.value)}
placeholder="Ask a reliability question..."
className="border p-3 w-full"
/>

<button
onClick={ask}
className="bg-black text-white px-4 py-2 rounded"
>
Ask
</button>

</div>

{answer && (

<pre className="bg-gray-100 p-6 overflow-x-scroll">

{JSON.stringify(answer,null,2)}

</pre>

)}

</div>

)

}