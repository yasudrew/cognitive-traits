import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Dot } from "@/components/Dot";
import { CharacterSVG } from "@/components/Illustrations";
import { TypeDetail } from "@/components/TypeDetail";
import { CATEGORIES, UI, getType } from "@/lib/content";
import { isLang, localePath } from "@/lib/i18n";
import { alternates } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/types">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const u = UI[lang];
  return { title: u.typesPageTitle, description: u.typesPageDesc, alternates: alternates(lang, "/types") };
}

export default async function TypesPage({ params }: PageProps<"/[lang]/types">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const u = UI[lang];
  return (
    <div className="fadein" style={{ paddingTop: 32, paddingBottom: 40 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>{u.typesPageTitle}</h1>
      <p style={{ fontSize: 14, color: "var(--sub)", lineHeight: 1.8, marginBottom: 40 }}>{u.typesPageDesc}</p>
      {CATEGORIES.map((c) => (
        <section key={c.id} style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <Dot color={c.color} size={8} />
            <h2 style={{ fontSize: 14, fontWeight: 700, color: "var(--muted)", letterSpacing: 1 }}>{c.label[lang]}</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {c.ids.map((id) => {
              const tp = getType(id, lang);
              return (
                <div key={id} className="card" style={{ background: tp.bg, borderColor: `${tp.color}12` }}>
                  <div style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 12 }}>
                    <CharacterSVG type={id} size={72} />
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: 16, fontWeight: 700, color: tp.color }}>
                        <Link href={localePath(lang, `/types/${id}`)} style={{ textDecoration: "none" }}>
                          {tp.label}
                        </Link>
                      </h3>
                      <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 8 }}>{tp.sub}</div>
                      <p style={{ fontSize: 14, color: "var(--sub)", lineHeight: 1.7 }}>{tp.desc}</p>
                    </div>
                  </div>
                  <div style={{ borderTop: `1px solid ${tp.color}10`, paddingTop: 12 }}>
                    <TypeDetail type={tp} lang={lang} />
                    <p style={{ marginTop: 8, fontSize: 12 }}>
                      <Link className="text-link" href={localePath(lang, `/types/${id}`)}>
                        {u.typeDetailLink} →
                      </Link>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}
      <div style={{ textAlign: "center", marginTop: 8 }}>
        <Link className="primary-btn" href={localePath(lang, "/quiz")}>
          {u.tryBtn}
        </Link>
      </div>
    </div>
  );
}
