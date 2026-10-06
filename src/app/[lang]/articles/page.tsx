import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CharacterSVG } from "@/components/Illustrations";
import { ARTICLES, TOPIC_LABEL } from "@/lib/articles";
import { getType } from "@/lib/content";
import { isLang, localePath } from "@/lib/i18n";

const TITLE = "読みもの｜認知特性タイプ別の勉強法・活かし方";
const DESCRIPTION = "カメラ・3D・ファンタジー・辞書・ラジオ・サウンドの6タイプ別に、自分に合った勉強法や得意の活かし方を紹介する記事の一覧です。";

export async function generateMetadata({ params }: PageProps<"/[lang]/articles">): Promise<Metadata> {
  const { lang } = await params;
  if (lang !== "ja") return {};
  return { title: { absolute: TITLE }, description: DESCRIPTION, alternates: { canonical: "/articles" } };
}

export default async function ArticlesPage({ params }: PageProps<"/[lang]/articles">) {
  const { lang } = await params;
  // 記事は日本語のみ
  if (!isLang(lang) || lang !== "ja") notFound();
  return (
    <div className="fadein" style={{ paddingTop: 40, paddingBottom: 40 }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>読みもの</h1>
      <p style={{ fontSize: 16, color: "var(--sub)", marginBottom: 32 }}>{DESCRIPTION}</p>
      <div className="article-list">
        {ARTICLES.map((a) => {
          const tp = getType(a.typeId, lang);
          return (
            <Link key={a.slug} className="type-link-card" href={localePath(lang, `/articles/${a.slug}`)}>
              <CharacterSVG type={a.typeId} size={64} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: "var(--muted)" }}>
                  {tp.label}・{TOPIC_LABEL[a.topic]}
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.5 }}>{a.title}</div>
              </div>
              <span aria-hidden style={{ color: "var(--muted)" }}>›</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
