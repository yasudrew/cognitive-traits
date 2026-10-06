import type { Lang } from "./i18n";

/** true の間はプライバシーポリシー・運営者情報を noindex にする（内容が未確定のとき用） */
export const LEGAL_DRAFT = false;

type Section = { h: string; body: readonly string[]; list?: readonly string[] };

export const PRIVACY: Record<Lang, { title: string; sections: readonly Section[]; updated: string }> = {
  ja: {
    title: "プライバシーポリシー",
    updated: "制定日：2026年10月6日",
    sections: [
      {
        h: "1. 取得する情報",
        body: [
          "本サイトでは、診断の回答をデータベース等に保存しません。診断結果は回答をもとに作成したURLに含まれており、そのURLを共有しない限り第三者が閲覧することはありません。なお、ページの表示に伴い、URLを含む通信記録がホスティング事業者（Vercel Inc.）のアクセスログに一時的に記録される場合があります。",
          "回答の途中経過、直近の診断結果、Cookie利用への同意状況は、再開や再表示のためにお使いのブラウザ（localStorage）にのみ保存されます。ブラウザの設定から削除できます。",
        ],
      },
      {
        h: "2. アクセス解析ツールについて",
        body: [
          "本サイトでは、サイトの改善を目的としてGoogle LLCの「Google アナリティクス」を利用しています。Google アナリティクスはCookieを使用して、閲覧したページ・滞在時間・診断の完了などの匿名のデータを収集します。個人を特定する情報は含みません。",
          "Cookieの利用は、初回表示時のバナーで「同意する」を選んだ場合にのみ有効になります。データの取り扱いについては Google のポリシー（https://policies.google.com/technologies/partner-sites）をご覧ください。",
        ],
      },
      {
        h: "3. 広告について",
        body: [
          "本サイトでは、第三者配信の広告サービス「Google アドセンス」を利用する場合があります。広告配信事業者は、ユーザーの興味に応じた広告を表示するためにCookieを使用することがあります。",
          "パーソナライズ広告は、Google の広告設定（https://adssettings.google.com/）から無効にできます。",
        ],
      },
      {
        h: "4. アフィリエイトプログラムについて",
        body: [
          "本サイトは、Amazon.co.jp を宣伝しリンクすることによってサイトが紹介料を獲得できる手段を提供することを目的に設定されたアフィリエイトプログラムである、Amazonアソシエイト・プログラムの参加者です。",
          "Amazonのアソシエイトとして、本サイトは適格販売により収入を得ています。紹介しているリンクには「PR」と表示しています。",
        ],
      },
      {
        h: "5. 外部送信について",
        body: ["本サイトでは、以下の事業者にブラウザから情報が送信される場合があります。"],
        list: [
          "Google LLC（Google アナリティクス）：閲覧ページ、参照元、端末・ブラウザの情報、Cookie識別子。サイトの利用状況の分析に使います。同意した場合のみ。",
          "Google LLC（Google アドセンス）：閲覧ページ、端末・ブラウザの情報、Cookie識別子。広告の配信と効果測定に使います。",
          "Vercel Inc.（ホスティング）：アクセスしたURL、IPアドレス、ブラウザの情報。サイトの配信と障害対応に使います。",
        ],
      },
      {
        h: "6. 免責事項",
        body: [
          "本サイトの診断は自己申告にもとづく簡易的なもので、医学的な診断や能力の評価ではありません。診断結果や掲載内容の利用によって生じた損害について、運営者は責任を負いかねます。",
          "本サイトは本田式認知特性研究所とは関係のない非公式のサイトです。",
        ],
      },
      { h: "7. お問い合わせ", body: ["本ポリシーに関するお問い合わせは、運営者情報ページに記載のメールアドレスまでお願いします。"] },
      { h: "8. 改定", body: ["本ポリシーは、必要に応じて予告なく改定することがあります。改定後の内容は本ページに掲載した時点で効力を生じます。"] },
    ],
  },
  en: {
    title: "Privacy Policy",
    updated: "Effective date: October 6, 2026",
    sections: [
      {
        h: "1. Information we collect",
        body: [
          "Your answers are not stored in any database. Your result is encoded in its URL, so no one else can see it unless you share that URL. Requests, including URLs, may be temporarily recorded in our hosting provider's (Vercel Inc.) access logs.",
          "Your in-progress answers, latest result, and cookie consent choice are stored only in your browser (localStorage). You can delete them in your browser settings.",
        ],
      },
      {
        h: "2. Analytics",
        body: [
          "We use Google Analytics by Google LLC to improve the site. It uses cookies to collect anonymous data such as pages viewed, time on page, and assessment completion. It does not identify you.",
          "Analytics cookies are enabled only if you choose \"Accept\" on the banner. See Google's policy (https://policies.google.com/technologies/partner-sites) for how data is handled.",
        ],
      },
      {
        h: "3. Advertising",
        body: [
          "We may use Google AdSense, a third-party advertising service. Ad providers may use cookies to show ads based on your interests.",
          "You can turn off personalized ads in Google's Ad Settings (https://adssettings.google.com/).",
        ],
      },
      {
        h: "4. Affiliate programs",
        body: [
          "This site participates in the Amazon Associates Program, an affiliate program designed to provide a means for sites to earn fees by linking to Amazon.co.jp.",
          "As an Amazon Associate, this site earns from qualifying purchases. Affiliate links are labeled \"PR\".",
        ],
      },
      {
        h: "5. Data sent to third parties",
        body: ["Information may be sent from your browser to the following companies."],
        list: [
          "Google LLC (Google Analytics): pages viewed, referrer, device and browser info, cookie identifiers — for usage analysis, only with your consent.",
          "Google LLC (Google AdSense): pages viewed, device and browser info, cookie identifiers — for serving and measuring ads.",
          "Vercel Inc. (hosting): requested URLs, IP address, browser info — for delivering the site and troubleshooting.",
        ],
      },
      {
        h: "6. Disclaimer",
        body: [
          "This assessment is a simple self-report tool, not a medical diagnosis or ability test. The operator is not responsible for any damages arising from the use of the results or content.",
          "This is an unofficial site and is not affiliated with the Honda Cognitive Traits Institute.",
        ],
      },
      { h: "7. Contact", body: ["For questions about this policy, please email the address on the operator page."] },
      { h: "8. Changes", body: ["This policy may be revised without notice. Changes take effect when posted on this page."] },
    ],
  },
};

export const OPERATOR_EMAIL = "o2maroworks@gmail.com";

export const OPERATOR: Record<Lang, { title: string; rows: readonly [string, string][]; note: string }> = {
  ja: {
    title: "運営者情報",
    rows: [
      ["サイト名", "認知特性診断"],
      ["運営者", "marocreate（ろま）"],
      ["お問い合わせ", OPERATOR_EMAIL],
      ["開設", "2026年4月"],
    ],
    note: "本サイトは、本田真美氏の認知特性理論を参考に独自の設問で作成した非公式の診断サイトです。本田式認知特性研究所とは関係ありません。",
  },
  en: {
    title: "About the operator",
    rows: [
      ["Site", "Cognitive Style Assessment"],
      ["Operator", "marocreate (Roma)"],
      ["Contact", OPERATOR_EMAIL],
      ["Launched", "April 2026"],
    ],
    note: "This is an unofficial assessment site with original questions, inspired by Dr. Mami Honda's cognitive trait theory. It is not affiliated with the Honda Cognitive Traits Institute.",
  },
};
