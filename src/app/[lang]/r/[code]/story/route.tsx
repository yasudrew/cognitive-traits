import { ImageResponse } from "next/og";
import { CharacterSVG } from "@/components/Illustrations";
import { UI, getType } from "@/lib/content";
import { isLang, type Lang } from "@/lib/i18n";
import { loadOgFont } from "@/lib/og";
import { analyze, decodeAnswers, type ProfileKind } from "@/lib/scoring";
import { SITE_URL } from "@/lib/site";

const SIZE = { width: 1080, height: 1920 } as const;

/** インスタのストーリーズなど縦長SNS向けの結果画像（1080×1920） */
export async function GET(_req: Request, { params }: RouteContext<"/[lang]/r/[code]/story">) {
  const { lang: raw, code } = await params;
  const lang: Lang = isLang(raw) ? raw : "ja";
  const answers = decodeAnswers(code);
  if (!answers) return new Response("Invalid result code", { status: 404 });
  const u = UI[lang];
  const a = analyze(answers);
  const topTypes = a.top.map((id) => getType(id, lang));
  const main = topTypes[0];
  const bars = a.sorted.map((id) => ({ ...getType(id, lang), pct: a.pct[id] }));
  const profile: Record<ProfileKind, string> = { single: u.profileSingle, mixed: u.profileMixed, balanced: u.profileBalanced };
  const host = new URL(SITE_URL).host;
  const heading = topTypes.map((t) => t.label).join("・");
  const text = `${u.ogResultLead}${heading}${u.ogCta}${u.siteTitle}${profile[a.profile]}${u.profileTitle}${bars.map((b) => b.label + b.pct).join("")}%${host}${topTypes.map((t) => t.category).join("")}`;
  const [bold, black] = await Promise.all([loadOgFont(text, 700), loadOgFont(text, 900)]);
  const single = topTypes.length === 1;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", background: single ? main.bg : "#FAFAF7", fontFamily: "Zen", padding: "120px 80px 100px" }}>
        <div style={{ fontSize: 36, fontWeight: 700, color: "#666" }}>{u.siteTitle}</div>
        <div style={{ fontSize: 48, fontWeight: 700, color: "#333", marginTop: 56 }}>{u.ogResultLead}</div>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", fontSize: single ? 112 : 80, fontWeight: 900, lineHeight: 1.2, marginTop: 16 }}>
          {topTypes.map((t, i) => (
            <span key={t.id} style={{ color: t.color }}>
              {i > 0 ? "・" : ""}
              {t.label}
            </span>
          ))}
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 24 }}>
          {topTypes.map((t) => (
            <span key={t.id} style={{ fontSize: 32, fontWeight: 700, color: "#1A1A1A", background: "#FFFFFF", border: `3px solid ${t.color}`, borderRadius: 999, padding: "6px 28px" }}>
              {t.category}
            </span>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 32 }}>
          {topTypes.slice(0, 3).map((t) => (
            <CharacterSVG key={t.id} type={t.id} size={single ? 460 : 300} />
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", width: "100%", background: "#FFFFFF", borderRadius: 40, padding: "40px 56px", marginTop: 24 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 24 }}>
            <span style={{ fontSize: 30, fontWeight: 700, color: "#666" }}>{u.profileTitle}</span>
            <span style={{ fontSize: 44, fontWeight: 900, color: "#5B47C4" }}>{profile[a.profile]}</span>
          </div>
          {bars.map((b) => (
            <div key={b.id} style={{ display: "flex", flexDirection: "column", marginBottom: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 32, fontWeight: 700, color: "#1A1A1A" }}>
                <span>{b.label}</span>
                <span style={{ color: b.color }}>{b.pct}%</span>
              </div>
              <div style={{ display: "flex", height: 18, background: "#EEEEEA", borderRadius: 9, marginTop: 8 }}>
                <div style={{ width: `${b.pct}%`, height: 18, background: b.color, borderRadius: 9 }} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "auto" }}>
          <div style={{ fontSize: 40, fontWeight: 900, color: "#1A1A1A" }}>{u.ogCta}</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: "#5B47C4", marginTop: 8 }}>{host}</div>
        </div>
      </div>
    ),
    {
      ...SIZE,
      fonts: [
        { name: "Zen", data: bold, weight: 700, style: "normal" },
        { name: "Zen", data: black, weight: 900, style: "normal" },
      ],
      headers: { "Cache-Control": "public, max-age=31536000, immutable" },
    },
  );
}
