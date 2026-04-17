"use client"

/*
Timestamp 9 March 2026 09:40
Realtime Location Tracker
*/

import { useEffect } from "react"

export default function LocationTracker(){

 useEffect(()=>{

  const watch = navigator.geolocation.watchPosition(

   async (pos)=>{

    const coords = pos.coords

    await fetch("/api/location/update",{

     method:"POST",

     headers:{
      "Content-Type":"application/json"
     },

     body:JSON.stringify({

      latitude:coords.latitude,
      longitude:coords.longitude,
      altitude:coords.altitude,

      speed:coords.speed,
      heading:coords.heading,
      accuracy:coords.accuracy

     })

    })

   },

   (err)=>console.error(err),

   {
    enableHighAccuracy:true
   }

  )

  return ()=>navigator.geolocation.clearWatch(watch)

 },[])

 return null

}