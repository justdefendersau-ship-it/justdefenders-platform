"use client";

import { useState } from "react";

export default function HelpTooltip({ text }: { text: string }) {

  const [open, setOpen] = useState(false);

  return (
    <span style={{ position: "relative", marginLeft: 8 }}>

      <span
        onClick={() => setOpen(!open)}
        style={{
          cursor: "pointer",
          background: "#444",
          color: "white",
          borderRadius: "50%",
          padding: "2px 6px",
          fontSize: 12
        }}
      >
        i
      </span>

      {open && (
        <div style={{
          position: "absolute",
          top: 25,
          left: 0,
          background: "#222",
          color: "white",
          padding: 10,
          borderRadius: 6,
          width: 250,
          zIndex: 1000,
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
        }}>
          {text}
        </div>
      )}

    </span>
  );
}
