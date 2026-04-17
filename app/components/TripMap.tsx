"use client"

/*
Timestamp 9 March 2026 05:20
Trip Map
*/

import { useEffect } from "react"
import maplibregl from "maplibre-gl"

export default function TripMap(){

 useEffect(()=>{

  new maplibregl.Map({

   container:"trip-map",
   style:"https://demotiles.maplibre.org/style.json",
   center:[151.2093,-33.8688],
   zoom:4

  })

 },[])

 return(

  <div
   id="trip-map"
   style={{height:"500px"}}
  />

 )
}