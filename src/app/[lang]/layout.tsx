import type { Metadata } from "next";
import { Zen_Kaku_Gothic_New } from "next/font/google";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { UI } from "@/lib/content";
import { LANGS, isLang } from "@/lib/i18n";
import { SITE_URL, alternates } from "@/lib/site";
import "../globals.css";

const font = Zen_Kaku_Gothic_New({
  weight: ["400", "700"],
  subsets: ["latin"],
  // 日本語フォントは unicode-range で100以上のファイルに分割されるため、preloadすると初期表示が重くなる
  preload: false,
  display: "swap",
  variable: "--font-main",
});

export const generateStaticParams = () => LANGS.map((lang) => ({ lang }));
export const dynamicParams = false;

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const u = UI[lang];
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: u.metaTitle, template: `%s${lang === "ja" ? "｜" : " | "}${u.siteTitle}` },
    description: u.metaDesc,
    alternates: alternates(lang, "/"),
    openGraph: {
      type: "website",
      siteName: u.siteTitle,
      title: u.metaTitle,
      description: u.metaDesc,
      locale: lang === "ja" ? "ja_JP" : "en_US",
    },
    twitter: { card: "summary_large_image" },
    icons: { icon: "/favicon.svg" },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return (
    <html lang={lang} className={font.variable}>
      <body>
        <div style={{ minHeight: "100vh" }}>
          <div className="container">
            <Nav lang={lang} />
            <main>{children}</main>
            <Footer lang={lang} />
          </div>
        </div>
      </body>
    </html>
  );
}
