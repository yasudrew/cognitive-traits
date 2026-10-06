import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryIcon, CharacterSVG } from "@/components/Illustrations";
import { CATEGORIES, TYPE_IDS, UI, type CategoryId } from "@/lib/content";
import { isLang, localePath } from "@/lib/i18n";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const u = UI[lang];
  const cats: { label: string; sub: string; type: CategoryId }[] = [
    { label: u.catVisual, sub: u.catVisualSub, type: "visual" },
    { label: u.catVerbal, sub: u.catVerbalSub, type: "verbal" },
    { label: u.catAuditory, sub: u.catAuditorySub, type: "auditory" },
  ];
  return (
    <div className="fadein hero-top" style={{ paddingTop: 64, paddingBottom: 60 }}>
      <p className="eyebrow">{u.heroSub}</p>
      <h1 className="hero-title" style={{ fontSize: 32, fontWeight: 700, color: "var(--text)", lineHeight: 1.3, marginBottom: 16 }}>
        {u.heroTitle1}
        <br className="sp-only" />
        <span className="accent">{u.heroTitle2}</span>
      </h1>
      <p className="hero-sub" style={{ fontSize: 16, color: "var(--sub)", lineHeight: 1.9, marginBottom: 40 }}>{u.heroDesc}</p>
      <Link className="primary-btn" href={localePath(lang, "/quiz")}>
        {u.startBtn}
        <span style={{ marginLeft: 8 }}>→</span>
      </Link>
      <p style={{ marginTop: 16, fontSize: 12, color: "var(--muted)" }}>{u.duration}</p>
      <div className="char-row" aria-hidden>
        {TYPE_IDS.map((id) => (
          <div key={id}>
            <CharacterSVG type={id} />
          </div>
        ))}
      </div>
      <div className="cat-cards">
        {cats.map((c) => (
          <div key={c.type} className="cat-card" style={{ background: `${CATEGORIES.find((x) => x.id === c.type)?.color ?? "#999"}1C` }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
              <CategoryIcon type={c.type} size={44} />
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text)" }}>{c.label}</div>
            <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{c.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
