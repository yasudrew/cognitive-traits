import { ImageResponse } from "next/og";
import { CharacterSVG } from "@/components/Illustrations";
import { UI, getType } from "@/lib/content";
import { isLang, type Lang } from "@/lib/i18n";
import { OG_SIZE, loadOgFont } from "@/lib/og";
import { PAIR_TEXT } from "@/lib/pair-text";
import { analyze, decodeAnswers } from "@/lib/scoring";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "相性診断への招待 | Compatibility invite";

export default async function Image({ params }: { params: Promise<{ lang: string; a: string }> }) {
  const { lang: raw, a } = await params;
  const lang: Lang = isLang(raw) ? raw : "ja";
  const answers = decodeAnswers(a);
  if (!answers) throw new Error(`Invalid result code for pair invite OG image: ${a}`);
  const t = PAIR_TEXT[lang];
  const u = UI[lang];
  const top = getType(analyze(answers).sorted[0], lang);
  const line = lang === "ja" ? `${top.label}の友だちから` : `From a ${top.label} friend`;
  const ask = lang === "ja" ? "あなたは何タイプ？" : "What's your type?";
  const text = `${t.inviteTitle}${line}${ask}${u.siteTitle}`;
  const [bold, black] = await Promise.all([loadOgFont(text, 700), loadOgFont(text, 900)]);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", background: "#EEEBFA", fontFamily: "Zen", padding: "0 72px" }}>
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ fontSize: 30, fontWeight: 700, color: "#5B47C4" }}>{line}</div>
          <div style={{ fontSize: 76, fontWeight: 900, color: "#1A1A1A", marginTop: 8 }}>{t.inviteTitle}</div>
          <div style={{ fontSize: 40, fontWeight: 700, color: "#333", marginTop: 16 }}>{ask}</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: "#666", marginTop: 40 }}>{u.siteTitle}</div>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <CharacterSVG type={top.id} size={280} />
          <div style={{ display: "flex", flexDirection: "column", fontSize: 120, fontWeight: 900, color: "#5B47C4", marginLeft: 8 }}>?</div>
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
