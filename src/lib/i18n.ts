export const LANGS = ["ja", "en"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "ja";

export const isLang = (v: string): v is Lang => (LANGS as readonly string[]).includes(v);

/** 日本語はプレフィックスなし、英語は /en を付ける */
export const localePath = (lang: Lang, path: string): string => {
  const p = path.startsWith("/") ? path : `/${path}`;
  if (lang === DEFAULT_LANG) return p;
  return p === "/" ? `/${lang}` : `/${lang}${p}`;
};

/** /en/types → /types のように言語プレフィックスを外す */
export const stripLocale = (pathname: string): string => {
  const m = pathname.match(/^\/(ja|en)(\/.*)?$/);
  return m ? (m[2] ?? "/") : pathname;
};

export const fill = (template: string, value: string | number): string => template.replace(/%[sd]/, String(value));
