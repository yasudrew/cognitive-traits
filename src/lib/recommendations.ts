import type { TypeId } from "./content";
import { AMAZON_TAG } from "./monetize-config";

/**
 * タイプ別のおすすめ（Amazonの検索結果へのリンク）。特定の商品を断定せず、
 * そのタイプの学び方・働き方に合う「道具の種類」を紹介する。日本語ページのみで表示する。
 */
export type Recommendation = { name: string; why: string; keyword: string };

export const RECOMMENDATIONS: Record<TypeId, readonly Recommendation[]> = {
  camera: [
    { name: "カラーペン・マーカー", why: "色分けで情報を区別すると、見た目ごと記憶に残りやすくなります。", keyword: "カラーペン マーカー セット" },
    { name: "無地ノート・スケッチブック", why: "罫線のない紙は、図やマインドマップで1枚にまとめるのに向いています。", keyword: "無地ノート A4" },
    { name: "図解の本", why: "文章を図にする手本が手元にあると、自分のノートづくりに活かせます。", keyword: "図解 思考法 本" },
  ],
  "3d": [
    { name: "卓上ホワイトボード", why: "手順や位置関係を、描いて消して動かしながら考えられます。", keyword: "卓上 ホワイトボード" },
    { name: "立体パズル", why: "頭の中で回す・組み立てる感覚を、手を動かしながら楽しめます。", keyword: "立体パズル 大人" },
    { name: "ブロック（大人向け）", why: "考えを形にして試すのが得意なら、手で組み立てる時間が発想の助けになります。", keyword: "ブロック 大人向け" },
  ],
  fantasy: [
    { name: "学習まんが", why: "歴史や科学を物語として読むと、場面ごと記憶に残ります。", keyword: "学習まんが" },
    { name: "日記帳・ジャーナル", why: "出来事を物語として書き残すと、考えが整理されます。", keyword: "日記帳 ジャーナル" },
    { name: "物語で学ぶ本", why: "ビジネスや勉強の内容も、ストーリー仕立ての本なら入りやすくなります。", keyword: "物語で学ぶ 本" },
  ],
  dictionary: [
    { name: "方眼ノート", why: "見出し・箇条書き・表で情報を構造化するのに向いています。", keyword: "方眼ノート A5" },
    { name: "ラベルライター", why: "モノや書類を分類して名前を付けると、整理が続きやすくなります。", keyword: "ラベルライター" },
    { name: "情報整理術の本", why: "体系立てて考える型を増やすと、得意な処理をさらに伸ばせます。", keyword: "情報整理術 本" },
  ],
  radio: [
    { name: "オーディオブック", why: "本を耳で聞けるので、通勤や家事の時間も学びに使えます。", keyword: "Audible オーディオブック" },
    { name: "ボイスレコーダー", why: "講義や自分の説明を録音して、聞き返して覚えられます。", keyword: "ボイスレコーダー" },
    { name: "ワイヤレスイヤホン", why: "耳から学ぶ時間を増やすなら、つけ心地のよいものが続けやすいです。", keyword: "ワイヤレスイヤホン" },
  ],
  sound: [
    { name: "ノイズキャンセリングヘッドホン", why: "雑音を減らすと、音に敏感な人でも集中しやすくなります。", keyword: "ノイズキャンセリング ヘッドホン" },
    { name: "遮音耳栓", why: "音の刺激を減らしたい場面に、手軽に使えます。", keyword: "耳栓 遮音" },
    { name: "シャドーイング教材", why: "外国語を、発音と抑揚ごとまねて覚えられます。", keyword: "シャドーイング 英語 教材" },
  ],
};

/** どのタイプにも出す、理論の原典 */
export const SOURCE_BOOK: Recommendation = {
  name: "医師のつくった「頭のよさ」テスト（本田真美・光文社新書）",
  why: "認知特性の考え方をもっと知りたい方へ。本診断が参考にした理論の原典です。",
  keyword: "医師のつくった 頭のよさ テスト 本田真美",
};

export const amazonSearchUrl = (keyword: string): string => {
  const params = new URLSearchParams({ k: keyword });
  if (AMAZON_TAG) params.set("tag", AMAZON_TAG);
  return `https://www.amazon.co.jp/s?${params}`;
};

export const IS_AFFILIATE = Boolean(AMAZON_TAG);
