"use client";

import { useState } from "react";
import Link from "next/link";
import { UI, type TypeMeta, type TypeText } from "@/lib/content";
import { localePath, type Lang } from "@/lib/i18n";
import { MAX_PER_TYPE } from "@/lib/scoring";
import { Dot } from "./Dot";
import { CharacterSVG } from "./Illustrations";
import { TypeDetail } from "./TypeDetail";

type Row = TypeMeta & TypeText & { score: number };

export function TypeAccordion({ rows, lang }: { rows: Row[]; lang: Lang }) {
  const u = UI[lang];
  const [openId, setOpenId] = useState<string | null>(null);
  const level = (s: number) => {
    const r = s / MAX_PER_TYPE;
    if (r >= 0.84) return u.levelStrong;
    if (r >= 0.64) return u.levelMod;
    if (r >= 0.44) return u.levelAvg;
    return u.levelLow;
  };

  return (
    <div className="card" style={{ padding: "12px 0" }}>
      <h2 className="section-title" style={{ padding: "0 24px", marginBottom: 8 }}>
        {u.detailTitle}
      </h2>
      {rows.map((tp) => {
        const open = openId === tp.id;
        return (
          <div key={tp.id} style={{ borderBottom: "1px solid var(--border)" }}>
            <button onClick={() => setOpenId(open ? null : tp.id)} className="accordion-row" aria-expanded={open}>
              <Dot color={tp.color} />
              <div style={{ flex: 1, textAlign: "left" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text)" }}>{tp.label}</div>
                <div style={{ fontSize: 11, color: "var(--muted)" }}>{tp.sub}</div>
              </div>
              <div style={{ textAlign: "right", marginRight: 4 }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: tp.color }}>
                  {tp.score}
                  <span style={{ fontSize: 11, fontWeight: 400, color: "var(--muted)" }}> / {MAX_PER_TYPE}</span>
                </div>
                <div style={{ fontSize: 10, color: "var(--muted)" }}>{level(tp.score)}</div>
              </div>
              <svg width="12" height="12" viewBox="0 0 12 12" style={{ transition: "transform .3s", transform: open ? "rotate(180deg)" : "rotate(0)", flexShrink: 0 }}>
                <path d="M2 4.5L6 8.5L10 4.5" stroke="#999" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              </svg>
            </button>
            <div style={{ overflow: "hidden", transition: "max-height .35s ease,opacity .25s,padding .25s", maxHeight: open ? 700 : 0, opacity: open ? 1 : 0, padding: open ? "8px 24px 20px" : "0 24px" }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
                <CharacterSVG type={tp.id} size={80} />
              </div>
              <p style={{ fontSize: 13, color: "var(--sub)", lineHeight: 1.8, marginBottom: 12 }}>{tp.desc}</p>
              <TypeDetail type={tp} lang={lang} />
              <p style={{ marginTop: 12, fontSize: 12 }}>
                <Link className="text-link" href={localePath(lang, `/types/${tp.id}`)}>
                  {u.typeDetailLink} →
                </Link>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
