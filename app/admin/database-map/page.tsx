"use client"

// Timestamp 6 March 2026 22:30
// File: /app/admin/database-map/page.tsx

import { useEffect, useState } from "react"

export default function DatabaseMap(){

 const [schema,setSchema] = useState<any>(null)

 useEffect(()=>{

   fetch("/api/system/generate-db-map")
   .then(r=>r.json())
   .then(setSchema)

 },[])

 if(!schema) return <div className="p-10">Loading schema...</div>

 return(

 <div className="p-10 space-y-6">

   <h1 className="text-3xl font-bold">
     Supabase Database Map
   </h1>

   {schema.tables.map((t:any,i:number)=>{

     const cols =
       schema.columns.filter((c:any)=>c.table_name===t.table_name)

     return(

       <div key={i} className="border p-4">

         <div className="font-bold text-lg">
           {t.table_name}
         </div>

         {cols.map((c:any,j:number)=>(
           <div key={j}>
             {c.column_name} — {c.data_type}
           </div>
         ))}

       </div>

     )

   })}

 </div>

 )

}