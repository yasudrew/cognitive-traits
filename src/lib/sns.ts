import { TYPE_IDS, TYPE_TAGLINE, getType, isTypeId, type TypeId } from "./content";
import { GUIDES, GUIDE_LABELS } from "./guides";

/**
 * SNS（主に Instagram）用の画像の一覧。日本語のみ。
 * - icon      … アカウントのアイコン（1080×1080）
 * - header-x  … X のヘッダー（1500×500）
 * - intro     … 開設告知の1枚目（1080×1350）
 * - {type}-1〜5 … タイプ別の複数枚投稿（表紙・得意・つまずき・学び方・診断へ）
 */
export const SNS_SLIDE_COUNT = 5;

export type SnsSlide =
  | { kind: "icon" }
  | { kind: "header-x" }
  | { kind: "intro" }
  | { kind: "cover"; type: TypeId }
  | { kind: "list"; type: TypeId; section: "strengths" | "struggles" | "learning"; index: number }
  | { kind: "cta"; type: TypeId };

const LIST_SECTIONS = ["strengths", "struggles", "learning"] as const;

export const SNS_SLIDE_IDS: readonly string[] = [
  "icon",
  "header-x",
  "intro",
  ...TYPE_IDS.flatMap((id) => Array.from({ length: SNS_SLIDE_COUNT }, (_, i) => `${id}-${i + 1}`)),
];

/** URL の slide 部分を解釈する。知らない形なら null */
export function parseSnsSlide(slide: string): SnsSlide | null {
  if (slide === "icon") return { kind: "icon" };
  if (slide === "header-x") return { kind: "header-x" };
  if (slide === "intro") return { kind: "intro" };
  const m = slide.match(/^(.+)-([1-9])$/);
  if (!m || !isTypeId(m[1])) return null;
  const type = m[1];
  const n = Number(m[2]);
  if (n === 1) return { kind: "cover", type };
  if (n >= 2 && n <= 4) return { kind: "list", type, section: LIST_SECTIONS[n - 2], index: n };
  if (n === SNS_SLIDE_COUNT) return { kind: "cta", type };
  return null;
}

/** 画像に載せる文字。フォントの文字サブセットもここから作る */
export function snsSlideText(slide: SnsSlide) {
  if (slide.kind === "icon") return { heading: "認知特性", lines: [] as string[] };
  if (slide.kind === "header-x") {
    return { heading: "あなたの認知特性を知ろう", lines: ["見て覚える？ 聞いて覚える？ 言葉で考える？", "30問・約5分・無料"] };
  }
  if (slide.kind === "intro") {
    return {
      heading: "あなたの認知特性を知ろう",
      lines: ["見て覚える？", "聞いて覚える？", "言葉で考える？", "30問・約5分・無料", "6つのタイプで、覚え方と考え方のクセがわかる", "視覚優位", "言語優位", "聴覚優位"],
    };
  }
  const t = getType(slide.type, "ja");
  if (slide.kind === "cover") {
    return { heading: t.label, lines: [TYPE_TAGLINE[slide.type].ja, t.category, "あなたはどのタイプ？"] };
  }
  if (slide.kind === "list") {
    return { heading: GUIDE_LABELS.ja[slide.section], lines: [t.label, ...GUIDES[slide.type].ja[slide.section].slice(0, 3)] };
  }
  return { heading: "あなたはどのタイプ？", lines: [t.label, "30問・約5分・無料", "プロフィールのリンクから", "独自の非公式診断です"] };
}
