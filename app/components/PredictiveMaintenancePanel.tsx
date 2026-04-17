// Timestamp: 14 March 2026
// Predictive Maintenance Panel

"use client"

import { useEffect, useState } from "react"

interface Prediction {

 part_id:string
 probability:number
 avg_failure_km:number
 predicted_window:number

}

export default function PredictiveMaintenancePanel({vin}:{vin:string}){

 const [data,setData] = useState<Prediction[]>([])

 useEffect(()=>{

   fetch(`/api/analytics/failure-prediction?vin=${vin}`)
   .then(res=>res.json())
   .then(d=>{

     setData(d.predictions || [])

   })

 },[vin])

 return(

 <div className="bg-slate-900 p-6 rounded-xl">

   <h2 className="text-xl font-semibold mb-4">
     AI Predictive Maintenance
   </h2>

   <table className="w-full text-sm">

     <thead className="border-b border-slate-700 text-slate-400">

       <tr>
         <th className="text-left py-2">Part</th>
         <th className="text-left py-2">Failure Risk</th>
         <th className="text-left py-2">Expected Failure</th>
         <th className="text-left py-2">Remaining Window</th>
       </tr>

     </thead>

     <tbody>

       {data.slice(0,10).map((p,i)=>{

         const risk = Math.round(p.probability*100)

         return(

           <tr
             key={i}
             className="border-b border-slate-800"
           >

             <td className="py-2">
               {p.part_id}
             </td>

             <td className="py-2">

               <span
                 className={
                   risk>70
                     ? "text-red-400"
                     : risk>40
                     ? "text-yellow-400"
                     : "text-green-400"
                 }
               >

                 {risk}%

               </span>

             </td>

             <td className="py-2">

               {p.avg_failure_km.toLocaleString()} km

             </td>

             <td className="py-2">

               {p.predicted_window.toLocaleString()} km

             </td>

           </tr>

         )

       })}

     </tbody>

   </table>

 </div>

 )

}