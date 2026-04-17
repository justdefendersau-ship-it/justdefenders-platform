"use client"

export default function Notifications(){

const alerts=[

"High engine temperature detected",
"Failure cluster detected",
"Telemetry anomaly detected"

]

return(

<div className="bg-white dark:bg-gray-900 p-4 rounded shadow">

<h3 className="font-semibold mb-2">
Notifications
</h3>

<ul className="text-sm space-y-1">

{alerts.map((a,i)=>(

<li key={i}>
⚠ {a}
</li>

))}

</ul>

</div>

)

}