import { NextResponse, type NextRequest } from "next/server";

/**
 * 日本語ページはURLに /ja を付けずに配信する。
 * /types → /ja/types へ内部的にrewriteし、/en/... はそのまま通す。
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (/^\/(ja|en)(\/|$)/.test(pathname)) return NextResponse.next();
  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? "/ja" : `/ja${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Next内部・API・拡張子付きファイル（favicon, sitemap.xml 等）は対象外
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
