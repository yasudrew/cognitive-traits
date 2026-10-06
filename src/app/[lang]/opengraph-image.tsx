import { ImageResponse } from "next/og";
import { CharacterSVG } from "@/components/Illustrations";
import { TYPE_IDS, UI } from "@/lib/content";
import { isLang, type Lang } from "@/lib/i18n";
import { OG_SIZE, loadOgFont } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "認知特性診断 | Cognitive Style Assessment";

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang: Lang = isLang(raw) ? raw : "ja";
  const u = UI[lang];
  const title = `${u.heroTitle1}${u.heroTitle2}`;
  const text = `${title}${u.duration}${u.heroSub}`;
  const [bold, black] = await Promise.all([loadOgFont(text, 700), loadOgFont(text, 900)]);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#FAFAF7", fontFamily: "Zen" }}>
        <div style={{ fontSize: 26, fontWeight: 700, color: "#999", letterSpacing: 4 }}>{u.heroSub}</div>
        <div style={{ fontSize: 76, fontWeight: 900, color: "#1A1A1A", marginTop: 16 }}>{title}</div>
        <div style={{ display: "flex", gap: 12, marginTop: 36 }}>
          {TYPE_IDS.map((id) => (
            <CharacterSVG key={id} type={id} size={130} />
          ))}
        </div>
        <div style={{ fontSize: 28, fontWeight: 700, color: "#4A4A4A", marginTop: 20 }}>{u.duration}</div>
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
