import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocText } from "@/components/DocText";
import { isLang } from "@/lib/i18n";
import { LEGAL_DRAFT, OPERATOR } from "@/lib/legal-text";
import { alternates } from "@/lib/site";
import { SITE_TEXT } from "@/lib/site-text";

export async function generateMetadata({ params }: PageProps<"/[lang]/operator">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return { title: OPERATOR[lang].title, alternates: alternates(lang, "/operator"), robots: LEGAL_DRAFT ? { index: false, follow: true } : undefined };
}

export default async function OperatorPage({ params }: PageProps<"/[lang]/operator">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const doc = OPERATOR[lang];
  return (
    <article className="doc fadein" style={{ paddingTop: 40, paddingBottom: 40 }}>
      {LEGAL_DRAFT && <p className="quiz-note">{SITE_TEXT[lang].draftNote}</p>}
      <h1>{doc.title}</h1>
      <dl>
        {doc.rows.map(([k, v]) => (
          <div key={k} style={{ display: "contents" }}>
            <dt>{k}</dt>
            <dd>
              <DocText text={v} />
            </dd>
          </div>
        ))}
      </dl>
      <p style={{ marginTop: 24 }}>{doc.note}</p>
    </article>
  );
}
