"use client"

export default function SupplierLeaderboard({ suppliers }:{ suppliers:any[] }){

return(

<table className="w-full text-sm">

<thead>

<tr className="text-left border-b">

<th className="pb-2">Supplier</th>
<th>Reliability</th>
<th>Failure Rate</th>
<th>Vehicles</th>

</tr>

</thead>

<tbody>

{suppliers?.map((s,i)=>{

let color="text-green-600"

if(s.reliability < 80) color="text-yellow-600"
if(s.reliability < 60) color="text-red-600"

return(

<tr key={i} className="border-b">

<td className="py-2">
{s.supplier}
</td>

<td className={color}>
{s.reliability}
</td>

<td>
{s.failureRate}%
</td>

<td>
{s.vehicles}
</td>

</tr>

)

})}

</tbody>

</table>

)

}