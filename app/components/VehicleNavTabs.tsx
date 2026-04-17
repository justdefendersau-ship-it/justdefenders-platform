"use client"

/*
Vehicle Intelligence Navigation Tabs
Timestamp: 13 March 2026 23:11
OEM-style vehicle module navigation
*/

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function VehicleNavTabs({vin}:{vin:string}){

const pathname = usePathname()

function tabStyle(path:string){

if(pathname === path)
return "px-4 py-2 bg-gray-800 rounded-lg font-semibold"

return "px-4 py-2 text-gray-400 hover:text-white"

}

return(

<div className="flex gap-4 border-b border-gray-800 pb-3">

<Link
href={`/vehicle/${vin}`}
className={tabStyle(`/vehicle/${vin}`)}
>
Overview
</Link>

<Link
href={`/vehicle/${vin}/fuel`}
className={tabStyle(`/vehicle/${vin}/fuel`)}
>
Fuel
</Link>

<Link
href={`/vehicle/${vin}/maintenance`}
className={tabStyle(`/vehicle/${vin}/maintenance`)}
>
Maintenance
</Link>

<Link
href={`/vehicle/${vin}/reliability`}
className={tabStyle(`/vehicle/${vin}/reliability`)}
>
Reliability
</Link>

<Link
href={`/vehicle/${vin}/ownership`}
className={tabStyle(`/vehicle/${vin}/ownership`)}
>
Ownership
</Link>

<Link
href={`/trips?vin=${vin}`}
className="px-4 py-2 text-gray-400 hover:text-white"
>
Trips
</Link>

</div>

)

}