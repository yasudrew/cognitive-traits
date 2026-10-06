import Script from "next/script";
import { ADSENSE_CLIENT, CONSENT_STORAGE_KEY, GA_ID } from "@/lib/monetize-config";

/**
 * GA4 と AdSense の読み込み。Consent Mode v2 で「既定は拒否」にし、
 * 以前に同意済みならその場で許可に切り替えてから計測を始める。
 */
export function Analytics() {
  return (
    <>
      {GA_ID && (
        <>
          <Script id="ga-consent" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});
try{if(localStorage.getItem(${JSON.stringify(CONSENT_STORAGE_KEY)})==='granted'){gtag('consent','update',{analytics_storage:'granted',ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted'});}}catch(e){}
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
