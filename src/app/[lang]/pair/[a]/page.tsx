import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { CharacterSVG } from "@/components/Illustrations";
import { PairInviteActions } from "@/components/pair/PairInviteActions";
import { getType } from "@/lib/content";
import { fill, isLang } from "@/lib/i18n";
import { PAIR_TEXT } from "@/lib/pair-text";
import { analyze, decodeAnswers } from "@/lib/scoring";

export async function generateMetadata({ params }: PageProps<"/[lang]/pair/[a]">): Promise<Metadata> {
  const { lang, a } = await params;
  if (!isLang(lang) || !decodeAnswers(a)) return {};
  const t = PAIR_TEXT[lang];
  return { title: t.inviteTitle, robots: { index: false, follow: false } };
}

export default async function PairInvitePage({ params }: PageProps<"/[lang]/pair/[a]">) {
  const { lang, a } = await params;
  if (!isLang(lang)) notFound();
  const answers = decodeAnswers(a);
  if (!answers) notFound();
  const t = PAIR_TEXT[lang];
  const top = getType(analyze(answers).sorted[0], lang);
  const hero: CSSProperties = { padding: "40px 24px", background: top.bg, marginBottom: 24, textAlign: "center" };
  return (
    <div className="fadein" style={{ paddingTop: 32, paddingBottom: 40 }}>
      <div className="result-hero" style={hero}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
          <CharacterSVG type={top.id} size={120} />
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>{t.inviteTitle}</h1>
        <p style={{ fontSize: 16, color: "var(--sub)", textAlign: "left", maxWidth: 560, margin: "0 auto 24px" }}>{fill(t.inviteLead, top.label)}</p>
        <PairInviteActions lang={lang} inviter={a} />
      </div>
    </div>
  );
}
