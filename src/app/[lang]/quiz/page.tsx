import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Quiz } from "@/components/Quiz";
import { UI } from "@/lib/content";
import { isLang } from "@/lib/i18n";
import { decodeAnswers } from "@/lib/scoring";
import { alternates } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/quiz">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return { title: UI[lang].startBtn, alternates: alternates(lang, "/quiz") };
}

export default async function QuizPage({ params, searchParams }: PageProps<"/[lang]/quiz">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const { pair } = await searchParams;
  // 相性診断の招待から来た場合だけ、回答後に2人の相性ページへ進める
  const pairWith = typeof pair === "string" && decodeAnswers(pair) ? pair : undefined;
  return <Quiz lang={lang} pairWith={pairWith} />;
}
