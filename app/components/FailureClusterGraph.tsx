"use client"

import dynamic from "next/dynamic"

const ForceGraph2D = dynamic(
() => import("react-force-graph-2d"),
{ ssr:false }
)

export default function FailureClusterGraph({ graph }:{ graph:any }){

return(

<div className="h-56">

<ForceGraph2D
graphData={graph}
nodeAutoColorBy="group"
linkDirectionalParticles={2}
linkDirectionalParticleSpeed={0.003}
nodeRelSize={6}
/>

</div>

)

}