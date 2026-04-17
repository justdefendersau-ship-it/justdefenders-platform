"use client"

import { useParams } from "next/navigation"

export default function VehiclePage(){

 const params = useParams()

 return (
  <div style={{padding:"40px"}}>
   <h1>Vehicle Page</h1>
   <p>ID: {params.id}</p>
  </div>
 )

}