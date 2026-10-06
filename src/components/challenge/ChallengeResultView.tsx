import Link from "next/link";
import {
  ROTATION_TRIALS,
  MEMORY_QUESTIONS,
  memoryScore,
  rotationScore,
  vividnessPct,
  wordScore,
  weakAuditoryImagery,
  weakVisualImagery,
  type ChallengeResult,
} from "@/lib/challenge";
import { CHALLENGE_TEXT } from "@/lib/challenge-text";
import { TYPE_IDS, getType, type TypeId } from "@/lib/content";
import { fill, localePath, type Lang } from "@/lib/i18n";
import type { Analysis } from "@/lib/scoring";

/** 自覚と実測の差がこれ以上なら、ずれとしてコメントする */
const GAP = 25;

function Compare({ label, self, measured, detail, color, lang, typeLabel }: { label: string; self: number; measured: number; detail: string; color: string; lang: Lang; typeLabel: string }) {
  const c = CHALLENGE_TEXT[lang];
  const diff = measured - self;
  const comment = diff >= GAP ? fill(c.gapHigher, typeLabel) : diff <= -GAP ? fill(c.gapLower, typeLabel) : c.gapMatch;
  const row = (name: string, v: number, opacity: number) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
      <span style={{ width: 52, fontSize: 12, color: "var(--muted)" }}>{name}</span>
      <div style={{ flex: 1, height: 8, background: "rgba(0,0,0,0.05)", borderRadius: 4 }}>
        <div style={{ width: `${v}%`, height: "100%", background: color, opacity, borderRadius: 4 }} />
      </div>
      <span style={{ width: 36, textAlign: "right", fontSize: 14, fontWeight: 700, color }}>{v}</span>
    </div>
  );
  return (
    <div style={{ marginBottom: 22 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
        <span style={{ fontSize: 14, fontWeight: 700 }}>{label}</span>
        <span style={{ fontSize: 12, color: "var(--muted)" }}>{detail}</span>
      </div>
      {row(c.selfLabel, self, 0.45)}
      {row(c.measuredLabel, measured, 1)}
      <p style={{ fontSize: 12, color: "var(--sub)", lineHeight: 1.7, marginTop: 8 }}>{comment}</p>
    </div>
  );
}

export function ChallengeResultView({ result, analysis, lang, resultCode }: { result: ChallengeResult; analysis: Analysis; lang: Lang; resultCode: string }) {
  const c = CHALLENGE_TEXT[lang];
  const cam = getType("camera", lang);
  const d3 = getType("3d", lang);
  const radio = getType("radio", lang);
  const dict = getType("dictionary", lang);
  const w = result.words;
  const ear = w ? wordScore(w.audio, w.falseAlarms) : 0;
  const eye = w ? wordScore(w.visual, w.falseAlarms) : 0;
  const wordInsight = !w ? null : ear - eye >= 20 ? c.wordEarWins : eye - ear >= 20 ? c.wordEyeWins : c.wordEven;
  const notes: string[] = [...(weakVisualImagery(result) ? [c.weakVisual] : []), ...(weakAuditoryImagery(result) ? [c.weakAuditory] : [])];
  return (
    <div className="card">
      <h2 className="section-title">{c.resultTitle}</h2>
      <Compare
        label={c.rotLabel}
        self={analysis.pct["3d"]}
        measured={rotationScore(result)}
        detail={`${fill(c.correctOf, `${result.rotationCorrect}/${ROTATION_TRIALS}`)}・${fill(c.avgTime, (result.rotationAvgDecisec / 10).toFixed(1))}`}
        color={d3.color}
        typeLabel={d3.label}
        lang={lang}
      />
      <Compare
        label={c.memLabel}
        self={analysis.pct.camera}
        measured={memoryScore(result)}
        detail={fill(c.correctOf, `${result.memoryCorrect}/${MEMORY_QUESTIONS}`)}
        color={cam.color}
        typeLabel={cam.label}
        lang={lang}
      />
      {w ? (
        <>
          <Compare label={c.audioLabel} self={analysis.pct.radio} measured={ear} detail={fill(c.wordDetail, w.audio)} color={radio.color} typeLabel={radio.label} lang={lang} />
          <Compare label={c.visualWordLabel} self={analysis.pct.dictionary} measured={eye} detail={fill(c.wordDetail, w.visual)} color={dict.color} typeLabel={dict.label} lang={lang} />
          {wordInsight && (
            <p className="quiz-note" style={{ marginTop: -8 }}>
              {wordInsight}
            </p>
          )}
        </>
      ) : (
        <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: 24 }}>{c.wordSkipped}</p>
      )}
      <h3 className="section-title" style={{ marginTop: 8, marginBottom: 12 }}>{c.vivLabel}</h3>
      {TYPE_IDS.map((id: TypeId) => {
        const tp = getType(id, lang);
        const v = result.vividness[id];
        return (
          <div key={id} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span style={{ width: 120, fontSize: 12, fontWeight: 700 }}>{tp.label}</span>
            <div style={{ flex: 1, height: 8, background: "rgba(0,0,0,0.05)", borderRadius: 4 }}>
              <div style={{ width: `${vividnessPct(v)}%`, height: "100%", background: tp.color, borderRadius: 4 }} />
            </div>
            <span style={{ width: 28, textAlign: "right", fontSize: 12, color: "var(--muted)" }}>{v}/5</span>
          </div>
        );
      })}
      {notes.map((n) => (
        <p key={n} className="quiz-note" style={{ marginTop: 12, marginBottom: 0 }}>
          {n}
        </p>
      ))}
      <p style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.7, marginTop: 16 }}>{c.resultNote}</p>
      <p style={{ marginTop: 8, fontSize: 12 }}>
        <Link className="text-link" href={localePath(lang, `/challenge?r=${resultCode}`)}>
          {c.retry}
        </Link>
      </p>
    </div>
  );
}

export function ChallengeCta({ lang, resultCode }: { lang: Lang; resultCode: string }) {
  const c = CHALLENGE_TEXT[lang];
  return (
    <div className="card" style={{ textAlign: "center", borderColor: "var(--text)" }}>
      <p style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{c.ctaTitle}</p>
      <p style={{ fontSize: 14, color: "var(--sub)", lineHeight: 1.8, marginBottom: 16 }}>{c.ctaDesc}</p>
      <Link className="primary-btn" href={localePath(lang, `/challenge?r=${resultCode}`)}>
        {c.ctaBtn}
        <span style={{ marginLeft: 8 }}>→</span>
      </Link>
    </div>
  );
}
