import { CATEGORIES, TYPE_IDS, type CategoryId, type TypeId } from "./content";
import { QUESTIONS, type PairQuestion } from "./questions";

/**
 * 1問の回答。0 = Aにとても近い … 2 = どちらとも … 4 = Bにとても近い
 */
export type Answer = 0 | 1 | 2 | 3 | 4;
export const ANSWER_VALUES: readonly Answer[] = [0, 1, 2, 3, 4];
const SCALE = 4;

export type Scores = Record<TypeId, number>;

/** その設問でタイプXに寄った度合い（0〜4）。Xが登場しない設問では null */
const leanToward = (q: PairQuestion, v: Answer, x: TypeId): number | null => {
  if (q.a === x) return SCALE - v;
  if (q.b === x) return v;
  return null;
};

/** 各タイプが登場する設問数 × 最大点 */
export const MAX_PER_TYPE = SCALE * QUESTIONS.filter((q) => q.a === TYPE_IDS[0] || q.b === TYPE_IDS[0]).length;

export const computeScores = (answers: readonly Answer[]): Scores =>
  Object.fromEntries(
    TYPE_IDS.map((id) => [id, QUESTIONS.reduce((sum, q, i) => sum + (leanToward(q, answers[i], id) ?? 0), 0)]),
  ) as Scores;

/** 0〜100。全タイプの平均はちょうど50になる */
export const toPct = (score: number): number => Math.round((score / MAX_PER_TYPE) * 100);

/* ═══ 結果コード ═══
 * 先頭1文字がバージョン、続く15文字に回答2問ずつ（5×5=25通り）を a〜y で詰める。
 * 回答そのものを保存するので、採点ロジックを改良しても過去の結果URLを再計算できる。
 */
const CODE_VERSION = "2";
const ALPHABET = "abcdefghijklmnopqrstuvwxy";
const isAnswer = (v: number): v is Answer => Number.isInteger(v) && v >= 0 && v <= SCALE;

export const encodeAnswers = (answers: readonly Answer[]): string => {
  if (answers.length !== QUESTIONS.length) throw new Error(`Expected ${QUESTIONS.length} answers, got ${answers.length}`);
  const chars = Array.from({ length: QUESTIONS.length / 2 }, (_, k) => ALPHABET[answers[2 * k] * 5 + answers[2 * k + 1]]);
  return CODE_VERSION + chars.join("");
};

export const decodeAnswers = (code: string): Answer[] | null => {
  if (code.length !== 1 + QUESTIONS.length / 2 || code[0] !== CODE_VERSION) return null;
  const answers = [...code.slice(1)].flatMap((c) => {
    const n = ALPHABET.indexOf(c);
    return n < 0 ? [NaN] : [Math.floor(n / 5), n % 5];
  });
  return answers.every(isAnswer) ? answers : null;
};

/* ═══ 分析 ═══ */

export type ProfileKind = "single" | "mixed" | "balanced";
export type ConsistencyLevel = "high" | "mid" | "low";

export type Analysis = {
  scores: Scores;
  pct: Record<TypeId, number>;
  /** スコア降順 */
  sorted: TypeId[];
  /** 同点1位を含むトップ */
  top: TypeId[];
  /** トップ未満で最も高いタイプ */
  next: TypeId | null;
  /** カテゴリ別の強さ(0〜100)と、カテゴリ内で1つ目のタイプが占める割合(0〜100) */
  categories: { id: CategoryId; pct: number; firstShare: number }[];
  profile: ProfileKind;
  /** 同じ組み合わせの2問で回答がそろっている度合い(0〜100) */
  consistency: number;
  consistencyLevel: ConsistencyLevel;
};

/** 同じ2タイプを比べた2問の組。設問データの不備はここで検出する */
const PAIRS: readonly [number, number][] = (() => {
  const key = (q: PairQuestion) => [q.a, q.b].sort().join("|");
  const byKey = new Map<string, number[]>();
  QUESTIONS.forEach((q, i) => byKey.set(key(q), [...(byKey.get(key(q)) ?? []), i]));
  return [...byKey.entries()].map(([k, idx]) => {
    if (idx.length !== 2) throw new Error(`Pair ${k} must appear exactly twice, got questions ${idx.join(",")}`);
    if (QUESTIONS[idx[0]].a === QUESTIONS[idx[1]].a) throw new Error(`Pair ${k} must swap A/B between its two questions`);
    return [idx[0], idx[1]] as [number, number];
  });
})();

const consistencyOf = (answers: readonly Answer[]): number => {
  const agreement = PAIRS.map(([i, j]) => {
    const x = QUESTIONS[i].a;
    const li = leanToward(QUESTIONS[i], answers[i], x) ?? 0;
    const lj = leanToward(QUESTIONS[j], answers[j], x) ?? 0;
    return 1 - Math.abs(li - lj) / SCALE;
  });
  return Math.round((agreement.reduce((s, a) => s + a, 0) / agreement.length) * 100);
};

/** 降順に並んだパーセンテージから、プロファイルの形を判定する */
const profileOf = (desc: number[]): ProfileKind => {
  const spread = desc[0] - desc[desc.length - 1];
  if (spread < 20) return "balanced";
  if (desc[0] - desc[1] >= 8) return "single";
  return "mixed";
};

export const analyze = (answers: readonly Answer[]): Analysis => {
  const scores = computeScores(answers);
  const pct = Object.fromEntries(TYPE_IDS.map((id) => [id, toPct(scores[id])])) as Record<TypeId, number>;
  const sorted = [...TYPE_IDS].sort((a, b) => scores[b] - scores[a]);
  const topScore = scores[sorted[0]];
  const consistency = consistencyOf(answers);
  return {
    scores,
    pct,
    sorted,
    top: sorted.filter((id) => scores[id] === topScore),
    next: sorted.find((id) => scores[id] < topScore) ?? null,
    categories: CATEGORIES.map((c) => {
      const [x, y] = c.ids;
      const total = scores[x] + scores[y];
      return {
        id: c.id,
        pct: Math.round((total / (MAX_PER_TYPE * 2)) * 100),
        firstShare: total === 0 ? 50 : Math.round((scores[x] / total) * 100),
      };
    }),
    profile: profileOf(sorted.map((id) => pct[id])),
    consistency,
    consistencyLevel: consistency >= 75 ? "high" : consistency >= 60 ? "mid" : "low",
  };
};

export type Level = "strong" | "mod" | "avg" | "low";

/** 平均(50)からの距離で強さを言葉にする */
export const levelOf = (pct: number): Level => (pct >= 70 ? "strong" : pct >= 58 ? "mod" : pct >= 42 ? "avg" : "low");
