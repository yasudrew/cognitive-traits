import Link from "next/link";
import { CATEGORIES, UI, getType } from "@/lib/content";
import { fill, localePath, type Lang } from "@/lib/i18n";
import { MAX_PER_TYPE, rank, toPercent, type Scores } from "@/lib/scoring";
import { OFFICIAL_TEST_URL } from "@/lib/site";
import { AnimBar } from "./AnimBar";
import { CharacterSVG } from "./Illustrations";
import { ShareButtons } from "./ShareButtons";
import { TypeAccordion } from "./TypeAccordion";

type Props = { scores: Scores; lang: Lang; shareUrl: string };

export function ResultView({ scores, lang, shareUrl }: Props) {
  const u = UI[lang];
  const { sorted, top: topIds, next: nextId } = rank(scores);
  const types = sorted.map((id) => ({ ...getType(id, lang), score: scores[id] }));
  const topTypes = types.filter((t) => topIds.includes(t.id));
  const top = topTypes[0];
  const next = nextId ? getType(nextId, lang) : null;
  const single = topTypes.length === 1;
  const topLabels = topTypes.map((t) => t.label).join("・");
  const shareText = fill(single ? u.shareText : u.shareTextTied, topLabels);

  return (
    <div className="fadein" style={{ paddingTop: 32, paddingBottom: 40 }}>
      <div className="result-hero" style={{ padding: "36px 24px", borderRadius: 16, background: single ? top.bg : "var(--surface)", border: `1px solid ${single ? top.color + "18" : "var(--border)"}`, marginBottom: 24, textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: single ? 0 : 16, marginBottom: 8 }}>
          {topTypes.map((tp) => (
            <CharacterSVG key={tp.id} type={tp.id} size={topTypes.length > 2 ? 72 : single ? 100 : 88} />
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
          {topTypes.map((tp) => (
            <span key={tp.id} style={{ display: "inline-block", padding: "4px 12px", borderRadius: 4, fontSize: 11, fontWeight: 600, color: tp.color, background: `${tp.color}14` }}>
              {tp.category}
            </span>
          ))}
        </div>
        <h1 className="result-top-label" style={{ fontSize: topTypes.length > 2 ? 22 : 26, fontWeight: 900, color: single ? top.color : "var(--text)", marginBottom: 4 }}>
          {topTypes.map((tp, i) => (
            <span key={tp.id}>
              {i > 0 && <span style={{ color: "var(--muted)", fontWeight: 400 }}> · </span>}
              <span style={{ color: tp.color }}>{tp.label}</span>
            </span>
          ))}
        </h1>
        <p style={{ fontSize: 14, color: "var(--sub)" }}>{single ? u.resultYourTop : fill(u.resultTied, topTypes.length)}</p>
      </div>

      <ShareButtons lang={lang} url={shareUrl} text={shareText} />

      <div className="card">
        <h2 className="section-title">{u.scoreTitle}</h2>
        {types.map((tp, i) => (
          <AnimBar key={tp.id} value={tp.score} max={MAX_PER_TYPE} color={tp.color} delay={i * 100} label={tp.label} pct={toPercent(tp.score, MAX_PER_TYPE)} />
        ))}
        <p style={{ fontSize: 11, color: "var(--muted)", textAlign: "center", marginTop: 4 }}>{u.maxNote}</p>
      </div>

      <div className="card">
        <h2 className="section-title">{u.catTitle}</h2>
        {CATEGORIES.map((cat, i) => {
          const cs = cat.ids.reduce((s, id) => s + scores[id], 0);
          const max = MAX_PER_TYPE * cat.ids.length;
          return <AnimBar key={cat.id} value={cs} max={max} color={cat.color} delay={700 + i * 120} label={cat.label[lang]} pct={toPercent(cs, max)} />;
        })}
      </div>

      <TypeAccordion rows={types} lang={lang} />

      <div className="card" style={{ background: single ? top.bg : "var(--surface)", borderColor: single ? `${top.color}18` : "var(--border)" }}>
        <p style={{ fontSize: 14, fontWeight: 700, color: single ? top.color : "var(--text)", marginBottom: 8 }}>{u.adviceTitle}</p>
        <p style={{ fontSize: 13, color: "var(--sub)", lineHeight: 1.8, marginBottom: 8 }}>
          {single ? (
            <>
              {u.adviceSingle1}
              <strong style={{ color: top.color }}>{top.label}</strong>
              {u.adviceSingle2}
              {next && (
                <>
                  {u.adviceSingle3}
                  <strong style={{ color: next.color }}>{next.label}</strong>
                  {u.adviceSingle4}
                </>
              )}
            </>
          ) : (
            <>
              {topTypes.map((tp, i) => (
                <span key={tp.id}>
                  {i > 0 && " · "}
                  <strong style={{ color: tp.color }}>{tp.label}</strong>
                </span>
              ))}
              {u.adviceTied1}
            </>
          )}
        </p>
        <p style={{ fontSize: 11, color: "var(--muted)", lineHeight: 1.7 }}>
          {u.disclaimer}{" "}
          <a className="text-link" href={OFFICIAL_TEST_URL} target="_blank" rel="noopener noreferrer">
            {u.officialLink}
          </a>
        </p>
      </div>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 12, flexWrap: "wrap" }}>
        <Link className="primary-btn" href={localePath(lang, "/quiz")}>
          {u.restartBtn}
        </Link>
        <Link className="secondary-btn" href={localePath(lang, "/types")}>
          {u.typesBtn}
        </Link>
      </div>
    </div>
  );
}
