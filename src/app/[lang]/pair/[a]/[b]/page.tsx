import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Dot } from "@/components/Dot";
import { CharacterSVG } from "@/components/Illustrations";
import { PairTracker } from "@/components/pair/PairTracker";
import { ShareButtons } from "@/components/ShareButtons";
import { getType } from "@/lib/content";
import { GUIDES } from "@/lib/guides";
import { fill, isLang, localePath } from "@/lib/i18n";
import { analyzePair } from "@/lib/pair";
import { PAIR_TEXT, fillAll } from "@/lib/pair-text";
import { analyze, decodeAnswers } from "@/lib/scoring";
import { absoluteUrl } from "@/lib/site";

const load = async (params: PageProps<"/[lang]/pair/[a]/[b]">["params"]) => {
  const { lang, a, b } = await params;
  const ansA = decodeAnswers(a);
  const ansB = decodeAnswers(b);
  if (!isLang(lang) || !ansA || !ansB) return null;
  const ra = analyze(ansA);
  const rb = analyze(ansB);
  return { lang, a, b, ra, rb, pair: analyzePair(ra, rb), ta: getType(ra.sorted[0], lang), tb: getType(rb.sorted[0], lang) };
};

export async function generateMetadata({ params }: PageProps<"/[lang]/pair/[a]/[b]">): Promise<Metadata> {
  const d = await load(params);
  if (!d) return {};
  const title = fillAll(PAIR_TEXT[d.lang].pairMetaTitle, d.ta.label, d.tb.label);
  return { title: { absolute: title }, openGraph: { title }, robots: { index: false, follow: false } };
}

export default async function PairPage({ params }: PageProps<"/[lang]/pair/[a]/[b]">) {
  const d = await load(params);
  if (!d) notFound();
  const { lang, a, b, ra, rb, pair, ta, tb } = d;
  const t = PAIR_TEXT[lang];
  const kind = t.kinds[pair.kind];
  const who = (side: "a" | "b") => (side === "a" ? t.you : t.friend);
  const people = [
    { side: "a" as const, tp: ta, r: ra },
    { side: "b" as const, tp: tb, r: rb },
  ];

  return (
    <div className="fadein" style={{ paddingTop: 32, paddingBottom: 40 }}>
      <PairTracker match={pair.match} kind={pair.kind} />
      <div className="result-hero" style={{ padding: "40px 24px", background: "var(--brand-soft)", marginBottom: 24, textAlign: "center" }}>
        <p style={{ fontSize: 14, fontWeight: 700, color: "var(--brand)", marginBottom: 8 }}>{t.pairTitle}</p>
        <div className="pair-heroes">
          {people.map(({ side, tp }) => (
            <div key={side} className="pair-person">
              <CharacterSVG type={tp.id} size={104} />
              <span style={{ fontSize: 12, color: "var(--muted)" }}>{who(side)}</span>
              <strong style={{ fontSize: 16, color: tp.color }}>{tp.label}</strong>
            </div>
          ))}
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginTop: 16 }}>{kind.title}</h1>
        <p style={{ fontSize: 16, color: "var(--sub)", marginTop: 4 }}>
          {t.matchLabel} <strong style={{ fontSize: 24, color: "var(--brand)" }}>{pair.match}%</strong>
        </p>
      </div>

      <div className="card">
        <p style={{ fontSize: 16, color: "var(--sub)" }}>{kind.desc}</p>
      </div>

      <div className="card">
        <h2 className="section-title">{t.sharedTitle}</h2>
        {pair.shared.length ? (
          <ul className="pair-list">
            {pair.shared.map((id) => {
              const tp = getType(id, lang);
              return (
                <li key={id}>
                  <Dot color={tp.color} /> <strong>{tp.label}</strong>
                  <span style={{ color: "var(--muted)" }}>{tp.sub}</span>
                </li>
              );
            })}
          </ul>
        ) : (
          <p style={{ fontSize: 14, color: "var(--muted)" }}>{t.sharedNone}</p>
        )}
        <h2 className="section-title" style={{ marginTop: 24 }}>{t.gapsTitle}</h2>
        {pair.gaps.length ? (
          <ul className="pair-list">
            {pair.gaps.map((g) => {
              const tp = getType(g.id, lang);
              return (
                <li key={g.id}>
                  <Dot color={tp.color} /> {fillAll(t.gapLine, tp.label, lang === "ja" ? who(g.stronger) : who(g.stronger).toLowerCase())}
                  <span style={{ color: "var(--muted)" }}>{g.diff}pt</span>
                </li>
              );
            })}
          </ul>
        ) : (
          <p style={{ fontSize: 14, color: "var(--muted)" }}>{t.gapsNone}</p>
        )}
      </div>

      {people.map(({ side, tp }) => (
        <div key={side} className="card">
          <h2 className="section-title" style={{ color: tp.color }}>
            {fill(t.tellTitle, lang === "ja" ? `${who(side)}（${tp.label}）` : `${who(side).toLowerCase()} (${tp.label})`)}
          </h2>
          <ul className="pair-list">
            {GUIDES[tp.id][lang].receive.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      ))}

      <ShareButtons
        lang={lang}
        url={absoluteUrl(lang, `/pair/${a}/${b}`)}
        text={fillAll(t.shareText, kind.title, pair.match)}
        title={t.shareTitle}
        context="pair"
      />

      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
        <Link className="primary-btn" href={localePath(lang, `/r/${b}`)}>
          {t.seeMine}
        </Link>
        <Link className="secondary-btn" href={localePath(lang, "/quiz")}>
          {t.retake}
        </Link>
      </div>
    </div>
  );
}
