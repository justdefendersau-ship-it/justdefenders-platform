// GlobalReliabilityMap.tsx
// Timestamp: 9 March 2026 21:05
// Commentary:
// Failure intelligence map with clustering and event broadcasting.

"use client"

import { useEffect,useState } from "react"
import Map,{ Marker } from "react-map-gl/maplibre"
import { supabase } from "@/lib/supabaseClient"
import { useCommandCenter } from "@/app/analytics/command-center/state/commandCenterStore"

type Failure = {
 id:string
 component:string
 latitude:number
 longitude:number
}

type Cluster = {
 component:string
 latitude:number
 longitude:number
 count:number
}

export default function GlobalReliabilityMap(){

 const { publishEvent,setSelectedComponent } = useCommandCenter()

 const [clusters,setClusters] = useState<Cluster[]>([])

 const MAP_STYLE =
  `https://api.maptiler.com/maps/streets/style.json?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`


 useEffect(()=>{

  async function loadFailures(){

   const { data,error } = await supabase
    .from("community_failure_reports")
    .select("id,component,latitude,longitude")
    .limit(1000)

   if(error){
    console.error(error)
    return
   }

   const grouped:any = {}

   data?.forEach((f:Failure)=>{

    const key = f.component

    if(!grouped[key]){

     grouped[key] = {
      component:f.component,
      latitude:f.latitude,
      longitude:f.longitude,
      count:0
     }

    }

    grouped[key].count++

   })

   setClusters(Object.values(grouped))

  }

  loadFailures()

 },[])


 function handleClusterClick(cluster:Cluster){

  setSelectedComponent(cluster.component)

  publishEvent("failure_cluster_selected",cluster)

 }


 return(

  <div className="bg-white dark:bg-neutral-900 border rounded-xl p-4 shadow">

   <h2 className="text-lg font-semibold mb-4">
    Global Reliability Map
   </h2>

   <div className="h-[420px] rounded overflow-hidden">

    <Map
     initialViewState={{
      longitude:10,
      latitude:20,
      zoom:2
     }}
     mapStyle={MAP_STYLE}
    >

     {clusters.map(cluster=>{

      const size = Math.min(cluster.count*4,40)

      return(

       <Marker
        key={cluster.component}
        longitude={cluster.longitude}
        latitude={cluster.latitude}
       >

        <div
         onClick={()=>handleClusterClick(cluster)}
         style={{
          width:size,
          height:size
         }}
         className="bg-red-600 rounded-full opacity-80 cursor-pointer flex items-center justify-center text-white text-xs"
        >

         {cluster.count}

        </div>

       </Marker>

      )

     })}

    </Map>

   </div>

  </div>

 )
}