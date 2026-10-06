import type { TypeId } from "../content";

/** 記事本文のブロック。マークダウンを使わず型で書き、表示側でそろえる */
export type Block =
  | { kind: "h2"; text: string }
  | { kind: "p"; text: string }
  | { kind: "ul"; items: readonly string[] }
  /** 番号付きの手法リスト（見出し＋説明） */
  | { kind: "steps"; items: readonly { title: string; body: string }[] }
  | { kind: "note"; text: string };

export type ArticleTopic = "study" | "work" | "relationships";

export type Article = {
  slug: string;
  typeId: TypeId;
  topic: ArticleTopic;
  title: string;
  description: string;
  published: string;
  updated: string;
  blocks: readonly Block[];
};

export const TOPIC_LABEL: Record<ArticleTopic, string> = {
  study: "勉強法",
  work: "仕事",
  relationships: "人間関係",
};

/** どの記事にも入れる、学習スタイル仮説についての注意書き */
export const STYLE_CAVEAT =
  "なお、「自分のタイプに合った方法だけで学べば成績が上がる」という考え方（学習スタイル仮説）は、研究では十分に裏付けられていません（Pashler ら, 2008 のレビューなど）。ここで紹介する方法は、苦手意識を減らして学びの入口をつくる工夫として使い、ほかのタイプの方法とも組み合わせてください。実際に記憶の定着に効果が確かめられているのは、「思い出す練習」と「間隔をあけた復習」です。";

/** 仕事の記事に入れる注意書き */
export const WORK_CAVEAT =
  "認知特性は情報の受け取り方の傾向で、職業の向き不向きを決めるものではありません。どの仕事も複数の処理を組み合わせて行うもので、苦手な形式も工夫や経験で十分に補えます。ここで挙げる職種は「強みを活かしやすい場面の例」として参考にしてください。";
