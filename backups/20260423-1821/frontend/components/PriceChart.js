"use client";
import {
  LineChart, Line, XAxis, YAxis,
  Tooltip, Legend, ResponsiveContainer
} from "recharts";

export default function PriceChart({ suppliers }){

  if(!suppliers || suppliers.length===0) return null;

  const map = {};

  suppliers.forEach(s=>{
    s.history.forEach(h=>{
      const key = new Date(h.timestamp).toLocaleTimeString();
      if(!map[key]) map[key] = { time:key };
      map[key][s.supplier] = h.price;
    });
  });

  const data = Object.values(map);

  return (
    <div style={{width:"100%",height:320,marginTop:20}}>

      <ResponsiveContainer>
        <LineChart data={data}>

          <XAxis dataKey="time" stroke="#888"/>
          <YAxis stroke="#888"/>
          <Tooltip contentStyle={{background:"#111",border:"1px solid #333"}}/>
          <Legend />

          {suppliers.map((s,i)=>(
            <Line
              key={i}
              type="monotone"
              dataKey={s.supplier}
              stroke={i===0?"#00e5ff":"#ff9800"}
              strokeWidth={3}
              dot={false}
              style={{filter:"drop-shadow(0 0 6px rgba(0,255,255,0.6))"}}
            />
          ))}

        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}