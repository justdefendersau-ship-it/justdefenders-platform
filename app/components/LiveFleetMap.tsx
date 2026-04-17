"use client"

import { useEffect,useRef,useState } from "react"
import maplibregl from "maplibre-gl"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function LiveFleetMap(){

const mapContainer = useRef<HTMLDivElement>(null)
const [map,setMap] = useState<any>(null)

useEffect(()=>{

if(!mapContainer.current) return

const m = new maplibregl.Map({

container: mapContainer.current,
style: "https://demotiles.maplibre.org/style.json",
center: [133,-25],
zoom: 3

})

setMap(m)

return ()=> m.remove()

},[])

useEffect(()=>{

if(!map) return

const channel = supabase
.channel("telemetry-stream")
.on(
"postgres_changes",
{
event: "INSERT",
schema: "public",
table: "vehicle_telemetry"
},
(payload)=>{

const t = payload.new

if(!t.latitude || !t.longitude) return

new maplibregl.Marker({
color: t.engine_temp > 100 ? "red" : "blue"
})
.setLngLat([t.longitude,t.latitude])
.addTo(map)

}
)
.subscribe()

return ()=> supabase.removeChannel(channel)

},[map])

return(

<div
ref={mapContainer}
className="w-full h-[650px] rounded-xl shadow"
/>

)

}