import { ImageResponse } from "next/og";
import { CharacterSVG } from "@/components/Illustrations";
import { UI, getType } from "@/lib/content";
import { isLang, type Lang } from "@/lib/i18n";
import { OG_SIZE, loadOgFont } from "@/lib/og";
import { analyze, decodeAnswers } from "@/lib/scoring";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "認知特性診断の結果 | Cognitive Style result";

export default async function Image({ params }: { params: Promise<{ lang: string; code: string }> }) {
  const { lang: raw, code } = await params;
  const lang: Lang = isLang(raw) ? raw : "ja";
  const answers = decodeAnswers(code);
  if (!answers) throw new Error(`Invalid result code for OG image: ${code}`);
  const u = UI[lang];
  const { sorted, top, pct } = analyze(answers);
  const topTypes = top.map((id) => getType(id, lang));
  const bars = sorted.map((id) => ({ ...getType(id, lang), pct: pct[id] }));
  const heading = topTypes.map((t) => t.label).join("・");
  const text = `${u.ogResultLead}${heading}${u.ogCta}${u.siteTitle}${bars.map((b) => `${b.label}${b.pct}%`).join("")}`;
  const [bold, black] = await Promise.all([loadOgFont(text, 700), loadOgFont(text, 900)]);
  const main = topTypes[0];

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: topTypes.length === 1 ? main.bg : "#FAFAF7", fontFamily: "Zen", padding: 56 }}>
        <div style={{ display: "flex", flexDirection: "column", width: 560 }}>
          <div style={{ fontSize: 30, fontWeight: 700, color: "#4A4A4A" }}>{u.ogResultLead}</div>
          <div style={{ display: "flex", flexWrap: "wrap", fontSize: topTypes.length > 1 ? 52 : 72, fontWeight: 900, marginTop: 8, lineHeight: 1.2 }}>
            {topTypes.map((t, i) => (
              <span key={t.id} style={{ color: t.color }}>
                {i > 0 ? "・" : ""}
                {t.label}
              </span>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
            {topTypes.slice(0, 3).map((t) => (
              <CharacterSVG key={t.id} type={t.id} size={topTypes.length > 1 ? 170 : 250} />
            ))}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center", marginLeft: 40, background: "#FFFFFF", borderRadius: 24, padding: "32px 36px" }}>
          {bars.map((b) => (
            <div key={b.id} style={{ display: "flex", flexDirection: "column", marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, fontWeight: 700, color: "#1A1A1A" }}>
                <span>{b.label}</span>
                <span style={{ color: b.color }}>{b.pct}%</span>
              </div>
              <div style={{ display: "flex", height: 12, background: "#EEEEEA", borderRadius: 6, marginTop: 6 }}>
                <div style={{ width: `${b.pct}%`, height: 12, background: b.color, borderRadius: 6 }} />
              </div>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 20, fontWeight: 700, color: "#999" }}>
            <span>{u.siteTitle}</span>
            <span>{u.ogCta}</span>
          </div>
        </div>
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
