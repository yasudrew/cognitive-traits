"use client";

import Script from "next/script";
import { useConsent } from "@/lib/consent";
import { ADSENSE_CLIENT, GA_ID } from "@/lib/monetize-config";
import { INTERNAL_TRAFFIC_KEY } from "@/lib/analytics";

/**
 * GA4 と AdSense の読み込み。
 * GA4 はバナーで「同意する」を選んだ人にだけ読み込む（同意前・拒否時は Google に何も送らない）。
 * AdSense は同意がなければ非パーソナライズ広告として配信する（AdSlot 側で指定）。
 * ?internal=1 で開いたブラウザは運営者本人として traffic_type=internal を付けて送る（analytics.ts の INTERNAL_TRAFFIC_KEY）。
 */
export function Analytics() {
  const consent = useConsent();
  return (
    <>
      {GA_ID && consent === "granted" && (
        <>
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());
var k=${JSON.stringify(INTERNAL_TRAFFIC_KEY)},q=new URLSearchParams(location.search).get('internal'),internal=false;
try{if(q==='1')localStorage.setItem(k,'1');if(q==='0')localStorage.removeItem(k);internal=localStorage.getItem(k)==='1';}catch(e){internal=q==='1';}
gtag('config',${JSON.stringify(GA_ID)},internal?{traffic_type:'internal'}:{});`}
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
