import { ImageResponse } from "next/og";
import { CharacterSVG } from "@/components/Illustrations";
import { UI, getType } from "@/lib/content";
import { isLang, type Lang } from "@/lib/i18n";
import { OG_SIZE, loadOgFont } from "@/lib/og";
import { analyzePair } from "@/lib/pair";
import { PAIR_TEXT } from "@/lib/pair-text";
import { analyze, decodeAnswers } from "@/lib/scoring";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "認知特性の相性 | Cognitive style compatibility";

export default async function Image({ params }: { params: Promise<{ lang: string; a: string; b: string }> }) {
  const { lang: raw, a, b } = await params;
  const lang: Lang = isLang(raw) ? raw : "ja";
  const ansA = decodeAnswers(a);
  const ansB = decodeAnswers(b);
  if (!ansA || !ansB) throw new Error(`Invalid result codes for pair OG image: ${a} ${b}`);
  const t = PAIR_TEXT[lang];
  const u = UI[lang];
  const ra = analyze(ansA);
  const rb = analyze(ansB);
  const pair = analyzePair(ra, rb);
  const ta = getType(ra.sorted[0], lang);
  const tb = getType(rb.sorted[0], lang);
  const kind = t.kinds[pair.kind].title;
  const text = `${t.ogLead}${kind}${t.matchLabel}${pair.match}%${ta.label}${tb.label}×${u.siteTitle}`;
  const [bold, black] = await Promise.all([loadOgFont(text, 700), loadOgFont(text, 900)]);
  const person = (tp: typeof ta) => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <CharacterSVG type={tp.id} size={250} />
      <div style={{ fontSize: 34, fontWeight: 900, color: tp.color }}>{tp.label}</div>
    </div>
  );
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#EEEBFA", fontFamily: "Zen" }}>
        <div style={{ fontSize: 30, fontWeight: 700, color: "#5B47C4" }}>{t.ogLead}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 40, marginTop: 8 }}>
          {person(ta)}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ fontSize: 64, fontWeight: 900, color: "#1A1A1A" }}>{kind}</div>
            <div style={{ fontSize: 30, fontWeight: 700, color: "#333", marginTop: 8 }}>{`${t.matchLabel} ${pair.match}%`}</div>
          </div>
          {person(tb)}
        </div>
        <div style={{ fontSize: 24, fontWeight: 700, color: "#666", marginTop: 24 }}>{u.siteTitle}</div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Zen", data: bold, weight: 700, style: "normal" },
        { name: "Zen", data: black, weight: 900, style: "normal" },
      ],
    },
  );
}
