import type { MetadataRoute } from "next";
import { ARTICLES } from "@/lib/articles";
import { TYPE_IDS } from "@/lib/content";
import { LANGS } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/site";

const PATHS = ["/", "/about", "/types", ...TYPE_IDS.map((id) => `/types/${id}`), "/privacy", "/operator"];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = PATHS.map((path) => ({
    url: absoluteUrl("ja", path),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
    alternates: { languages: Object.fromEntries(LANGS.map((l) => [l, absoluteUrl(l, path)])) },
  }));
  // 記事は日本語のみなので hreflang は付けない
  const articles: MetadataRoute.Sitemap = [
    { url: absoluteUrl("ja", "/articles"), changeFrequency: "weekly", priority: 0.8 },
    ...ARTICLES.map((a) => ({ url: absoluteUrl("ja", `/articles/${a.slug}`), lastModified: a.updated, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
  return [...pages, ...articles];
}
