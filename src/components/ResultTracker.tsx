"use client";

import { useEffect } from "react";
import { RESULT_SECTIONS, track } from "@/lib/analytics";
import type { TypeId } from "@/lib/content";

/** 結果画面の外側の要素に付ける印（ResultView の data-result-root） */
const RESULT_ROOT_ATTR = "data-result-root";

/** 同じサイト内ならパス、外部なら「ホスト名」を返す（クエリは送らない） */
const linkTarget = (href: string): string => {
  const u = new URL(href, window.location.href);
  return u.origin === window.location.origin ? u.pathname : u.host;
};

/**
 * 結果画面の計測。表示・どこまで読んだか（各区切りが画面に入ったら1回ずつ）・どのリンクで次へ進んだか。
 * 結果を見たあとに何をしているかを GA4 で追えるようにする。
 */
export function ResultTracker({ topType, hasChallenge }: { topType: TypeId; hasChallenge: boolean }) {
  useEffect(() => {
    track({ name: "result_view", top_type: topType, has_challenge: hasChallenge });
  }, [topType, hasChallenge]);

  useEffect(() => {
    const seen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const section = RESULT_SECTIONS.find((s) => s === entry.target.id);
          if (!entry.isIntersecting || !section || seen.has(section)) return;
          seen.add(section);
          track({ name: "result_section", section });
          observer.unobserve(entry.target);
        });
      },
      // 縦に長い区切りもあるので「何割見えたか」ではなく、画面の上6割に入ったら読んだとみなす
      { rootMargin: "0px 0px -40% 0px", threshold: 0 },
    );
    RESULT_SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!(e.target instanceof Element)) return;
      const a = e.target.closest("a[href]");
      if (!(a instanceof HTMLAnchorElement) || !a.closest(`[${RESULT_ROOT_ATTR}]`)) return;
      // 目次（同じページ内の移動）は「次へ進んだ」に含めない
      if (a.getAttribute("href")?.startsWith("#")) return;
      track({ name: "result_link_click", link_path: linkTarget(a.href) });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
