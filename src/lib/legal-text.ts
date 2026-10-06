import type { Lang } from "./i18n";

/**
 * プライバシーポリシー・運営者情報のひな形。
 * 【要記入】の箇所は公開前に運営者が埋める。埋めるまでは noindex にしている（LEGAL_DRAFT）。
 */
export const LEGAL_DRAFT = true;

type Section = { h: string; body: readonly string[] };

export const PRIVACY: Record<Lang, { title: string; sections: readonly Section[]; updated: string }> = {
  ja: {
    title: "プライバシーポリシー",
    updated: "制定日：【要記入】",
    sections: [
      { h: "1. 取得する情報", body: ["本サイトでは、診断の回答をデータベース等に保存しません。診断結果は回答をもとに作成したURLに含まれており、そのURLを共有しない限り第三者が閲覧することはありません。なお、ページの表示に伴い、URLを含む通信記録がホスティング事業者（【要記入：例 Vercel】）のアクセスログに一時的に記録される場合があります。", "回答の途中経過と直近の診断結果は、再開や再表示のためにお使いのブラウザ（localStorage）にのみ保存されます。ブラウザの設定から削除できます。"] },
      { h: "2. アクセス解析ツールについて", body: ["本サイトでは、サイトの改善を目的としてアクセス解析ツール（【要記入：例 Google アナリティクス】）を利用する場合があります。これらのツールはCookieを使用して匿名のトラフィックデータを収集します。個人を特定する情報は含みません。", "Cookieの使用はブラウザの設定で拒否できます。"] },
      { h: "3. 広告について", body: ["本サイトでは、第三者配信の広告サービス（【要記入：例 Google アドセンス】）を利用する場合があります。広告配信事業者は、ユーザーの興味に応じた広告を表示するためにCookieを使用することがあります。", "パーソナライズ広告は、各事業者の広告設定ページから無効にできます。"] },
      { h: "4. アフィリエイトプログラムについて", body: ["本サイトは、商品やサービスを紹介するアフィリエイトプログラム（【要記入：参加するプログラム名】）に参加する場合があります。紹介リンクを経由して購入された場合、運営者が報酬を受け取ることがあります。"] },
      { h: "5. 免責事項", body: ["本サイトの診断は自己申告にもとづく簡易的なもので、医学的な診断や能力の評価ではありません。診断結果や掲載内容の利用によって生じた損害について、運営者は責任を負いかねます。", "本サイトは本田式認知特性研究所とは関係のない非公式のサイトです。"] },
      { h: "6. お問い合わせ", body: ["本ポリシーに関するお問い合わせは、運営者情報ページに記載の連絡先までお願いします。"] },
      { h: "7. 改定", body: ["本ポリシーは、必要に応じて予告なく改定することがあります。改定後の内容は本ページに掲載した時点で効力を生じます。"] },
    ],
  },
  en: {
    title: "Privacy Policy",
    updated: "Effective date: [TO BE FILLED]",
    sections: [
      { h: "1. Information we collect", body: ["Your answers are not stored in any database. Your result is encoded in its URL, so no one else can see it unless you share that URL. Requests, including URLs, may be temporarily recorded in our hosting provider's ([TO BE FILLED: e.g. Vercel]) access logs.", "Your in-progress answers and latest result are stored only in your browser (localStorage) so you can resume or revisit them. You can delete them in your browser settings."] },
      { h: "2. Analytics", body: ["We may use analytics tools ([TO BE FILLED: e.g. Google Analytics]) to improve the site. These tools use cookies to collect anonymous traffic data that does not identify you.", "You can refuse cookies in your browser settings."] },
      { h: "3. Advertising", body: ["We may use third-party advertising services ([TO BE FILLED: e.g. Google AdSense]). Ad providers may use cookies to show ads based on your interests.", "You can opt out of personalized ads on each provider's ad settings page."] },
      { h: "4. Affiliate programs", body: ["We may participate in affiliate programs ([TO BE FILLED]). If you purchase through a referral link, the operator may receive a commission."] },
      { h: "5. Disclaimer", body: ["This assessment is a simple self-report tool, not a medical diagnosis or ability test. The operator is not responsible for any damages arising from the use of the results or content.", "This is an unofficial site and is not affiliated with the Honda Cognitive Traits Institute."] },
      { h: "6. Contact", body: ["For questions about this policy, please use the contact information on the operator page."] },
      { h: "7. Changes", body: ["This policy may be revised without notice. Changes take effect when posted on this page."] },
    ],
  },
};

export const OPERATOR: Record<Lang, { title: string; rows: readonly [string, string][]; note: string }> = {
  ja: {
    title: "運営者情報",
    rows: [
      ["サイト名", "認知特性診断"],
      ["運営者", "【要記入：氏名または屋号】"],
      ["所在地", "【要記入：公開する範囲（例：東京都）】"],
      ["お問い合わせ", "【要記入：メールアドレスまたはお問い合わせフォームのURL】"],
      ["開設", "【要記入】"],
    ],
    note: "本サイトは、本田真美氏の認知特性理論を参考に独自の設問で作成した非公式の診断サイトです。本田式認知特性研究所とは関係ありません。",
  },
  en: {
    title: "About the operator",
    rows: [
      ["Site", "Cognitive Style Assessment"],
      ["Operator", "[TO BE FILLED: name or business name]"],
      ["Location", "[TO BE FILLED]"],
      ["Contact", "[TO BE FILLED: email or contact form URL]"],
      ["Launched", "[TO BE FILLED]"],
    ],
    note: "This is an unofficial assessment site with original questions, inspired by Dr. Mami Honda's cognitive trait theory. It is not affiliated with the Honda Cognitive Traits Institute.",
  },
};
