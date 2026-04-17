"use client"

import dynamic from "next/dynamic"

const LineChart = dynamic(
() => import("recharts").then(m => m.LineChart),
{ ssr:false }
)

const Line = dynamic(
() => import("recharts").then(m => m.Line),
{ ssr:false }
)

const XAxis = dynamic(
() => import("recharts").then(m => m.XAxis),
{ ssr:false }
)

const YAxis = dynamic(
() => import("recharts").then(m => m.YAxis),
{ ssr:false }
)

const CartesianGrid = dynamic(
() => import("recharts").then(m => m.CartesianGrid),
{ ssr:false }
)

const Tooltip = dynamic(
() => import("recharts").then(m => m.Tooltip),
{ ssr:false }
)

export default function FailureTimelineChart({ data }:{ data:any[] }){

return(

<LineChart
width={420}
height={250}
data={data}
>

<CartesianGrid strokeDasharray="3 3" />

<XAxis dataKey="date" />

<YAxis />

<Tooltip />

<Line
type="monotone"
dataKey="failures"
stroke="#ef4444"
strokeWidth={2}
/>

</LineChart>

)

}