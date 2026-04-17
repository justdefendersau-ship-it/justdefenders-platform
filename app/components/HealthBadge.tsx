"use client"

export default function HealthBadge({

  score

}:{ score:number }){

  const color =
    score > 85 ? "bg-green-500"
    : score > 70 ? "bg-yellow-500"
    : "bg-red-500"

  return (

    <span className={`px-3 py-1 text-white rounded ${color}`}>

      Health {score}

    </span>

  )

}