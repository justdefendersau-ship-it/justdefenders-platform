"use client";
import { useState } from "react";

export default function InfoTip({ text }){

  const [show,setShow]=useState(false);

  return (
    <span
      style={{marginLeft:8,color:"#0af",cursor:"pointer"}}
      onMouseEnter={()=>setShow(true)}
      onMouseLeave={()=>setShow(false)}
    >
      ?
      {show && (
        <div style={{
          position:"absolute",
          background:"#111",
          border:"1px solid #333",
          padding:10,
          marginTop:5,
          fontSize:12,
          color:"#ccc",
          maxWidth:250,
          zIndex:100
        }}>
          {text}
        </div>
      )}
    </span>
  );
}