// Timestamp: 14 March 2026
// Supplier Reliability Ranking Panel

"use client"

import { useEffect, useState } from "react"

interface Supplier {

 supplier_id:string
 supplier_name:string
 country:string

 reliability_score:number
 delivery_success_rate:number
 avg_delivery_delay_days:number
 customer_rating:number

}

export default function SupplierRankingPanel(){

 const [suppliers,setSuppliers] = useState<Supplier[]>([])

 useEffect(()=>{

   fetch("/api/analytics/supplier-reliability")
   .then(res=>res.json())
   .then(data=>{

     setSuppliers(data.suppliers || [])

   })

 },[])

 return(

 <div className="bg-slate-900 p-6 rounded-xl">

   <h2 className="text-xl font-semibold mb-4">
     Supplier Reliability Rankings
   </h2>

   <table className="w-full text-sm">

     <thead className="text-slate-400 border-b border-slate-700">

       <tr>
         <th className="text-left py-2">Supplier</th>
         <th className="text-left py-2">Country</th>
         <th className="text-left py-2">Reliability</th>
         <th className="text-left py-2">Rating</th>
         <th className="text-left py-2">Avg Delay</th>
       </tr>

     </thead>

     <tbody>

       {suppliers.map((s)=>{

         return(

           <tr
             key={s.supplier_id}
             className="border-b border-slate-800"
           >

             <td className="py-2">
               {s.supplier_name}
             </td>

             <td className="py-2">
               {s.country}
             </td>

             <td className="py-2">

               <span className="font-bold text-green-400">

                 {s.reliability_score}

               </span>

             </td>

             <td className="py-2">
               {s.customer_rating?.toFixed(1) || "-"}
             </td>

             <td className="py-2">

               {s.avg_delivery_delay_days
                 ? `${s.avg_delivery_delay_days}d`
                 : "-"}

             </td>

           </tr>

         )

       })}

     </tbody>

   </table>

 </div>

 )

}