import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CharacterSVG } from "@/components/Illustrations";
import { TypeDetail } from "@/components/TypeDetail";
import { TYPE_IDS, UI, getType, isTypeId } from "@/lib/content";
import { isLang, localePath } from "@/lib/i18n";
import { alternates } from "@/lib/site";

export const generateStaticParams = () => TYPE_IDS.map((id) => ({ id }));
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/[lang]/types/[id]">): Promise<Metadata> {
  const { lang, id } = await params;
  if (!isLang(lang) || !isTypeId(id)) return {};
  const tp = getType(id, lang);
  return {
    title: lang === "ja" ? `${tp.label}（${tp.category}）` : `${tp.label} (${tp.category})`,
    description: tp.desc,
    alternates: alternates(lang, `/types/${id}`),
  };
}

export default async function TypeDetailPage({ params }: PageProps<"/[lang]/types/[id]">) {
  const { lang, id } = await params;
  if (!isLang(lang) || !isTypeId(id)) notFound();
  const u = UI[lang];
  const tp = getType(id, lang);
  const others = TYPE_IDS.filter((x) => x !== id).map((x) => getType(x, lang));
  return (
    <div className="fadein" style={{ paddingTop: 32, paddingBottom: 40 }}>
      <div className="result-hero" style={{ padding: "36px 24px", borderRadius: 16, background: tp.bg, border: `1px solid ${tp.color}18`, marginBottom: 24, textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
          <CharacterSVG type={id} size={100} />
        </div>
        <span style={{ display: "inline-block", padding: "4px 12px", borderRadius: 4, fontSize: 11, fontWeight: 600, color: tp.color, background: `${tp.color}14`, marginBottom: 10 }}>{tp.category}</span>
        <h1 className="result-top-label" style={{ fontSize: 26, fontWeight: 900, color: tp.color, marginBottom: 4 }}>{tp.label}</h1>
        <p style={{ fontSize: 13, color: "var(--muted)" }}>{tp.sub}</p>
      </div>
      <div className="card">
        <p className="about-body" style={{ fontSize: 14, color: "var(--sub)", lineHeight: 2, marginBottom: 16 }}>{tp.desc}</p>
        <TypeDetail type={tp} lang={lang} />
      </div>
      <div style={{ textAlign: "center", margin: "24px 0 36px" }}>
        <Link className="primary-btn" href={localePath(lang, "/quiz")}>
          {u.tryBtn}
          <span style={{ marginLeft: 8 }}>→</span>
        </Link>
      </div>
      <h2 className="section-title">{u.otherTypes}</h2>
      <div className="type-grid">
        {others.map((o) => (
          <Link key={o.id} className="type-link-card" href={localePath(lang, `/types/${o.id}`)}>
            <CharacterSVG type={o.id} size={44} />
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: o.color }}>{o.label}</div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>{o.category}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
