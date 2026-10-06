"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { UI } from "@/lib/content";
import { localePath, stripLocale, type Lang } from "@/lib/i18n";
import { useLastResult } from "@/lib/last-result";

export function Nav({ lang }: { lang: Lang }) {
  const u = UI[lang];
  // プロキシのrewriteでサーバーとブラウザのパスが食い違うため、言語プレフィックスを外して比較する
  const base = stripLocale(usePathname());
  const lastResult = useLastResult();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const otherLang: Lang = lang === "ja" ? "en" : "ja";
  const is = (p: string) => base === p || base.startsWith(`${p}/`);

  return (
    <nav className="nav-bar">
      <Link className="nav-logo" href={localePath(lang, "/")} onClick={close}>
        {u.siteTitle}
      </Link>
      <button className={`hamburger${open ? " open" : ""}`} onClick={() => setOpen(!open)} aria-label="menu" aria-expanded={open}>
        <span />
        <span />
        <span />
      </button>
      <div className={`nav-links${open ? " open" : ""}`}>
        <Link className={`nav-link ${base === "/" || is("/quiz") ? "active" : ""}`} href={localePath(lang, "/")} onClick={close}>
          {u.navHome}
        </Link>
        <Link className={`nav-link ${is("/about") ? "active" : ""}`} href={localePath(lang, "/about")} onClick={close}>
          {u.navAbout}
        </Link>
        <Link className={`nav-link ${is("/types") ? "active" : ""}`} href={localePath(lang, "/types")} onClick={close}>
          {u.navTypes}
        </Link>
        {lastResult && (
          <Link className={`nav-link ${is("/r") ? "active" : ""}`} href={localePath(lang, `/r/${lastResult}`)} onClick={close}>
            {u.navResult}
          </Link>
        )}
        <Link className="nav-link lang-switch" href={localePath(otherLang, base)} onClick={close} hrefLang={otherLang}>
          {lang === "ja" ? "English" : "日本語"}
        </Link>
      </div>
    </nav>
  );
}
