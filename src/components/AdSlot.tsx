"use client";

import { useEffect, useRef } from "react";
import { useConsent } from "@/lib/consent";
import type { Lang } from "@/lib/i18n";
import { ADSENSE_CLIENT, ADSENSE_SLOT } from "@/lib/monetize-config";

type AdsQueue = unknown[] & { requestNonPersonalizedAds?: 0 | 1 };

/** AdSense の広告枠。IDが未設定なら何も描画しない */
export function AdSlot({ lang }: { lang: Lang }) {
  const consent = useConsent();
  const pushed = useRef(false);

  useEffect(() => {
    if (!ADSENSE_CLIENT || !ADSENSE_SLOT || consent === "pending" || pushed.current) return;
    const w = window as unknown as { adsbygoogle?: AdsQueue };
    const queue: AdsQueue = w.adsbygoogle ?? [];
    // 同意がない場合はパーソナライズしない広告にする
    queue.requestNonPersonalizedAds = consent === "granted" ? 0 : 1;
    w.adsbygoogle = queue;
    try {
      queue.push({});
      pushed.current = true;
    } catch (e) {
      console.error("AdSense push failed", e);
    }
  }, [consent]);

  if (!ADSENSE_CLIENT || !ADSENSE_SLOT) return null;
  return (
    <aside className="ad-slot" aria-label={lang === "ja" ? "広告" : "Advertisement"}>
      <span className="ad-label">{lang === "ja" ? "広告" : "Advertisement"}</span>
      <ins className="adsbygoogle" style={{ display: "block" }} data-ad-client={ADSENSE_CLIENT} data-ad-slot={ADSENSE_SLOT} data-ad-format="auto" data-full-width-responsive="true" />
    </aside>
  );
}
