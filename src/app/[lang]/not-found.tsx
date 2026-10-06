"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CharacterSVG } from "@/components/Illustrations";
import { localePath, type Lang } from "@/lib/i18n";
import { SITE_TEXT } from "@/lib/site-text";

export default function NotFound() {
  // not-found には params が渡らないため、URLから言語を判定する
  const lang: Lang = /^\/en(\/|$)/.test(usePathname()) ? "en" : "ja";
  const t = SITE_TEXT[lang];
  return (
    <div className="fadein" style={{ padding: "64px 0", textAlign: "center" }}>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
        <CharacterSVG type="fantasy" size={120} />
      </div>
      <p style={{ fontSize: 14, fontWeight: 700, color: "var(--brand)", letterSpacing: ".08em" }}>404</p>
      <h1 style={{ fontSize: 24, fontWeight: 700, margin: "8px 0" }}>{t.notFoundTitle}</h1>
      <p style={{ fontSize: 16, color: "var(--sub)", marginBottom: 32 }}>{t.notFoundLead}</p>
      <Link className="primary-btn" href={localePath(lang, "/")}>
        {t.backHome}
      </Link>
    </div>
  );
}
