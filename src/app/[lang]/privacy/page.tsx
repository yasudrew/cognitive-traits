import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocText } from "@/components/DocText";
import { isLang } from "@/lib/i18n";
import { LEGAL_DRAFT, PRIVACY } from "@/lib/legal-text";
import { alternates } from "@/lib/site";
import { SITE_TEXT } from "@/lib/site-text";

export async function generateMetadata({ params }: PageProps<"/[lang]/privacy">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return { title: PRIVACY[lang].title, alternates: alternates(lang, "/privacy"), robots: LEGAL_DRAFT ? { index: false, follow: true } : undefined };
}

export default async function PrivacyPage({ params }: PageProps<"/[lang]/privacy">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const doc = PRIVACY[lang];
  return (
    <article className="doc fadein" style={{ paddingTop: 40, paddingBottom: 40 }}>
      {LEGAL_DRAFT && <p className="quiz-note">{SITE_TEXT[lang].draftNote}</p>}
      <h1>{doc.title}</h1>
      {doc.sections.map((sec) => (
        <section key={sec.h}>
          <h2>{sec.h}</h2>
          {sec.body.map((p) => (
            <p key={p} style={{ marginBottom: 8 }}>
              <DocText text={p} />
            </p>
          ))}
          {sec.list && (
            <ul>
              {sec.list.map((li) => (
                <li key={li}>{li}</li>
              ))}
            </ul>
          )}
        </section>
      ))}
      <p style={{ marginTop: 40, fontSize: 14, color: "var(--muted)" }}>
        <DocText text={doc.updated} />
      </p>
    </article>
  );
}
