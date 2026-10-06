import { LANGS, localePath, type Lang } from "./i18n";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://cognitive-traits.vercel.app").replace(/\/$/, "");

export const OFFICIAL_TEST_URL = "https://cogtem.com/";

export const absoluteUrl = (lang: Lang, path: string): string => `${SITE_URL}${localePath(lang, path)}`;

/** canonical と hreflang をまとめて返す */
export const alternates = (lang: Lang, path: string) => ({
  canonical: localePath(lang, path),
  languages: Object.fromEntries([
    ...LANGS.map((l) => [l, localePath(l, path)] as const),
    ["x-default", localePath("ja", path)] as const,
  ]),
});
