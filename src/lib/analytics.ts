import type { TypeId } from "./content";

type Gtag = (...args: unknown[]) => void;

/** どこからのシェアか（診断結果／相性診断への招待／相性の結果） */
export type ShareContext = "result" | "invite" | "pair";

export type ShareMethod = "x" | "line" | "copy" | "native" | "image";

/** 結果画面で、どこまで読まれたかを測る区切り（ResultView の id と同じ） */
export const RESULT_SECTIONS = ["profile", "scores", "categories", "guide", "details", "challenge", "share"] as const;
export type ResultSection = (typeof RESULT_SECTIONS)[number];

/** 計測イベント。GA未設定・同意前でも呼んでよい（Consent Mode が送信を制御する） */
export type AnalyticsEvent =
  | { name: "quiz_start" }
  | { name: "quiz_resume"; answered: number }
  | { name: "quiz_complete"; top_type: TypeId; profile: string; consistency: number }
  | { name: "share"; method: ShareMethod; context: ShareContext }
  | { name: "pair_view"; match: number; kind: string }
  | { name: "challenge_start" }
  | { name: "challenge_complete"; rotation: number; memory: number }
  | { name: "affiliate_click"; type_id: TypeId; item: string }
  | { name: "result_view"; top_type: TypeId; has_challenge: boolean }
  | { name: "result_section"; section: ResultSection }
  | { name: "result_link_click"; link_path: string };

export const track = (e: AnalyticsEvent) => {
  if (typeof window === "undefined") return;
  const g = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof g !== "function") return;
  const { name, ...params } = e;
  g("event", name, params);
};

/**
 * シェアするURLに、どの方法でどこから共有されたかの印（utm）を付ける。
 * LINE やコピーで渡ったリンクは参照元が残らず GA4 で「Direct」になるため、ここで見分けられるようにする。
 */
export const withShareUtm = (url: string, method: Exclude<ShareMethod, "image">, context: ShareContext): string => {
  const u = new URL(url);
  u.searchParams.set("utm_source", method);
  u.searchParams.set("utm_medium", "share");
  u.searchParams.set("utm_campaign", context);
  return u.toString();
};

/**
 * 運営者本人のアクセスを GA4 で除外するための印。
 * どのページでも ?internal=1 を付けて開くとこのブラウザを「内部」として覚え、?internal=0 で解除する。
 * GA4 側は「データフィルタ：内部トラフィック」（traffic_type=internal）を有効にすると除外される。
 */
export const INTERNAL_TRAFFIC_KEY = "ct-internal-traffic";
