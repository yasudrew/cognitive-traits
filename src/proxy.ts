import { NextResponse, type NextRequest } from "next/server";
import { SITE_URL } from "@/lib/site";

/** 旧URL。独自ドメインに移ったら、ここへのアクセスを本番URLへ恒久的に転送する */
const LEGACY_HOST = "cognitive-traits.vercel.app";
const SITE_HOST = new URL(SITE_URL).host;

/**
 * 1. 旧URL（vercel.app）へのアクセスは、同じパスのまま本番ドメインへ 308 で転送する
 *    （本番URLがまだ旧URLのままなら何もしない。プレビュー用の URL も対象外）
 * 2. 日本語ページはURLに /ja を付けずに配信する。/types → /ja/types へ内部的にrewriteし、/en/... はそのまま通す
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  // nextUrl.host は環境によってサーバー自身のアドレスになるため、Host ヘッダーで判定する
  if (request.headers.get("host") === LEGACY_HOST && SITE_HOST !== LEGACY_HOST) {
    return NextResponse.redirect(new URL(`${pathname}${search}`, SITE_URL), 308);
  }
  // 拡張子付きファイル（favicon, sitemap.xml 等）と、言語付きのパスはそのまま通す
  if (/\.[^/]+$/.test(pathname) || /^\/(ja|en)(\/|$)/.test(pathname)) return NextResponse.next();
  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? "/ja" : `/ja${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Next内部とAPIは対象外。旧URLを転送するため、拡張子付きファイルも通す
  matcher: ["/((?!_next|api).*)"],
};
