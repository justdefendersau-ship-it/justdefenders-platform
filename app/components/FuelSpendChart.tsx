"use client"

import {

  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer

} from "recharts"

export default function FuelSpendChart({

  data

}:{ data:any[] }){

  return (

    <div className="bg-white p-6 rounded-xl shadow h-80">

      <h2 className="text-xl font-semibold mb-4">
        Fuel Spend Trend
      </h2>

      <ResponsiveContainer width="100%" height="100%">

        <LineChart data={data}>

          <XAxis dataKey="date"/>

          <YAxis/>

          <Tooltip/>

          <Line
            type="monotone"
            dataKey="total_cost"
            stroke="#10b981"
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  )

}