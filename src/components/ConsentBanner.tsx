"use client";

import Link from "next/link";
import { setConsent, useConsent } from "@/lib/consent";
import { localePath, type Lang } from "@/lib/i18n";
import { NEEDS_CONSENT } from "@/lib/monetize-config";

const TEXT = {
  ja: { body: "サイトの改善と広告のために、Cookieを使ったアクセス解析を行っています。", policy: "プライバシーポリシー", accept: "同意する", reject: "必要なものだけ" },
  en: { body: "We use cookies for analytics and ads to improve this site.", policy: "Privacy Policy", accept: "Accept", reject: "Essential only" },
} as const;

/** Cookie利用の同意バナー。計測・広告が有効で、まだ選んでいない人にだけ出す */
export function ConsentBanner({ lang }: { lang: Lang }) {
  const consent = useConsent();
  if (!NEEDS_CONSENT || consent !== null) return null;
  const t = TEXT[lang];
  return (
    <div className="consent" role="dialog" aria-live="polite" aria-label={t.policy}>
      <p>
        {t.body}{" "}
        <Link className="text-link" href={localePath(lang, "/privacy")}>
          {t.policy}
        </Link>
      </p>
      <div className="consent-actions">
        <button className="secondary-btn" onClick={() => setConsent("denied")}>
          {t.reject}
        </button>
        <button className="primary-btn" onClick={() => setConsent("granted")}>
          {t.accept}
        </button>
      </div>
    </div>
  );
}
