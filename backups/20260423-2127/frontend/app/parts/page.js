"use client";
import { useState } from "react";
import Card from "../../components/Card";
import InfoTip from "../../components/InfoTip";

export default function PartsPage(){

  const [part,setPart]=useState("");
  const [data,setData]=useState(null);

  const search=async()=>{
    const res = await fetch("/api/decision?partNumber="+part);
    const json = await res.json();
    setData(json);
  };

  return (
    <div>

      <Card>
        <h2>
          Parts Search
          <InfoTip text="Search parts and compare suppliers." />
        </h2>

        <input value={part} onChange={e=>setPart(e.target.value)} />
        <button onClick={search}>Search</button>
      </Card>

      {data && (
        <Card>
          <h3>Decision</h3>
          <pre>{JSON.stringify(data.decision,null,2)}</pre>
        </Card>
      )}

    </div>
  );
}