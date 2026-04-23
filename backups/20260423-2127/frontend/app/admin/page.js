"use client";

import { useEffect, useState } from "react";
import InfoTip from "../../components/InfoTip";
import Card from "../../components/Card";

export default function Admin(){

  const [system,setSystem]=useState({services:{}});
  const [logs,setLogs]=useState([]);

  useEffect(()=>{

    let mounted = true;

    const loadSystem = async()=>{
      try{
        const res = await fetch(window.location.origin + "/api/system");
        const json = await res.json();
        if(mounted) setSystem(json);
      }catch(e){}
    };

    const loadLogs = async()=>{
      try{
        const res = await fetch(window.location.origin + "/api/logs");
        const json = await res.json();
        if(mounted) setLogs(json.reverse());
      }catch(e){}
    };

    loadSystem();
    loadLogs();

    const interval = setInterval(()=>{
      loadSystem();
      loadLogs();
    },2000);

    return ()=>{
      mounted = false;
      clearInterval(interval);
    };

  },[]);

  const light=(v)=>{
    let color="#400";
    if(v===true) color="#0f0";
    if(v==="warn") color="#ff0";

    return {
      width:14,
      height:14,
      borderRadius:7,
      background:color,
      marginRight:8,
      boxShadow:"0 0 8px "+color
    };
  };

  const getColor = (line) => {
    if(line.includes("ERROR")) return "#ff4d4d";
    if(line.includes("WARN")) return "#ffcc00";
    if(line.includes("Repco")) return "#00ccff";
    if(line.includes("Britpart")) return "#ff9900";
    return "#aaa";
  };

  return (
    <div>

      {/* HEADER */}
      <div style={{marginBottom:20}}>
        <h1 style={{marginBottom:5}}>Admin Dashboard</h1>
        <div style={{color:"#666",fontSize:13}}>
          Real-time system monitoring and diagnostics
          <InfoTip text="Displays system health, logs, storage, and service activity in real time." />
        </div>
      </div>

      {/* EMAIL + STORAGE */}
      <Card>
        <div style={{display:"flex",justifyContent:"space-between"}}>

          <div>
            <div style={{fontSize:13,color:"#888"}}>Email</div>
            <div style={{fontSize:18}}>
              {system.email?.unread ?? 0} unread
            </div>
          </div>

          <div>
            <div style={{fontSize:13,color:"#888"}}>Storage</div>
            <div style={{fontSize:18}}>
              {system.storage?.percent ?? 0}%
            </div>
          </div>

        </div>
      </Card>

      {/* SERVICE LIGHTS */}
      <Card>
        <div style={{marginBottom:10,fontSize:13,color:"#888"}}>
          Services
        </div>

        <div style={{
          display:"flex",
          flexWrap:"wrap",
          gap:"18px"
        }}>
          {Object.entries(system.services).map(([k,v],i)=>(
            <div key={i} style={{
              display:"flex",
              alignItems:"center",
              minWidth:"150px"
            }}>
              <div style={light(v)}></div>
              <span style={{fontSize:12}}>{k}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* LOG PANEL */}
      <Card>
        <div style={{marginBottom:10,fontSize:13,color:"#888"}}>
          Live System Logs
        </div>

        <div style={{
          height:420,
          overflow:"auto",
          fontFamily:"monospace",
          fontSize:12,
          background:"#050505",
          padding:10,
          border:"1px solid #111"
        }}>
          {logs.map((l,i)=>(
            <div key={i} style={{color:getColor(l)}}>
              {l}
            </div>
          ))}
        </div>
      </Card>

    </div>
  );
}