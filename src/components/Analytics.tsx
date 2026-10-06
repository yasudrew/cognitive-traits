"use client";

import Script from "next/script";
import { useConsent } from "@/lib/consent";
import { ADSENSE_CLIENT, GA_ID } from "@/lib/monetize-config";

/**
 * GA4 と AdSense の読み込み。
 * GA4 はバナーで「同意する」を選んだ人にだけ読み込む（同意前・拒否時は Google に何も送らない）。
 * AdSense は同意がなければ非パーソナライズ広告として配信する（AdSlot 側で指定）。
 */
export function Analytics() {
  const consent = useConsent();
  return (
    <>
      {GA_ID && consent === "granted" && (
        <>
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());gtag('config',${JSON.stringify(GA_ID)});`}
          </Script>
          <Script id="ga" src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        </>
      )}
      {ADSENSE_CLIENT && (
        <Script
          id="adsense"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      )}
    </>
  );
}
