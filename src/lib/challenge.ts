import type { TypeId } from "./content";
import { TYPE_IDS } from "./content";

/* ═══ 図形回転（3D の実測） ═══
 * Shepard & Metzler 型の心的回転課題。左右の立体が「同じ形を回したもの」か「鏡像」かを判断する。
 */

export type Vec3 = readonly [number, number, number];

/** 3方向に折れ曲がる腕を持つ立体。どれもキラル（鏡像は回転で重ならない） */
const SHAPES: readonly (readonly Vec3[])[] = [
  [[0, 0, 0], [1, 0, 0], [2, 0, 0], [3, 0, 0], [3, 1, 0], [3, 2, 0], [3, 2, 1], [3, 2, 2]],
  [[0, 0, 0], [0, 1, 0], [0, 2, 0], [1, 2, 0], [2, 2, 0], [2, 2, 1], [2, 2, 2], [2, 3, 2]],
  [[0, 0, 0], [1, 0, 0], [1, 1, 0], [1, 2, 0], [1, 2, 1], [1, 2, 2], [2, 2, 2], [3, 2, 2]],
  [[0, 0, 0], [0, 0, 1], [0, 0, 2], [1, 0, 2], [2, 0, 2], [2, 1, 2], [2, 2, 2], [2, 3, 2]],
];

export type RotationTrial = {
  cubes: readonly Vec3[];
  /** 左の図形の向き（度） */
  baseAngle: number;
  /** 右の図形を縦軸まわりに追加で回す角度（度） */
  turn: number;
  mirrored: boolean;
};

export const ROTATION_TRIALS = 8;
export const ROTATION_TIME_LIMIT_MS = 20_000;

const shuffle = <T,>(xs: readonly T[], rand: () => number): T[] =>
  xs
    .map((x) => [rand(), x] as const)
    .sort((a, b) => a[0] - b[0])
    .map(([, x]) => x);

export const makeRotationTrials = (rand: () => number = Math.random): RotationTrial[] => {
  const turns = [60, 100, 140, 180];
  // 同じ・鏡像を半々にし、角度も偏らないように組む
  const plan = turns.flatMap((turn) => [false, true].map((mirrored) => ({ turn, mirrored })));
  return shuffle(plan, rand).map(({ turn, mirrored }, i) => ({
    cubes: SHAPES[i % SHAPES.length],
    baseAngle: Math.round(rand() * 360),
    turn,
    mirrored,
  }));
};

/* ═══ 見た目の記憶（カメラ の実測） ═══ */

export const MEMORY_SHAPES = ["circle", "square", "triangle", "star", "diamond", "heart"] as const;
export type MemoryShape = (typeof MEMORY_SHAPES)[number];
export const MEMORY_COLORS = ["#D94F3B", "#2968B0", "#178F5E", "#E0A800", "#6D4ABA", "#E07B39"] as const;
export type MemoryItem = { shape: MemoryShape; color: string };

export const MEMORY_STUDY_MS = 6_000;
export const MEMORY_QUESTIONS = 6;

export type MemoryQuestion =
  | { kind: "whatAt"; cell: number; options: MemoryItem[]; answer: number }
  | { kind: "whereIs"; item: MemoryItem; answer: number };

export type MemoryRound = { grid: MemoryItem[]; questions: MemoryQuestion[] };

const sameItem = (a: MemoryItem, b: MemoryItem) => a.shape === b.shape && a.color === b.color;

export const makeMemoryRound = (rand: () => number = Math.random): MemoryRound => {
  const all = MEMORY_SHAPES.flatMap((shape) => MEMORY_COLORS.map((color) => ({ shape, color })));
  const grid = shuffle(all, rand).slice(0, 9);
  const cells = shuffle([...grid.keys()], rand).slice(0, MEMORY_QUESTIONS);
  const questions = cells.map((cell, i): MemoryQuestion => {
    if (i % 2 === 1) return { kind: "whereIs", item: grid[cell], answer: cell };
    // 正解と「色だけ違う」「形だけ違う」紛らわしい選択肢を混ぜる
    const target = grid[cell];
    const lures = shuffle(
      all.filter((x) => !sameItem(x, target) && (x.shape === target.shape || x.color === target.color)),
      rand,
    ).slice(0, 3);
    const options = shuffle([target, ...lures], rand);
    return { kind: "whatAt", cell, options, answer: options.findIndex((o) => sameItem(o, target)) };
  });
  return { grid, questions: shuffle(questions, rand) };
};

