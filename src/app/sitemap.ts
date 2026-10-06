import type { MetadataRoute } from "next";
import { TYPE_IDS } from "@/lib/content";
import { LANGS } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/site";

const PATHS = ["/", "/about", "/types", ...TYPE_IDS.map((id) => `/types/${id}`), "/privacy", "/operator"];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map((path) => ({
    url: absoluteUrl("ja", path),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
    alternates: { languages: Object.fromEntries(LANGS.map((l) => [l, absoluteUrl(l, path)])) },
  }));
}
