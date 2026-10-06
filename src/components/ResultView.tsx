import Link from "next/link";
import type { CSSProperties } from "react";
import { CATEGORIES, UI, getType } from "@/lib/content";
import { fill, localePath, type Lang } from "@/lib/i18n";
import type { ChallengeResult } from "@/lib/challenge";
import type { Analysis, ConsistencyLevel, ProfileKind } from "@/lib/scoring";
import { OFFICIAL_TEST_URL } from "@/lib/site";
import { AnimBar } from "./AnimBar";
import { ChallengeCta, ChallengeResultView } from "./challenge/ChallengeResultView";
import { CharacterSVG } from "./Illustrations";
import { ShareButtons } from "./ShareButtons";
import { TypeAccordion } from "./TypeAccordion";
import { TypeGuideView } from "./TypeGuideView";
import { GUIDE_LABELS } from "@/lib/guides";

type Props = { analysis: Analysis; lang: Lang; shareUrl: string; resultCode: string; challenge: ChallengeResult | null };

export function ResultView({ analysis, lang, shareUrl, resultCode, challenge }: Props) {
  const u = UI[lang];
  const { pct, sorted, top: topIds, next: nextId, categories, profile, consistency, consistencyLevel } = analysis;
  const types = sorted.map((id) => ({ ...getType(id, lang), pct: pct[id] }));
  const topTypes = types.filter((t) => topIds.includes(t.id));
  const top = topTypes[0];
  const next = nextId ? getType(nextId, lang) : null;
  const single = topTypes.length === 1;
  const topLabels = topTypes.map((t) => t.label).join("・");
  const shareText = fill(single ? u.shareText : u.shareTextTied, topLabels);

  const profileText: Record<ProfileKind, { title: string; desc: string }> = {
    single: { title: u.profileSingle, desc: fill(u.profileSingleDesc, top.label) },
    mixed: { title: u.profileMixed, desc: u.profileMixedDesc },
    balanced: { title: u.profileBalanced, desc: u.profileBalancedDesc },
  };
  const consistencyText: Record<ConsistencyLevel, { title: string; desc: string; color: string }> = {
    high: { title: u.consistencyHigh, desc: u.consistencyHighDesc, color: "#178F5E" },
    mid: { title: u.consistencyMid, desc: u.consistencyMidDesc, color: "#C87620" },
    low: { title: u.consistencyLow, desc: u.consistencyLowDesc, color: "#D94F3B" },
  };
  const cons = consistencyText[consistencyLevel];

  return (
    <div className="fadein" style={{ paddingTop: 32, paddingBottom: 40 }}>
      <div className="result-hero" style={{ padding: "36px 24px", background: single ? top.bg : "var(--surface)", marginBottom: 24, textAlign: "center", "--tc": top.color } as CSSProperties}>
        <div style={{ display: "flex", justifyContent: "center", gap: single ? 0 : 16, marginBottom: 8 }}>
          {topTypes.map((tp) => (
            <CharacterSVG key={tp.id} type={tp.id} size={topTypes.length > 2 ? 80 : single ? 132 : 100} />
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
          {topTypes.map((tp) => (
            <span key={tp.id} style={{ display: "inline-block", padding: "4px 14px", borderRadius: 999, fontSize: 11, fontWeight: 700, color: "#fff", background: tp.color }}>
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

      <div className="card">
        <h2 className="section-title">{u.profileTitle}</h2>
        <p style={{ textAlign: "center", fontSize: 20, fontWeight: 900, marginBottom: 8 }}>{profileText[profile].title}</p>
        <p style={{ fontSize: 13, color: "var(--sub)", lineHeight: 1.8 }}>{profileText[profile].desc}</p>
      </div>

      <div className="card">
        <h2 className="section-title">{u.scoreTitle}</h2>
        {types.map((tp, i) => (
          <AnimBar key={tp.id} value={tp.pct} max={100} color={tp.color} delay={i * 100} label={tp.label} pct={tp.pct} avgMarker />
        ))}
        <p style={{ fontSize: 11, color: "var(--muted)", textAlign: "center", marginTop: 4 }}>
          <span style={{ display: "inline-block", width: 1.5, height: 10, background: "rgba(0,0,0,0.25)", marginRight: 6, verticalAlign: "middle" }} />
          {u.maxNote}
        </p>
      </div>

      <div className="card">
        <h2 className="section-title">{u.catTitle}</h2>
        {categories.map((c, i) => {
          const meta = CATEGORIES.find((x) => x.id === c.id);
          if (!meta) throw new Error(`Unknown category: ${c.id}`);
          return <AnimBar key={c.id} value={c.pct} max={100} color={meta.color} delay={700 + i * 120} label={meta.label[lang]} pct={c.pct} avgMarker />;
        })}
        <h3 className="section-title" style={{ marginTop: 20, marginBottom: 12 }}>{u.withinTitle}</h3>
        {categories.map((c) => {
          const meta = CATEGORIES.find((x) => x.id === c.id);
          if (!meta) throw new Error(`Unknown category: ${c.id}`);
          const [x, y] = meta.ids.map((id) => getType(id, lang));
          return (
            <div key={c.id} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 700 }}>
                <span style={{ color: x.color }}>
                  {x.label} {c.firstShare}
                </span>
                <span style={{ color: y.color }}>
                  {100 - c.firstShare} {y.label}
                </span>
              </div>
              <div className="split">
                <div style={{ width: `${c.firstShare}%`, background: x.color }} />
                <div style={{ flex: 1, background: y.color }} />
              </div>
            </div>
          );
        })}
      </div>

      {topTypes.map((tp) => (
        <TypeGuideView key={tp.id} id={tp.id} lang={lang} heading={GUIDE_LABELS[lang].forYou} />
      ))}

      <TypeAccordion rows={types} lang={lang} />

      {challenge ? <ChallengeResultView result={challenge} analysis={analysis} lang={lang} resultCode={resultCode} /> : <ChallengeCta lang={lang} resultCode={resultCode} />}

      <ShareButtons lang={lang} url={shareUrl} text={shareText} />

      <div className="card">
        <h2 className="section-title">{u.consistencyTitle}</h2>
        <p style={{ textAlign: "center", marginBottom: 8 }}>
          <span className="badge" style={{ color: cons.color, background: `${cons.color}14` }}>
            {cons.title}・{consistency}%
          </span>
        </p>
        <p style={{ fontSize: 13, color: "var(--sub)", lineHeight: 1.8 }}>{cons.desc}</p>
      </div>

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
