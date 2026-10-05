import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryIcon } from "@/components/Illustrations";
import { UI, type CategoryId } from "@/lib/content";
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
    <div className="fadein hero-top" style={{ paddingTop: 72, paddingBottom: 60 }}>
      <p style={{ fontSize: 13, fontWeight: 600, color: "var(--muted)", letterSpacing: 2, marginBottom: 20 }}>{u.heroSub}</p>
      <h1 className="hero-title" style={{ fontSize: 36, fontWeight: 900, color: "var(--text)", lineHeight: 1.3, marginBottom: 16 }}>
        {u.heroTitle1}
        <br className="sp-only" />
        {u.heroTitle2}
      </h1>
      <p className="hero-sub" style={{ fontSize: 15, color: "var(--sub)", lineHeight: 1.9, marginBottom: 40 }}>{u.heroDesc}</p>
      <Link className="primary-btn" href={localePath(lang, "/quiz")}>
        {u.startBtn}
        <span style={{ marginLeft: 8 }}>→</span>
      </Link>
      <p style={{ marginTop: 14, fontSize: 12, color: "var(--muted)" }}>{u.duration}</p>
      <div style={{ marginTop: 56, display: "flex", gap: 1, borderRadius: 12, overflow: "hidden", border: "1px solid var(--border)" }}>
        {cats.map((c, i) => (
          <div key={c.type} className="cat-card" style={{ flex: 1, padding: "20px 12px", textAlign: "center", background: "var(--surface)", borderRight: i < 2 ? "1px solid var(--border)" : "none" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
              <CategoryIcon type={c.type} size={36} />
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)" }}>{c.label}</div>
            <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>{c.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
