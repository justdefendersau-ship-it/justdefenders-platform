/* Timestamp: 12 March 2026 21:47 */
/* Vehicle Health Card */

"use client"

import VehicleHealthSparkline from "@/app/components/VehicleHealthSparkline"

interface Props{
 vin:string
 name:string
 score:number
}

export default function VehicleHealthCard({
 vin,
 name,
 score
}:Props){

 return(

  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">

   <div className="flex items-center justify-between">

    <div>

     <div className="text-sm text-gray-400">
      {name}
     </div>

     <div className="text-2xl font-bold text-white">
      {score}
     </div>

    </div>

    <VehicleHealthSparkline vin={vin}/>

   </div>

  </div>

 )

}