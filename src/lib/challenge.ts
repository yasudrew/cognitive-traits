import type { TypeId } from "./content";
import { TYPE_IDS } from "./content";
import type { Lang } from "./i18n";

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

/* ═══ 耳と目の単語記憶（ラジオ・辞書 の実測） ═══
 * 6語を文字で見せ、別の6語を音声で聞かせたあと、新しい6語を混ぜた18語から出てきた語を選ばせる。
 * 耳から入れた語と目から入れた語の残りやすさを比べる。
 */

export const WORDS_PER_LIST = 6;
export const WORD_SHOW_MS = 1_500;
export const WORD_GAP_MS = 600;

/** 身近で絵にしやすい名詞。音や形が似た語は入れない */
const WORD_POOL: Record<Lang, readonly string[]> = {
  ja: ["りんご", "えんぴつ", "かさ", "くつした", "ふうせん", "はさみ", "めがね", "たいこ", "ぼうし", "きって", "まくら", "ふくろう", "にんじん", "かがみ", "ろうそく", "はしご", "ほうき", "つくえ", "たまご", "うちわ", "ちょうちょ", "すいか", "とけい", "かばん", "いちご", "くじら", "らっぱ", "ふね", "こま", "やかん"],
  en: ["apple", "pencil", "umbrella", "sock", "balloon", "scissors", "glasses", "drum", "hat", "stamp", "pillow", "owl", "carrot", "mirror", "candle", "ladder", "broom", "desk", "egg", "fan", "butterfly", "melon", "clock", "bag", "strawberry", "whale", "trumpet", "boat", "spoon", "kettle"],
};

export type WordRound = {
  visual: string[];
  audio: string[];
  lures: string[];
  /** 文字のリストを先に出すか（順番の影響を打ち消すため毎回ランダム） */
  visualFirst: boolean;
  /** 想起テストに並べる18語 */
  test: string[];
};

export const makeWordRound = (lang: Lang, rand: () => number = Math.random): WordRound => {
  const picked = shuffle(WORD_POOL[lang], rand).slice(0, WORDS_PER_LIST * 3);
  const visual = picked.slice(0, WORDS_PER_LIST);
  const audio = picked.slice(WORDS_PER_LIST, WORDS_PER_LIST * 2);
  const lures = picked.slice(WORDS_PER_LIST * 2);
  return { visual, audio, lures, visualFirst: rand() < 0.5, test: shuffle(picked, rand) };
};

export type WordScore = { visual: number; audio: number; falseAlarms: number };

export const scoreWords = (round: WordRound, selected: ReadonlySet<string>): WordScore => ({
  visual: round.visual.filter((w) => selected.has(w)).length,
  audio: round.audio.filter((w) => selected.has(w)).length,
  falseAlarms: round.lures.filter((w) => selected.has(w)).length,
});

/* ═══ 結果 ═══ */

export type ChallengeResult = {
  rotationCorrect: number;
  /** 正解した試行の平均回答時間（0.1秒単位） */
  rotationAvgDecisec: number;
  memoryCorrect: number;
  vividness: Record<TypeId, number>;
  /** 音声の課題をスキップした場合は null */
  words: WordScore | null;
};

/**
 * URL用コード（数字のみ）。
 * v1: "1" + 回転正答数(1) + 記憶正答数(1) + 鮮明さ(6) + 平均時間(3, 0.1秒) … 12桁
 * v2: v1 の後ろに 文字の単語の正答数(1) + 音声の単語の正答数(1) + 誤答数(1) を足した15桁。スキップ時は "999"
 * 共有済みのv1のURLも読めるようにしておく。
 */
const CHALLENGE_VERSION = "2";
const SKIPPED_WORDS = "999";

export const encodeChallenge = (r: ChallengeResult): string => {
  const t = Math.min(999, Math.max(0, Math.round(r.rotationAvgDecisec)));
  const words = r.words ? `${r.words.visual}${r.words.audio}${r.words.falseAlarms}` : SKIPPED_WORDS;
  return CHALLENGE_VERSION + r.rotationCorrect + r.memoryCorrect + TYPE_IDS.map((id) => r.vividness[id]).join("") + String(t).padStart(3, "0") + words;
};

const decodeWords = (part: string): WordScore | null | undefined => {
  if (part === SKIPPED_WORDS) return null;
  const [visual, audio, falseAlarms] = [...part].map(Number);
  if ([visual, audio, falseAlarms].some((n) => n > WORDS_PER_LIST)) return undefined;
  return { visual, audio, falseAlarms };
};

export const decodeChallenge = (code: string): ChallengeResult | null => {
  const v1 = /^1\d{11}$/.test(code);
  const v2 = /^2\d{14}$/.test(code);
  if (!v1 && !v2) return null;
  const d = [...code].map(Number);
  const [rotationCorrect, memoryCorrect] = [d[1], d[2]];
  const viv = d.slice(3, 9);
  if (rotationCorrect > ROTATION_TRIALS || memoryCorrect > MEMORY_QUESTIONS) return null;
  if (viv.some((v) => v < VIVIDNESS_MIN || v > VIVIDNESS_MAX)) return null;
  const words = v2 ? decodeWords(code.slice(12, 15)) : null;
  if (words === undefined) return null;
  return {
    rotationCorrect,
    memoryCorrect,
    rotationAvgDecisec: Number(code.slice(9, 12)),
    vividness: Object.fromEntries(TYPE_IDS.map((id, i) => [id, viv[i]])) as Record<TypeId, number>,
    words,
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

/** 単語の記憶を 0〜100 に。誤って選んだ新しい語の数を差し引いて、当てずっぽうの影響を減らす */
export const wordScore = (hits: number, falseAlarms: number) =>
  Math.round(Math.max(0, (hits - falseAlarms) / WORDS_PER_LIST) * 100);
