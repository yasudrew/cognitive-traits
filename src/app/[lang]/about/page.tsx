import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Dot } from "@/components/Dot";
import { CATEGORIES, TYPE_TAGLINE, UI, getType } from "@/lib/content";
import { isLang, localePath } from "@/lib/i18n";
import { OFFICIAL_TEST_URL, alternates } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const u = UI[lang];
  return { title: u.aboutTitle, description: `${u.aboutP1}${u.aboutP1b}${u.aboutP1c}`, alternates: alternates(lang, "/about") };
}

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const u = UI[lang];
  const catDesc = { visual: u.catVisualDesc, verbal: u.catVerbalDesc, auditory: u.catAuditoryDesc } as const;
  const strong = { color: "var(--text)" } as const;
  return (
    <div className="fadein" style={{ paddingTop: 32, paddingBottom: 40 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>{u.aboutTitle}</h1>
      <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: 24 }}>{u.aboutSub}</p>
      <div className="card">
        <p className="about-body" style={{ fontSize: 16, color: "var(--sub)", lineHeight: 2, marginBottom: 16 }}>
          {u.aboutP1}
          <strong style={strong}>{u.aboutP1b}</strong>
          {u.aboutP1c}
        </p>
        <p className="about-body" style={{ fontSize: 16, color: "var(--sub)", lineHeight: 2 }}>{u.aboutP2}</p>
      </div>
      <div className="card">
        <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>{u.about3title}</h2>
        <p style={{ fontSize: 14, color: "var(--sub)", lineHeight: 1.9, marginBottom: 16 }}>{u.about3desc}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {CATEGORIES.map((c) => (
            <div key={c.id} style={{ padding: "16px 18px", borderRadius: 10, background: `${c.color}08`, border: `1px solid ${c.color}12` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
                <Dot color={c.color} size={8} />
                <span style={{ fontSize: 14, fontWeight: 700, color: c.color }}>{c.label[lang]}</span>
                <span style={{ fontSize: 12, color: "var(--muted)" }}>— {catDesc[c.id]}</span>
              </div>
              {c.ids.map((id) => {
                const tp = getType(id, lang);
                return (
                  <p key={id} style={{ fontSize: 12, color: "var(--sub)", lineHeight: 1.8, paddingLeft: 16 }}>
                    <Link className="text-link" href={localePath(lang, `/types/${id}`)}>
                      {tp.label}
                    </Link>{" "}
                    — {TYPE_TAGLINE[id][lang]}
                  </p>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="card">
        <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>{u.aboutBenTitle}</h2>
        <div style={{ fontSize: 14, color: "var(--sub)", lineHeight: 2 }}>
          <p style={{ marginBottom: 12 }}>
            {u.aboutBen1a}
            <strong style={strong}>{u.aboutBen1b}</strong>
            {u.aboutBen1c}
          </p>
          <p style={{ marginBottom: 12 }}>
            {u.aboutBen2a}
            <strong style={strong}>{u.aboutBen2b}</strong>
            {u.aboutBen2c}
          </p>
          <p>
            {u.aboutBen3a}
            <strong style={strong}>{u.aboutBen3b}</strong>
            {u.aboutBen3c}
          </p>
        </div>
      </div>
      <div className="card">
        <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>{u.aboutThisTitle}</h2>
        <p style={{ fontSize: 14, color: "var(--sub)", lineHeight: 2, marginBottom: 8 }}>{u.aboutThisP}</p>
        <p style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.8 }}>
          {u.aboutThisNote}{" "}
          <a className="text-link" href={OFFICIAL_TEST_URL} target="_blank" rel="noopener noreferrer">
            {u.officialLink}
          </a>
        </p>
      </div>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 8, flexWrap: "wrap" }}>
        <Link className="primary-btn" href={localePath(lang, "/quiz")}>
          {u.tryBtn}
        </Link>
        <Link className="secondary-btn" href={localePath(lang, "/types")}>
          {u.typesBtn}
        </Link>
      </div>
    </div>
  );
}
