"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/** 相性ページの表示を1回だけ計測する */
export function PairTracker({ match, kind }: { match: number; kind: string }) {
  useEffect(() => {
    track({ name: "pair_view", match, kind });
  }, [match, kind]);
  return null;
}
