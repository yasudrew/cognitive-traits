import type { TypeId } from "../content";

/** 記事本文のブロック。マークダウンを使わず型で書き、表示側でそろえる */
export type Block =
  | { kind: "h2"; text: string }
  | { kind: "p"; text: string }
  | { kind: "ul"; items: readonly string[] }
  /** 番号付きの手法リスト（見出し＋説明） */
  | { kind: "steps"; items: readonly { title: string; body: string }[] }
  | { kind: "note"; text: string };

/** guide はタイプを問わない「伝え方」の記事（親・先生・リーダー向け） */
export type ArticleTopic = "study" | "work" | "relationships" | "guide";

type ArticleBase = {
  slug: string;
  title: string;
  description: string;
  published: string;
  updated: string;
  blocks: readonly Block[];
};

export type Article = ArticleBase & ({ topic: "guide"; typeId: null } | { topic: Exclude<ArticleTopic, "guide">; typeId: TypeId });

export const TOPIC_LABEL: Record<ArticleTopic, string> = {
  study: "勉強法",
  work: "仕事",
  relationships: "人間関係",
  guide: "伝え方",
};

/** どの記事にも入れる、学習スタイル仮説についての注意書き */
export const STYLE_CAVEAT =
  "なお、「自分のタイプに合った方法だけで学べば成績が上がる」という考え方（学習スタイル仮説）は、研究では十分に裏付けられていません（Pashler ら, 2008 のレビューなど）。ここで紹介する方法は、苦手意識を減らして学びの入口をつくる工夫として使い、ほかのタイプの方法とも組み合わせてください。実際に記憶の定着に効果が確かめられているのは、「思い出す練習」と「間隔をあけた復習」です。";

/** 仕事の記事に入れる注意書き */
export const WORK_CAVEAT =
  "認知特性は情報の受け取り方の傾向で、職業の向き不向きを決めるものではありません。どの仕事も複数の処理を組み合わせて行うもので、苦手な形式も工夫や経験で十分に補えます。ここで挙げる職種は「強みを活かしやすい場面の例」として参考にしてください。";

/** 人間関係の記事に入れる注意書き */
export const RELATIONSHIP_CAVEAT =
  "認知特性は情報の受け取り方の傾向で、性格や相性の良し悪しを決めるものではありません。同じタイプでも人によって違いがあり、関係は経験や工夫で変わっていきます。ここで紹介する内容は、すれ違いの理由を考えるヒントとして使ってください。";

/** 伝え方ガイドに入れる注意書き */
export const GUIDE_CAVEAT =
  "認知特性は情報の受け取り方の傾向で、その人の能力や性格を決めるものではありません。とくに子どもは成長とともに変わっていくので、「この子は〇〇タイプだから」と決めつけず、反応を見ながら伝え方を試すヒントとして使ってください。また、「タイプに合った方法だけで学べば成績が上がる」という考え方（学習スタイル仮説）は、研究では十分に裏付けられていません。ここで紹介するのは、伝わりやすくするための工夫です。";
