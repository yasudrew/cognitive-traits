import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import type { NextConfig } from "next";

/** 旧URL。独自ドメインに移ったら、ここへのアクセスを本番URLへ恒久的に転送する */
const LEGACY_HOST = "cognitive-traits.vercel.app";
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? `https://${LEGACY_HOST}`).replace(/\/$/, "");

/**
 * 先頭のパス区切りが ja / en / _next / api ではなく、拡張子も含まない区切り。
 * 日本語ページは URL に /ja を付けずに配信するため、これを /ja/... へ内部的に書き換える。
 */
const NON_LOCALE_SEGMENT = ":first((?!(?:ja|en|_next|api)(?:/|$))[^./]+)";

const nextConfig: NextConfig = {
  /**
   * 以前は proxy.ts（ミドルウェア）でやっていた処理を設定ファイルに移した。
   * Cloudflare（OpenNext）では Node.js のミドルウェアが実験的な扱いのため。
   */
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", destination: "/ja" },
        { source: `/${NON_LOCALE_SEGMENT}`, destination: "/ja/:first" },
        { source: `/${NON_LOCALE_SEGMENT}/:rest*`, destination: "/ja/:first/:rest*" },
      ],
    };
  },
  /** 旧URL（vercel.app）へのアクセスは、同じパス・クエリのまま本番URLへ 308 で転送する */
  async redirects() {
    if (new URL(SITE_URL).host === LEGACY_HOST) return [];
    return [{ source: "/:path*", has: [{ type: "host", value: LEGACY_HOST }], destination: `${SITE_URL}/:path*`, permanent: true }];
  },
};

export default nextConfig;

// next dev でも Cloudflare の実行環境（バインディング等）を使えるようにする
initOpenNextCloudflareForDev();
