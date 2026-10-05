import { UI } from "@/lib/content";
import type { Lang } from "@/lib/i18n";
import { OFFICIAL_TEST_URL } from "@/lib/site";

export function Footer({ lang }: { lang: Lang }) {
  const u = UI[lang];
  return (
    <footer className="site-footer">
      <p>
        {u.disclaimer}{" "}
        <a className="text-link" href={OFFICIAL_TEST_URL} target="_blank" rel="noopener noreferrer">
          {u.officialLink}
        </a>
      </p>
      <p style={{ marginTop: 8 }}>© {new Date().getFullYear()} {u.siteTitle}</p>
    </footer>
  );
}
