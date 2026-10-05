"use client";

import { useState, useSyncExternalStore } from "react";
import { UI } from "@/lib/content";
import type { Lang } from "@/lib/i18n";

const noopSubscribe = () => () => {};

type Props = { lang: Lang; url: string; text: string };

export function ShareButtons({ lang, url, text }: Props) {
  const u = UI[lang];
  const [copied, setCopied] = useState(false);
  // サーバーでは false にしてハイドレーションのずれを防ぐ
  const canShare = useSyncExternalStore(noopSubscribe, () => "share" in navigator, () => false);
  const xUrl = `https://twitter.com/intent/tweet?${new URLSearchParams({ text, url, hashtags: u.shareHashtag })}`;
  const lineUrl = `https://social-plugins.line.me/lineit/share?${new URLSearchParams({ url })}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Failed to copy result URL", e);
    }
  };

  const nativeShare = async () => {
    try {
      await navigator.share({ text, url });
    } catch (e) {
      // ユーザーが共有シートを閉じた場合は AbortError になるので無視する
      if (!(e instanceof DOMException && e.name === "AbortError")) console.error("Share failed", e);
    }
  };

  return (
    <div className="card" style={{ textAlign: "center" }}>
      <h2 className="section-title">{u.shareTitle}</h2>
      <div className="share-row">
        <a className="share-btn x" href={xUrl} target="_blank" rel="noopener noreferrer">
          𝕏 Post
        </a>
        {lang === "ja" && (
          <a className="share-btn line" href={lineUrl} target="_blank" rel="noopener noreferrer">
            LINE
          </a>
        )}
        <button className="share-btn" onClick={copy}>
          {copied ? u.copied : u.copyLink}
        </button>
        {canShare && (
          <button className="share-btn" onClick={nativeShare}>
            {u.shareMore}
          </button>
        )}
      </div>
    </div>
  );
}
