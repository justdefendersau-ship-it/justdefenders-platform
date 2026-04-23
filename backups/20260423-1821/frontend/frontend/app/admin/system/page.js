"use client";

import { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

export default function System(){

  const [history,setHistory]=useState([]);
  const [part,setPart]=useState("NRC9448");

  async function load(){
    try{
      const h = await fetch("/api/history?part="+part).then(r=>r.json());

      console.log("RAW HISTORY:", h); // 🔥 DEBUG

      // FORCE VALID STRUCTURE
      const grouped = {};

      h.forEach(r=>{
        if(!grouped[r.timestamp]){
          grouped[r.timestamp] = {
            timestamp: r.timestamp,
            Repco: null,
            Britpart: null
          };
        }

        grouped[r.timestamp][r.supplier] = r.price;
      });

      const finalData = Object.values(grouped);

      console.log("CHART DATA:", finalData); // 🔥 DEBUG

      setHistory(finalData);

    }catch(e){
      console.log("LOAD ERROR", e);
    }
  }

  useEffect(()=>{
    load();
  },[part]);

  return (
    <div style={{
      height:"100vh",
      display:"flex",
      flexDirection:"column",
      background:"#000",
      color:"#fff"
    }}>

      {/* HEADER */}
      <div style={{padding:20}}>
        <h1>System Control Panel</h1>

        <input
          value={part}
          onChange={e=>setPart(e.target.value)}
        />
      </div>

      {/* MAIN CONTENT */}
      <div style={{
        flex:1,
        padding:20,
        overflow:"auto"
      }}>

        {/* CHART */}
        <div style={{
          height:400,
          background:"#111",
          padding:10
        }}>

          <h3>Chart Debug</h3>

          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={history}>
              <XAxis dataKey="timestamp" hide />
              <YAxis />
              <Tooltip />

              <Line dataKey="Repco" stroke="#00cfff" />
              <Line dataKey="Britpart" stroke="#ffaa00" />

            </LineChart>
          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}