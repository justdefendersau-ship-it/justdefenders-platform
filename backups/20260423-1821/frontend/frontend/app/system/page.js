"use client";
import InfoTip from "../../components/InfoTip";

export default function SystemPanel(){

  return (
    <div>

      <h1>
        System Diagnostics
        <InfoTip text="Displays backend activity including harvester, crawler, and system logs." />
      </h1>

      <p style={{color:"#888"}}>
        Real-time monitoring of system state
      </p>

    </div>
  );
}