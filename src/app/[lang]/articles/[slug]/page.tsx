import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { AdSlot } from "@/components/AdSlot";
import { ArticleBody, headingsOf } from "@/components/ArticleBody";
import { CharacterSVG } from "@/components/Illustrations";
import { Recommendations } from "@/components/Recommendations";
import { ARTICLES, TOPIC_LABEL, getArticle, relatedArticles } from "@/lib/articles";
import { UI, getType } from "@/lib/content";
import { localePath } from "@/lib/i18n";
import { SITE_URL, absoluteUrl } from "@/lib/site";

export const dynamicParams = false;

/** 記事は日本語のみ（/en/articles/... はページ側で404にする） */
export const generateStaticParams = () => ARTICLES.map((a) => ({ slug: a.slug }));

export async function generateMetadata({ params }: PageProps<"/[lang]/articles/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const a = getArticle(slug);
  if (lang !== "ja" || !a) return {};
  return {
    title: { absolute: a.title },
    description: a.description,
    alternates: { canonical: `/articles/${a.slug}` },
    openGraph: { type: "article", title: a.title, description: a.description, publishedTime: a.published, modifiedTime: a.updated },
  };
}

export default async function ArticlePage({ params }: PageProps<"/[lang]/articles/[slug]">) {
  const { lang, slug } = await params;
  const a = getArticle(slug);
  if (lang !== "ja" || !a) notFound();
  const tp = getType(a.typeId, lang);
  const u = UI[lang];
  const toc = headingsOf(a.blocks);
  const related = relatedArticles(a);
  const url = absoluteUrl(lang, `/articles/${a.slug}`);
  // 検索結果に記事とパンくずとして表示されるための構造化データ
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: a.title,
      description: a.description,
      datePublished: a.published,
      dateModified: a.updated,
      author: { "@type": "Organization", name: "marocreate" },
      publisher: { "@type": "Organization", name: u.siteTitle },
      mainEntityOfPage: url,
      image: `${SITE_URL}/ja/opengraph-image`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "ホーム", item: absoluteUrl(lang, "/") },
        { "@type": "ListItem", position: 2, name: "読みもの", item: absoluteUrl(lang, "/articles") },
        { "@type": "ListItem", position: 3, name: a.title, item: url },
      ],
    },
  ];
  const hero: CSSProperties = { padding: "32px 24px", background: tp.bg, marginBottom: 24 };

  return (
    <article className="fadein" style={{ paddingTop: 24, paddingBottom: 40 }}>
      <nav className="breadcrumb" aria-label="パンくずリスト">
        <Link href={localePath(lang, "/")}>ホーム</Link> › <Link href={localePath(lang, "/articles")}>読みもの</Link> › <span>{tp.label}の{TOPIC_LABEL[a.topic]}</span>
      </nav>
      <header className="result-hero article-hero" style={hero}>
        <div>
          <span className="badge" style={{ color: "var(--text)", background: "var(--surface)", border: `1px solid ${tp.color}` }}>
            {tp.category}・{TOPIC_LABEL[a.topic]}
          </span>
          <h1>{a.title}</h1>
          <p style={{ fontSize: 12, color: "var(--muted)" }}>
            公開 {a.published}
            {a.updated !== a.published && `・更新 ${a.updated}`}
          </p>
        </div>
        <CharacterSVG type={a.typeId} size={112} />
      </header>

      <nav className="card article-toc" aria-label="目次">
        <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>目次</p>
        <ol>
          {toc.map((h) => (
            <li key={h.id}>
              <a href={`#${h.id}`}>{h.text}</a>
            </li>
          ))}
        </ol>
      </nav>

      <ArticleBody blocks={a.blocks} />

      <div className="final-cta" style={{ marginTop: 40 }}>
        <p style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>あなたは本当に{tp.label}？</p>
        <p style={{ fontSize: 14, color: "var(--sub)", marginBottom: 24 }}>
          {a.topic === "relationships" ? "30問・約5分。結果ページから、友だちや家族を相性診断に招待できます。" : "30問・約5分で、6タイプのバランスがわかります。"}
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link className="primary-btn" href={localePath(lang, "/quiz")}>
            {u.startBtn}
            <span style={{ marginLeft: 8 }}>→</span>
          </Link>
          <Link className="secondary-btn" href={localePath(lang, `/types/${a.typeId}`)}>
            {tp.label}の解説を見る
          </Link>
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <Recommendations typeId={a.typeId} />
      </div>
      <AdSlot lang={lang} />

      {related.length > 0 && (
        <section style={{ marginTop: 40 }}>
          <h2 className="home-h2" style={{ fontSize: 20 }}>あわせて読みたい</h2>
          <div className="article-list">
            {related.map((r) => (
              <Link key={r.slug} className="type-link-card" href={localePath(lang, `/articles/${r.slug}`)}>
                <CharacterSVG type={r.typeId} size={48} />
                <div style={{ flex: 1, fontSize: 14, fontWeight: 700, lineHeight: 1.5 }}>{r.title}</div>
              </Link>
            ))}
          </div>
        </section>
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </article>
  );
}
