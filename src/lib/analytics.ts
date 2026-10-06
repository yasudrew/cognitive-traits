import type { TypeId } from "./content";

type Gtag = (...args: unknown[]) => void;

/** どこからのシェアか（診断結果／相性診断への招待／相性の結果） */
export type ShareContext = "result" | "invite" | "pair";

/** 計測イベント。GA未設定・同意前でも呼んでよい（Consent Mode が送信を制御する） */
export type AnalyticsEvent =
  | { name: "quiz_start" }
  | { name: "quiz_resume"; answered: number }
  | { name: "quiz_complete"; top_type: TypeId; profile: string; consistency: number }
  | { name: "share"; method: "x" | "line" | "copy" | "native" | "image"; context: ShareContext }
  | { name: "pair_view"; match: number; kind: string }
  | { name: "challenge_start" }
  | { name: "challenge_complete"; rotation: number; memory: number }
  | { name: "affiliate_click"; type_id: TypeId; item: string };

export const track = (e: AnalyticsEvent) => {
  if (typeof window === "undefined") return;
  const g = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof g !== "function") return;
  const { name, ...params } = e;
  g("event", name, params);
};
