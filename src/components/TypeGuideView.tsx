import { getType, type TypeId } from "@/lib/content";
import { GUIDES, GUIDE_LABELS, GUIDE_SECTIONS } from "@/lib/guides";
import type { Lang } from "@/lib/i18n";
import { CharacterSVG } from "./Illustrations";

/** タイプの詳しい解説（得意・つまずき・学び方・伝え方など） */
export function TypeGuideView({ id, lang, heading }: { id: TypeId; lang: Lang; heading?: string }) {
  const tp = getType(id, lang);
  const g = GUIDES[id][lang];
  const labels = GUIDE_LABELS[lang];
  return (
    <section className="card">
      {heading && <h2 className="section-title">{heading}</h2>}
      <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 14 }}>
        <CharacterSVG type={id} size={56} />
        <div>
          <div style={{ fontSize: 17, fontWeight: 900, color: tp.color }}>{tp.label}</div>
          <div style={{ fontSize: 11, color: "var(--muted)" }}>
            {tp.category}・{tp.sub}
          </div>
        </div>
      </div>
      <p className="about-body" style={{ fontSize: 14, color: "var(--sub)", lineHeight: 1.9, marginBottom: 20 }}>{g.summary}</p>
      <div className="guide-grid">
        {GUIDE_SECTIONS.map((key) => (
          <div key={key} className="guide-block" style={{ borderColor: `${tp.color}22` }}>
            <h3 style={{ fontSize: 13, fontWeight: 800, color: tp.color, marginBottom: 8 }}>{labels[key]}</h3>
            <ul>
              {g[key].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
