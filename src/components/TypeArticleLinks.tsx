import Link from "next/link";
import { TOPIC_LABEL, articlesForType } from "@/lib/articles";
import { getType, type TypeId } from "@/lib/content";
import { localePath } from "@/lib/i18n";

/** タイプに関連する記事へのリンク（記事は日本語のみ） */
export function TypeArticleLinks({ typeId }: { typeId: TypeId }) {
  const articles = articlesForType(typeId);
  if (!articles.length) return null;
  const tp = getType(typeId, "ja");
  return (
    <section className="card">
      <h2 className="section-title">{tp.label}の読みもの</h2>
      <div className="article-list">
        {articles.map((a) => (
          <Link key={a.slug} className="type-link-card" href={localePath("ja", `/articles/${a.slug}`)}>
            <span className="badge" style={{ color: "var(--text)", border: `1px solid ${tp.color}`, flexShrink: 0 }}>
              {TOPIC_LABEL[a.topic]}
            </span>
            <span style={{ flex: 1, fontSize: 14, fontWeight: 700, lineHeight: 1.5 }}>{a.title}</span>
            <span aria-hidden style={{ color: "var(--muted)" }}>›</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
