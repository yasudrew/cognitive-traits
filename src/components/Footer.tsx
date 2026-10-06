import Link from "next/link";
import { UI } from "@/lib/content";
import { localePath, type Lang } from "@/lib/i18n";
import { OFFICIAL_TEST_URL } from "@/lib/site";
import { SITE_TEXT } from "@/lib/site-text";

export function Footer({ lang }: { lang: Lang }) {
  const u = UI[lang];
  const nav = SITE_TEXT[lang].footerNav;
  const links = [
    ["/", nav.home],
    ["/about", nav.about],
    ["/types", nav.types],
    ["/privacy", nav.privacy],
    ["/operator", nav.operator],
  ] as const;
  return (
    <footer className="site-footer">
      <nav className="footer-nav">
        {links.map(([path, label]) => (
          <Link key={path} href={localePath(lang, path)}>
            {label}
          </Link>
        ))}
      </nav>
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
