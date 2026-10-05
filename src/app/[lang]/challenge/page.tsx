import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Challenge } from "@/components/challenge/Challenge";
import { CHALLENGE_TEXT } from "@/lib/challenge-text";
import { isLang } from "@/lib/i18n";
import { decodeAnswers } from "@/lib/scoring";
import { alternates } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/challenge">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const c = CHALLENGE_TEXT[lang];
  return { title: c.introTitle, description: c.ctaDesc, alternates: alternates(lang, "/challenge") };
}

export default async function ChallengePage({ params, searchParams }: PageProps<"/[lang]/challenge">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const { r } = await searchParams;
  // 本診断の結果コードが正しいときだけ、終了後にその結果ページへ戻す
  const resultCode = typeof r === "string" && decodeAnswers(r) ? r : null;
  return <Challenge lang={lang} resultCode={resultCode} />;
}
