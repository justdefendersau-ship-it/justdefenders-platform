// Timestamp: 11 March 2026 23:02
// Knowledge Contributor Leaderboard

"use client"

import { useEffect,useState } from "react"

export default function Leaderboard(){

 const [data,setData] = useState<any[]>([])

 useEffect(()=>{

  fetch("/api/knowledge-reputation")
   .then(res=>res.json())
   .then(setData)

 },[])

 return(

  <div>

   <div className="bg-gray-300 p-4 rounded mb-6">

    <h1 className="text-xl font-bold">
     Top Technical Contributors
    </h1>

   </div>

   <div className="bg-white rounded shadow">

    <div className="grid grid-cols-3 p-4 border-b font-semibold">

     <div>Member</div>
     <div>Reputation</div>
     <div>Articles</div>

    </div>

    {data.map((r)=>(
     <div
      key={r.id}
      className="grid grid-cols-3 p-4 border-b text-sm"
     >

      <div>{r.member_id}</div>
      <div>{r.reputation_score}</div>
      <div>{r.articles_submitted}</div>

     </div>
    ))}

   </div>

  </div>

 )

}