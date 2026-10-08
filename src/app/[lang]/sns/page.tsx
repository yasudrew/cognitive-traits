import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TYPE_IDS, getType } from "@/lib/content";
import { SNS_SLIDE_COUNT } from "@/lib/sns";

export const metadata: Metadata = {
  title: "SNS用画像",
  robots: { index: false, follow: false },
};

const GROUPS = [
  { title: "アカウント・開設告知", slides: ["icon", "intro"] },
  ...TYPE_IDS.map((id) => ({
    title: getType(id, "ja").label,
    slides: Array.from({ length: SNS_SLIDE_COUNT }, (_, i) => `${id}-${i + 1}`),
  })),
];

/** 運営者向け：SNSに投稿する画像の一覧。長押し・右クリックで保存する */
export default async function SnsPage({ params }: PageProps<"/[lang]/sns">) {
  const { lang } = await params;
  if (lang !== "ja") notFound();

  return (
    <div style={{ display: "grid", gap: 32, paddingBlock: 24 }}>
      <div style={{ display: "grid", gap: 8 }}>
        <h1 style={{ fontSize: 24, margin: 0 }}>SNS用画像</h1>
        <p style={{ margin: 0, color: "#555", fontSize: 14 }}>
          画像を開いて保存してください（スマホは長押し、PCは右クリック）。この一覧は検索結果には出ません。
        </p>
      </div>
      {GROUPS.map((group) => (
        <section key={group.title} style={{ display: "grid", gap: 12 }}>
          <h2 style={{ fontSize: 18, margin: 0 }}>{group.title}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 12 }}>
            {group.slides.map((slide) => (
              <a key={slide} href={`/sns/${slide}`} target="_blank" rel="noopener" style={{ display: "grid", gap: 4, fontSize: 12, color: "#555" }}>
                {/* eslint-disable-next-line @next/next/no-img-element -- 生成済みのPNGをそのまま見せる */}
                <img src={`/sns/${slide}`} alt={slide} loading="lazy" style={{ width: "100%", height: "auto", borderRadius: 8, border: "1px solid #e5e5e0" }} />
                {slide}
              </a>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
