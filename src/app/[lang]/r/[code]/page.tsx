import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResultView } from "@/components/ResultView";
import { UI, getType } from "@/lib/content";
import { fill, isLang } from "@/lib/i18n";
import { decodeScores, rank } from "@/lib/scoring";
import { absoluteUrl, alternates } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/r/[code]">): Promise<Metadata> {
  const { lang, code } = await params;
  const scores = decodeScores(code);
  if (!isLang(lang) || !scores) return {};
  const u = UI[lang];
  const labels = rank(scores).top.map((id) => getType(id, lang).label).join("・");
  const title = fill(u.resultMetaTitle, labels);
  return {
    // titleテンプレートを通すとサイト名が二重になるため absolute で指定
    title: { absolute: title },
    description: u.metaDesc,
    alternates: alternates(lang, `/r/${code}`),
    openGraph: { title, description: u.metaDesc, url: absoluteUrl(lang, `/r/${code}`) },
    // 組み合わせが膨大で内容も薄いため検索結果には出さない
    robots: { index: false, follow: true },
  };
}

export default async function ResultPage({ params }: PageProps<"/[lang]/r/[code]">) {
  const { lang, code } = await params;
  if (!isLang(lang)) notFound();
  const scores = decodeScores(code);
  if (!scores) notFound();
  return <ResultView scores={scores} lang={lang} shareUrl={absoluteUrl(lang, `/r/${code}`)} />;
}
