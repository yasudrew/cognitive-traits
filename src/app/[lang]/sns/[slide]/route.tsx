import { ImageResponse } from "next/og";
import { CharacterSVG } from "@/components/Illustrations";
import { CATEGORIES, TYPE_IDS, getType } from "@/lib/content";
import { loadOgFont } from "@/lib/og";
import { SITE_URL } from "@/lib/site";
import { SNS_SLIDE_COUNT, SNS_SLIDE_IDS, parseSnsSlide, snsSlideText, type SnsSlide } from "@/lib/sns";

/** ビルド時にすべて書き出す（アクセスのたびに描かない） */
export const dynamic = "force-static";
export const dynamicParams = false;
export const generateStaticParams = () => SNS_SLIDE_IDS.map((slide) => ({ lang: "ja", slide }));

const PORTRAIT = { width: 1080, height: 1350 } as const;
const SQUARE = { width: 1080, height: 1080 } as const;
const BRAND = "#5B47C4";
const INK = "#1A1A1A";
const PAPER = "#FAFAF7";

/** Instagram の複数枚投稿などに使う画像。検索結果には出さない */
export async function GET(_req: Request, { params }: RouteContext<"/[lang]/sns/[slide]">) {
  const { lang, slide: raw } = await params;
  const slide = parseSnsSlide(raw);
  if (lang !== "ja" || !slide) return new Response("Not Found", { status: 404 });

  const { heading, lines } = snsSlideText(slide);
  const host = new URL(SITE_URL).host;
  // 本文以外に画像内で使う固定の文字もサブセットに含める
  const text = `${heading}${lines.join("")}${host}認知特性診断だけじゃない　`;
  const [bold, black] = await Promise.all([loadOgFont(text, 700), loadOgFont(text, 900)]);

  return new ImageResponse(render(slide, heading, lines, host), {
    ...(slide.kind === "icon" ? SQUARE : PORTRAIT),
    fonts: [
      { name: "Zen", data: bold, weight: 700, style: "normal" },
      { name: "Zen", data: black, weight: 900, style: "normal" },
    ],
    headers: {
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Robots-Tag": "noindex",
      "Content-Disposition": `inline; filename="cognitive-traits-${raw}.png"`,
    },
  });
}

