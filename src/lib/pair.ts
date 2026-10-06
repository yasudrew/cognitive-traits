import { TYPE_IDS, type TypeId } from "./content";
import type { Analysis } from "./scoring";

export type PairKind = "twin" | "balanced" | "complement";

export type PairAnalysis = {
  /** 似ている度 0〜100。6タイプのスコア差の平均から出す */
  match: number;
  kind: PairKind;
  /** 2人とも「やや強い」以上のタイプ */
  shared: TypeId[];
  /** 差が大きいタイプ（差の大きい順）。stronger はどちらが強いか */
  gaps: { id: TypeId; stronger: "a" | "b"; diff: number }[];
};

const STRONG = 58;
const GAP = 20;

export const analyzePair = (a: Analysis, b: Analysis): PairAnalysis => {
  const diffs = TYPE_IDS.map((id) => a.pct[id] - b.pct[id]);
  const avgAbs = diffs.reduce((s, d) => s + Math.abs(d), 0) / diffs.length;
  // 平均差10ポイントで80、20ポイントで60、30ポイントで40になる
  const match = Math.max(0, Math.min(100, Math.round(100 - avgAbs * 2)));
  return {
    match,
    kind: match >= 80 ? "twin" : match >= 60 ? "balanced" : "complement",
    shared: TYPE_IDS.filter((id) => a.pct[id] >= STRONG && b.pct[id] >= STRONG),
    gaps: TYPE_IDS.map((id, i) => ({ id, stronger: diffs[i] > 0 ? ("a" as const) : ("b" as const), diff: Math.abs(diffs[i]) }))
      .filter((g) => g.diff >= GAP)
      .sort((x, y) => y.diff - x.diff),
  };
};
