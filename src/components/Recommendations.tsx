"use client";

import { track } from "@/lib/analytics";
import { getType, type TypeId } from "@/lib/content";
import { IS_AFFILIATE, RECOMMENDATIONS, SOURCE_BOOK, amazonSearchUrl, type Recommendation } from "@/lib/recommendations";

function Item({ item, typeId }: { item: Recommendation; typeId: TypeId }) {
  return (
    <li>
      <a
        className="rec-item"
        href={amazonSearchUrl(item.keyword)}
        target="_blank"
        rel={IS_AFFILIATE ? "sponsored noopener noreferrer" : "noopener noreferrer"}
        onClick={() => track({ name: "affiliate_click", type_id: typeId, item: item.name })}
      >
        <span className="rec-name">{item.name}</span>
        <span className="rec-why">{item.why}</span>
        <span className="rec-cta">Amazonで探す ›</span>
      </a>
    </li>
  );
}

/** タイプ別のおすすめ（日本語ページのみ）。アフィリエイト有効時は「PR」を明示する */
export function Recommendations({ typeId }: { typeId: TypeId }) {
  const tp = getType(typeId, "ja");
  return (
    <section className="card">
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <h2 className="section-title" style={{ marginBottom: 0 }}>
          {tp.label}に合いそうな道具
        </h2>
        {IS_AFFILIATE && <span className="pr-label">PR</span>}
      </div>
      <p style={{ fontSize: 14, color: "var(--sub)", marginBottom: 16 }}>得意な処理を活かしやすい道具の例です。リンク先はAmazonの検索結果です。</p>
      <ul className="rec-list">
        {RECOMMENDATIONS[typeId].map((item) => (
          <Item key={item.name} item={item} typeId={typeId} />
        ))}
        <Item item={SOURCE_BOOK} typeId={typeId} />
      </ul>
    </section>
  );
}