function render(slide: SnsSlide, heading: string, lines: readonly string[], host: string) {
  if (slide.kind === "icon") {
    return (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: BRAND, fontFamily: "Zen" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", fontSize: 250, fontWeight: 900, color: "#FFFFFF", lineHeight: 1.05 }}>
          <span>{heading.slice(0, 2)}</span>
          <span>{heading.slice(2)}</span>
        </div>
        <div style={{ display: "flex", gap: 36, marginTop: 48 }}>
          {CATEGORIES.map((c) => (
            <div key={c.id} style={{ width: 56, height: 56, borderRadius: 28, background: c.color, border: "6px solid #FFFFFF" }} />
          ))}
        </div>
      </div>
    );
  }

  if (slide.kind === "intro") {
    const [q1, q2, q3, meta, sub, ...cats] = lines;
    return (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", background: PAPER, fontFamily: "Zen", padding: "110px 70px 90px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", fontSize: 54, fontWeight: 700, color: "#4A4A4A", lineHeight: 1.5 }}>
          <span>{q1}</span>
          <span>{q2}</span>
          <span>{q3}</span>
        </div>
        <div style={{ fontSize: 72, fontWeight: 900, color: INK, marginTop: 40 }}>{heading}</div>
        <div style={{ fontSize: 36, fontWeight: 700, color: "#4A4A4A", marginTop: 20 }}>{sub}</div>
        <div style={{ display: "flex", gap: 4, marginTop: 56 }}>
          {TYPE_IDS.map((id) => (
            <CharacterSVG key={id} type={id} size={156} />
          ))}
        </div>
        <div style={{ display: "flex", gap: 20, marginTop: 36 }}>
          {CATEGORIES.map((c, i) => (
            <span key={c.id} style={{ fontSize: 32, fontWeight: 700, color: INK, background: "#FFFFFF", border: `4px solid ${c.color}`, borderRadius: 999, padding: "6px 30px" }}>
              {cats[i]}
            </span>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "auto" }}>
          <div style={{ fontSize: 46, fontWeight: 900, color: BRAND }}>{meta}</div>
          <div style={{ fontSize: 30, fontWeight: 700, color: "#888", marginTop: 8 }}>{host}</div>
        </div>
      </div>
    );
  }

  const t = getType(slide.type, "ja");
  const page = slide.kind === "cover" ? 1 : slide.kind === "cta" ? SNS_SLIDE_COUNT : slide.index;
  const pager = (
    <div style={{ display: "flex", gap: 14, marginTop: "auto", alignItems: "center" }}>
      {Array.from({ length: SNS_SLIDE_COUNT }, (_, i) => (
        <div key={i} style={{ width: i + 1 === page ? 44 : 16, height: 16, borderRadius: 8, background: i + 1 === page ? t.color : "#D6D6D0" }} />
      ))}
    </div>
  );

  if (slide.kind === "cover") {
    const [tagline, category, ask] = lines;
    return (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", background: t.bg, fontFamily: "Zen", padding: "100px 70px 80px" }}>
        <div style={{ fontSize: 34, fontWeight: 700, color: "#666" }}>認知特性診断</div>
        <span style={{ fontSize: 34, fontWeight: 700, color: INK, background: "#FFFFFF", border: `4px solid ${t.color}`, borderRadius: 999, padding: "6px 32px", marginTop: 48 }}>{category}</span>
        <div style={{ fontSize: 124, fontWeight: 900, color: t.color, marginTop: 28 }}>{heading}</div>
        <div style={{ fontSize: 50, fontWeight: 700, color: INK, marginTop: 12 }}>{tagline}</div>
        <div style={{ display: "flex", marginTop: 36 }}>
          <CharacterSVG type={slide.type} size={500} />
        </div>
        <div style={{ fontSize: 40, fontWeight: 700, color: "#4A4A4A", marginTop: 8 }}>{ask}</div>
        {pager}
      </div>
    );
  }

  if (slide.kind === "list") {
    const [label, ...items] = lines;
    return (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: t.bg, fontFamily: "Zen", padding: "90px 80px 80px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <CharacterSVG type={slide.type} size={200} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 40, fontWeight: 700, color: t.color }}>{label}</span>
            <span style={{ fontSize: 76, fontWeight: 900, color: INK, marginTop: 4 }}>{heading}</span>
          </div>
        </div>
        {/* 項目は残りの高さの中央に置き、下に空白が溜まらないようにする */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 32, flexGrow: 1, paddingBottom: 40 }}>
          {items.map((item) => (
            <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 24, background: "#FFFFFF", borderRadius: 32, padding: "44px 44px", borderLeft: `14px solid ${t.color}` }}>
              <span style={{ fontSize: 52, fontWeight: 700, color: INK, lineHeight: 1.5 }}>{item}</span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>{pager}</div>
      </div>
    );
  }

  const [label, meta, cta, note] = lines;
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", background: PAPER, fontFamily: "Zen", padding: "120px 70px 80px" }}>
      <div style={{ fontSize: 40, fontWeight: 700, color: t.color }}>{`${label}だけじゃない`}</div>
      <div style={{ fontSize: 84, fontWeight: 900, color: INK, marginTop: 20 }}>{heading}</div>
      <div style={{ display: "flex", gap: 4, marginTop: 64 }}>
        {TYPE_IDS.map((id) => (
          <CharacterSVG key={id} type={id} size={156} />
        ))}
      </div>
      <div style={{ fontSize: 56, fontWeight: 900, color: BRAND, marginTop: 64 }}>{meta}</div>
      <div style={{ fontSize: 46, fontWeight: 700, color: INK, background: "#FFFFFF", border: `4px solid ${BRAND}`, borderRadius: 999, padding: "16px 56px", marginTop: 36 }}>{cta}</div>
      <div style={{ fontSize: 28, fontWeight: 700, color: "#888", marginTop: 32 }}>{`${host}　${note}`}</div>
      {pager}
    </div>
  );
}
