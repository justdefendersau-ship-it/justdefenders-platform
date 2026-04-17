// commandCenterStore.tsx
// Timestamp: 9 March 2026 21:06
// Commentary:
// Event-enabled command centre data bus.

"use client"

import { createContext,useContext,useState } from "react"

type Event = {
 type:string
 payload:any
}

type Location = {
 lat:number
 lng:number
}

type CommandCenterState = {

 selectedVehicle?:string
 selectedComponent?:string
 selectedLocation?:Location

 event?:Event

 setSelectedVehicle:(v:string)=>void
 setSelectedComponent:(c:string)=>void
 setSelectedLocation:(l:Location)=>void

 publishEvent:(type:string,payload?:any)=>void
}

const Context = createContext<CommandCenterState|null>(null)


export function CommandCenterProvider({children}:{children:React.ReactNode}){

 const [selectedVehicle,setSelectedVehicle] = useState<string>()
 const [selectedComponent,setSelectedComponent] = useState<string>()
 const [selectedLocation,setSelectedLocation] = useState<Location>()
 const [event,setEvent] = useState<Event>()

 function publishEvent(type:string,payload?:any){

  setEvent({
   type,
   payload
  })

 }

 return(

  <Context.Provider
   value={{
    selectedVehicle,
    selectedComponent,
    selectedLocation,
    event,
    setSelectedVehicle,
    setSelectedComponent,
    setSelectedLocation,
    publishEvent
   }}
  >

   {children}

  </Context.Provider>

 )

}

export function useCommandCenter(){

 const ctx = useContext(Context)

 if(!ctx){
  throw new Error("CommandCenterProvider missing")
 }

 return ctx
}