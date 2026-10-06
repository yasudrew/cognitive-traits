"use client";

import Link from "next/link";
import { localePath, type Lang } from "@/lib/i18n";
import { useLastResult } from "@/lib/last-result";
import { PAIR_TEXT } from "@/lib/pair-text";

/** 招待ページのボタン。前回の自分の結果が残っていれば、それで相性を見られるようにする */
export function PairInviteActions({ lang, inviter }: { lang: Lang; inviter: string }) {
  const t = PAIR_TEXT[lang];
  const last = useLastResult()?.split("?")[0] ?? null;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <Link className="primary-btn" href={localePath(lang, `/quiz?pair=${inviter}`)}>
        {t.inviteStart}
        <span style={{ marginLeft: 8 }}>→</span>
      </Link>
      {last && last !== inviter && (
        <Link className="secondary-btn" href={localePath(lang, `/pair/${inviter}/${last}`)}>
          {t.inviteUseMine}
        </Link>
      )}
    </div>
  );
}