/* ═══ イメージの鮮明さ ═══ */

export const VIVIDNESS_MIN = 1;
export const VIVIDNESS_MAX = 5;

/** タイプごとに1問。回答は 1（まったく浮かばない）〜5（実物と同じくらい鮮明） */
export const VIVIDNESS_ITEMS: readonly TypeId[] = TYPE_IDS;

/* ═══ 結果 ═══ */

export type ChallengeResult = {
  rotationCorrect: number;
  /** 正解した試行の平均回答時間（0.1秒単位） */
  rotationAvgDecisec: number;
  memoryCorrect: number;
  vividness: Record<TypeId, number>;
};

/**
 * URL用コード。先頭がバージョン、以降は数字のみ:
 * 回転正答数(1桁) + 記憶正答数(1桁) + 鮮明さ6桁 + 平均時間(3桁, 0.1秒)
 */
const CHALLENGE_VERSION = "1";

export const encodeChallenge = (r: ChallengeResult): string => {
  const t = Math.min(999, Math.max(0, Math.round(r.rotationAvgDecisec)));
  return CHALLENGE_VERSION + r.rotationCorrect + r.memoryCorrect + TYPE_IDS.map((id) => r.vividness[id]).join("") + String(t).padStart(3, "0");
};

export const decodeChallenge = (code: string): ChallengeResult | null => {
  if (!/^\d{12}$/.test(code) || code[0] !== CHALLENGE_VERSION) return null;
  const d = [...code].map(Number);
  const [rotationCorrect, memoryCorrect] = [d[1], d[2]];
  const viv = d.slice(3, 9);
  if (rotationCorrect > ROTATION_TRIALS || memoryCorrect > MEMORY_QUESTIONS) return null;
  if (viv.some((v) => v < VIVIDNESS_MIN || v > VIVIDNESS_MAX)) return null;
  return {
    rotationCorrect,
    memoryCorrect,
    rotationAvgDecisec: Number(code.slice(9)),
    vividness: Object.fromEntries(TYPE_IDS.map((id, i) => [id, viv[i]])) as Record<TypeId, number>,
  };
};

/** 偶然の正答率を差し引いて 0〜100 にする（目安。母集団の基準値ではない） */
const aboveChance = (correct: number, total: number, chance: number) =>
  Math.round(Math.max(0, (correct / total - chance) / (1 - chance)) * 100);

export const rotationScore = (r: ChallengeResult) => aboveChance(r.rotationCorrect, ROTATION_TRIALS, 0.5);
export const memoryScore = (r: ChallengeResult) => {
  // 「何があった？」は4択、「どこにあった？」は9択。半々なので平均の偶然正答率で補正する
  const chance = (1 / 4 + 1 / 9) / 2;
  return aboveChance(r.memoryCorrect, MEMORY_QUESTIONS, chance);
};
export const vividnessPct = (v: number) => Math.round(((v - VIVIDNESS_MIN) / (VIVIDNESS_MAX - VIVIDNESS_MIN)) * 100);

/** 視覚イメージ（カメラ・3D・ファンタジー）がほぼ浮かばない */
export const weakVisualImagery = (r: ChallengeResult) => (r.vividness.camera + r.vividness["3d"] + r.vividness.fantasy) / 3 <= 1.67;
/** 聴覚イメージ（ラジオ・サウンド）がほぼ浮かばない */
export const weakAuditoryImagery = (r: ChallengeResult) => (r.vividness.radio + r.vividness.sound) / 2 <= 1.5;
