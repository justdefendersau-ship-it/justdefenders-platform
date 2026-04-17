"use client"

import { useEffect, useState } from "react"

export default function AnimatedCounter({
  value
}:{ value:number }) {

  const [count,setCount] = useState(0)

  useEffect(()=>{

    let start=0

    const interval=setInterval(()=>{

      start+=Math.ceil(value/30)

      if(start>=value){
        start=value
        clearInterval(interval)
      }

      setCount(start)

    },30)

  },[value])

  return <span>{count}</span>

}