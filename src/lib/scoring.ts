import { QUESTIONS, TYPE_META, type TypeId } from "./content";

export type Scores = Record<TypeId, number>;
export type Answers = Readonly<Record<number, number>>;

const PER_TYPE = TYPE_META.map((m) => QUESTIONS.filter((q) => q.type === m.id).length);
export const MAX_PER_TYPE = 5 * Math.max(...PER_TYPE);
export const MIN_PER_TYPE = 1 * Math.min(...PER_TYPE);

const CODE_VERSION = "1";
const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

export const computeScores = (answers: Answers): Scores =>
  Object.entries(answers).reduce<Scores>(
    (acc, [qi, val]) => {
      const q = QUESTIONS[Number(qi)];
      if (!q) throw new Error(`Unknown question index: ${qi}`);
      return { ...acc, [q.type]: acc[q.type] + val };
    },
    Object.fromEntries(TYPE_META.map((m) => [m.id, 0])) as Scores,
  );

/**
 * スコアを短いURL用コードにする。先頭1文字がバージョン、続く6文字がTYPE_META順の各スコア。
 * 設問数や配点を変えたらバージョンを上げ、旧コードも読めるようにする。
 */
export const encodeScores = (scores: Scores): string =>
  CODE_VERSION +
  TYPE_META.map((m) => {
    const v = scores[m.id] - MIN_PER_TYPE;
    if (v < 0 || v >= ALPHABET.length) throw new Error(`Score out of range: ${m.id}=${scores[m.id]}`);
    return ALPHABET[v];
  }).join("");

export const decodeScores = (code: string): Scores | null => {
  if (code.length !== 1 + TYPE_META.length || code[0] !== CODE_VERSION) return null;
  const values = [...code.slice(1)].map((c) => ALPHABET.indexOf(c) + MIN_PER_TYPE);
  if (values.some((v) => v < MIN_PER_TYPE || v > MAX_PER_TYPE)) return null;
  return Object.fromEntries(TYPE_META.map((m, i) => [m.id, values[i]])) as Scores;
};

export type Ranking = {
  /** スコア降順のタイプID */
  sorted: TypeId[];
  /** 同率1位を含むトップ */
  top: TypeId[];
  /** トップ未満で最も高いタイプ */
  next: TypeId | null;
};

export const rank = (scores: Scores): Ranking => {
  const sorted = TYPE_META.map((m) => m.id).sort((a, b) => scores[b] - scores[a]);
  const topScore = scores[sorted[0]];
  const top = sorted.filter((id) => scores[id] === topScore);
  return { sorted, top, next: sorted.find((id) => scores[id] < topScore) ?? null };
};

export const toPercent = (value: number, max: number): number => Math.round((value / max) * 100);
