"use client";

import { useState, useSyncExternalStore } from "react";
import { track, type ShareContext } from "@/lib/analytics";
import { UI } from "@/lib/content";
import type { Lang } from "@/lib/i18n";

const noopSubscribe = () => () => {};

type Props = {
  lang: Lang;
  url: string;
  text: string;
  /** 見出し（省略時は「結果をシェアする」） */
  title?: string;
  /** 「画像を保存」で保存する画像のURL。省略時はボタンを出さない */
  imageUrl?: string;
  /** 補足の一文 */
  lead?: string;
  context?: ShareContext;
};

export function ShareButtons({ lang, url, text, title, imageUrl, lead, context = "result" }: Props) {
  const u = UI[lang];
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  // サーバーでは false にしてハイドレーションのずれを防ぐ
  const canShare = useSyncExternalStore(noopSubscribe, () => "share" in navigator, () => false);
  const xUrl = `https://twitter.com/intent/tweet?${new URLSearchParams({ text, url, hashtags: u.shareHashtag })}`;
  const lineUrl = `https://social-plugins.line.me/lineit/share?${new URLSearchParams({ url })}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      track({ name: "share", method: "copy", context });
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Failed to copy result URL", e);
    }
  };

  const nativeShare = async () => {
    try {
      await navigator.share({ text, url });
      track({ name: "share", method: "native", context });
    } catch (e) {
      // ユーザーが共有シートを閉じた場合は AbortError になるので無視する
      if (!(e instanceof DOMException && e.name === "AbortError")) console.error("Share failed", e);
    }
  };

  // スマホは共有メニュー（写真に保存・インスタなど）、PCはダウンロードで画像を渡す
  const saveImage = async () => {
    if (!imageUrl || saving) return;
    setSaving(true);
    try {
      const res = await fetch(imageUrl);
      if (!res.ok) throw new Error(`Image request failed: ${res.status}`);
      const blob = await res.blob();
      const file = new File([blob], "cognitive-style.png", { type: "image/png" });
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file] });
      } else {
        const href = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = href;
        a.download = file.name;
        a.click();
        URL.revokeObjectURL(href);
      }
      track({ name: "share", method: "image", context });
    } catch (e) {
      if (!(e instanceof DOMException && e.name === "AbortError")) console.error("Failed to save share image", e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="card">
      <h2 className="section-title">{title ?? u.shareTitle}</h2>
      {lead && <p style={{ fontSize: 14, color: "var(--sub)", marginBottom: 16 }}>{lead}</p>}
      <div className="share-row">
        <a className="share-btn x" href={xUrl} target="_blank" rel="noopener noreferrer" onClick={() => track({ name: "share", method: "x", context })}>
          𝕏 Post
        </a>
        {lang === "ja" && (
          <a className="share-btn line" href={lineUrl} target="_blank" rel="noopener noreferrer" onClick={() => track({ name: "share", method: "line", context })}>
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
      {imageUrl && (
        <div className="save-image">
          <button className="secondary-btn" onClick={saveImage} disabled={saving}>
            {u.saveImage}
          </button>
          <span>{u.saveImageHint}</span>
        </div>
      )}
    </div>
  );
}
