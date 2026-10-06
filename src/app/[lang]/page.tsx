import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryIcon, CharacterSVG } from "@/components/Illustrations";
import { CATEGORIES, TYPE_IDS, TYPE_TAGLINE, UI, getType, type CategoryId } from "@/lib/content";
import { isLang, localePath } from "@/lib/i18n";
import { SITE_TEXT } from "@/lib/site-text";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const u = UI[lang];
  const t = SITE_TEXT[lang];
  const cats: { label: string; sub: string; type: CategoryId }[] = [
    { label: u.catVisual, sub: u.catVisualSub, type: "visual" },
    { label: u.catVerbal, sub: u.catVerbalSub, type: "verbal" },
    { label: u.catAuditory, sub: u.catAuditorySub, type: "auditory" },
  ];
  // よくある質問を検索結果にリッチ表示させるための構造化データ
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <div className="fadein home-page">
      <section className="hero-top" style={{ paddingTop: 64, paddingBottom: 16 }}>
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
              <div className="cat-icon">
                <CategoryIcon type={c.type} size={44} />
              </div>
              <div className="cat-label">{c.label}</div>
              <div className="cat-sub">{c.sub}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="home-section">
        <h2 className="home-h2">{t.typesTitle}</h2>
        <p className="home-lead">{t.typesLead}</p>
        <div className="type-grid">
          {TYPE_IDS.map((id) => {
            const tp = getType(id, lang);
            return (
              <Link key={id} className="type-link-card" href={localePath(lang, `/types/${id}`)}>
                <CharacterSVG type={id} size={64} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, color: "var(--muted)" }}>{tp.category}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: tp.color }}>{tp.label}</div>
                  <div style={{ fontSize: 14, color: "var(--sub)", lineHeight: 1.6 }}>{TYPE_TAGLINE[id][lang]}</div>
                </div>
                <span aria-hidden style={{ color: "var(--muted)" }}>›</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="home-section">
        <h2 className="home-h2">{t.featuresTitle}</h2>
        <div className="feature-list">
          {t.features.map((f, i) => (
            <div key={f.title} className="card feature-card">
              <span className="feature-num">{String(i + 1).padStart(2, "0")}</span>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, lineHeight: 1.5 }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: "var(--sub)" }}>{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="home-section">
        <h2 className="home-h2">{t.stepsTitle}</h2>
        <ol className="steps">
          {t.steps.map((s, i) => (
            <li key={s.title} className="step">
              <span className="step-num">{i + 1}</span>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: "var(--sub)" }}>{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="home-section faq-section">
        <h2 className="home-h2">{t.faqTitle}</h2>
        <div className="faq">
          {t.faq.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </section>

      <section className="home-section final-cta">
        <h2 className="home-h2" style={{ marginBottom: 8 }}>{t.finalTitle}</h2>
        <p className="home-lead">{t.finalLead}</p>
        <Link className="primary-btn" href={localePath(lang, "/quiz")}>
          {u.startBtn}
          <span style={{ marginLeft: 8 }}>→</span>
        </Link>
      </section>
    </div>
  );
}
