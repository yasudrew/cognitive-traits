"use client";

import { useEffect, useState } from "react";
import { Dot } from "./Dot";

type Props = { value: number; max: number; color: string; delay: number; label: string; pct: number; avgMarker?: boolean };

export function AnimBar({ value, max, color, delay, label, pct, avgMarker = false }: Props) {
  const [width, setWidth] = useState(0);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setShow(true), delay);
    const t2 = setTimeout(() => setWidth((value / max) * 100), delay + 80);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [value, max, delay]);
  return (
    <div style={{ opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(10px)", transition: "opacity .5s,transform .5s", marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", display: "flex", alignItems: "center", gap: 8 }}>
          <Dot color={color} /> {label}
        </span>
        <span style={{ fontSize: 17, fontWeight: 800, color, fontFeatureSettings: "'tnum'" }}>{pct}%</span>
      </div>
      <div style={{ position: "relative", height: 12, background: "rgba(0,0,0,0.05)", borderRadius: 999 }}>
        <div style={{ height: "100%", width: `${width}%`, background: color, borderRadius: 999, transition: "width 1s cubic-bezier(0.34,1.56,0.64,1)" }} />
        {avgMarker && <span className="avg-line" aria-hidden />}
      </div>
    </div>
  );
}
