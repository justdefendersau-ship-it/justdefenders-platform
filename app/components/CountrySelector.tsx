// CountrySelector.tsx
// Timestamp: 10 March 2026 15:05
// Commentary:
// Allows members to select their country context.

"use client"

import { useState,useEffect } from "react"

export default function CountrySelector(){

 const [countries,setCountries] = useState<any[]>([])
 const [selected,setSelected] = useState("")

 useEffect(()=>{

  fetch("/api/countries")
   .then(res=>res.json())
   .then(setCountries)

 },[])

 function changeCountry(code:string){

  setSelected(code)

  localStorage.setItem("country",code)

 }

 return(

  <div className="flex items-center gap-2">

   <span className="text-sm">
    Country
   </span>

   <select
    value={selected}
    onChange={(e)=>changeCountry(e.target.value)}
    className="border rounded px-2 py-1"
   >

    {countries.map(c=>(

     <option
      key={c.country_code}
      value={c.country_code}
     >
      {c.country_name}
     </option>

    ))}

   </select>

  </div>

 )
}