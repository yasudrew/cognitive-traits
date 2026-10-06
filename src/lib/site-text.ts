import type { Lang } from "./i18n";

type Item = { title: string; body: string };

/** トップページ・フッター・404・規約ページなど、診断以外のサイト共通の文言 */
export const SITE_TEXT: Record<
  Lang,
  {
    typesTitle: string;
    typesLead: string;
    featuresTitle: string;
    features: readonly Item[];
    stepsTitle: string;
    steps: readonly Item[];
    faqTitle: string;
    faq: readonly { q: string; a: string }[];
    finalTitle: string;
    finalLead: string;
    footerNav: { home: string; about: string; types: string; privacy: string; operator: string };
    notFoundTitle: string;
    notFoundLead: string;
    backHome: string;
    resumeTitle: string;
    resumeLead: string;
    resumeBtn: string;
    restartBtn: string;
    keyHint: string;
    tocTitle: string;
    toc: { profile: string; scores: string; categories: string; guide: string; details: string; challenge: string; share: string };
    draftNote: string;
  }
> = {
  ja: {
    typesTitle: "6つのタイプ",
    typesLead: "情報の受け取り方は、視覚・言語・聴覚の3つに分かれ、それぞれがさらに2つのタイプに分かれます。",
    featuresTitle: "この診断の特長",
    features: [
      { title: "「できるか」ではなく「自然にそうなるか」を聞く", body: "楽器の経験や勉強の慣れで答えが変わらないよう、能力ではなく、頭の中に自然に浮かぶ情報の形を聞いています。" },
      { title: "6タイプを総当たりで比べる", body: "2つのタイプを比べる質問を、全15通りの組み合わせで2回ずつ。答え方のクセや回答の一貫性まで見て、結果を出します。" },
      { title: "精密チャレンジで「実測」もできる", body: "図形回転・見た目の記憶・イメージの鮮明さを約3分で測り、自分の感覚とのずれを確かめられます。" },
    ],
    stepsTitle: "診断の流れ",
    steps: [
      { title: "30問に答える", body: "2つの選択肢のどちらに近いかを5段階で選びます。約5分です。" },
      { title: "結果と解説を読む", body: "6タイプのバランス、得意なこと、学び方、伝え方までまとめて表示します。" },
      { title: "精密チャレンジで確かめる", body: "興味があれば、実際の処理を測る課題で答え合わせができます。" },
    ],
    faqTitle: "よくある質問",
    faq: [
      { q: "結果は変わることがありますか？", a: "あります。認知特性は優劣ではなく傾向で、経験や環境によっても変わるとされています。時間をおいてもう一度試すと、変化が見えることもあります。" },
      { q: "どのくらい正確ですか？", a: "自己申告の簡易診断なので、医学的な診断や能力の測定ではありません。回答の一貫性もあわせて表示しているので、結果の確からしさの目安にしてください。" },
      { q: "本田式の認知特性テストとの違いは？", a: "本診断は本田真美氏の認知特性理論を参考に、独自の設問で作成した非公式のものです。本田式認知特性研究所とは関係ありません。正式な診断は公式のテストをお試しください。" },
      { q: "回答内容は保存されますか？", a: "回答をデータベースなどに保存することはありません。結果は回答をもとにしたURLに含まれているだけなので、URLを共有しない限り他の人には見えません。" },
      { q: "子どもでも使えますか？", a: "質問は大人の日常の場面を中心にしています。お子さんが答える場合は、わかりにくい質問を保護者の方が身近な場面に言い換えてあげてください。" },
    ],
    finalTitle: "あなたの「脳のクセ」をのぞいてみよう",
    finalLead: "所要時間は約5分。登録は不要です。",
    footerNav: { home: "ホーム", about: "認知特性とは", types: "タイプ一覧", privacy: "プライバシーポリシー", operator: "運営者情報" },
    notFoundTitle: "ページが見つかりません",
    notFoundLead: "URLが間違っているか、ページが移動した可能性があります。",
    backHome: "トップに戻る",
    resumeTitle: "前回の続きがあります",
    resumeLead: "%s問目まで回答済みです。続きから再開できます。",
    resumeBtn: "続きから再開",
    restartBtn: "最初からやり直す",
    keyHint: "キーボード：1〜5で回答／←で1問戻る",
    tocTitle: "目次",
    toc: { profile: "プロフィール", scores: "スコア", categories: "カテゴリ", guide: "タイプの解説", details: "6タイプの詳細", challenge: "精密チャレンジ", share: "シェア" },
    draftNote: "このページは準備中です。内容は公開前に更新します。",
  },
  en: {
    typesTitle: "The 6 types",
    typesLead: "How we take in information splits into three categories — visual, verbal, and auditory — each with two types.",
    featuresTitle: "What makes this assessment different",
    features: [
      { title: "It asks what happens naturally, not what you can do", body: "So that musical training or study habits don't skew your answers, the questions ask what form information naturally takes in your mind." },
      { title: "All six types compared head-to-head", body: "Each question compares two types, covering all 15 pairs twice. Answer habits and consistency are taken into account." },
      { title: "Measure it with the Deep Challenge", body: "In about 3 minutes, measure mental rotation, visual memory, and imagery vividness, and compare them with how you see yourself." },
    ],
    stepsTitle: "How it works",
    steps: [
      { title: "Answer 30 questions", body: "Choose which of two options is closer to you on a 5-point scale. About 5 minutes." },
      { title: "Read your result", body: "See the balance of the six types, your strengths, how to learn, and how to communicate." },
      { title: "Check it with the Deep Challenge", body: "If you're curious, verify your result with tasks that measure actual processing." },
    ],
    faqTitle: "FAQ",
    faq: [
      { q: "Can my result change?", a: "Yes. Cognitive styles are tendencies, not rankings, and they may shift with experience and environment. Retaking it later may show changes." },
      { q: "How accurate is it?", a: "It's a self-report assessment, not a medical diagnosis or ability test. The answer-consistency score is shown as a guide to how reliable your result is." },
      { q: "How is it different from the Honda test?", a: "This is an unofficial assessment with original questions, inspired by Dr. Mami Honda's theory. It is not affiliated with the Honda Cognitive Traits Institute. Try the official test for a formal assessment." },
      { q: "Are my answers stored?", a: "Your answers aren't saved in any database. Your result is encoded in its URL, so no one else sees it unless you share the link." },
      { q: "Can children take it?", a: "The questions mostly use everyday adult situations. For children, a parent can rephrase unfamiliar questions into situations closer to them." },
    ],
    finalTitle: "Take a peek at how your mind works",
    finalLead: "About 5 minutes. No sign-up needed.",
    footerNav: { home: "Home", about: "What is this?", types: "6 Types", privacy: "Privacy Policy", operator: "About the operator" },
    notFoundTitle: "Page not found",
    notFoundLead: "The URL may be wrong, or the page may have moved.",
    backHome: "Back to home",
    resumeTitle: "You have an unfinished assessment",
    resumeLead: "You've answered up to question %s. Pick up where you left off.",
    resumeBtn: "Resume",
    restartBtn: "Start over",
    keyHint: "Keyboard: 1–5 to answer / ← to go back",
    tocTitle: "Contents",
    toc: { profile: "Profile", scores: "Scores", categories: "Categories", guide: "About your type", details: "All 6 types", challenge: "Deep Challenge", share: "Share" },
    draftNote: "This page is being prepared and will be updated before launch.",
  },
};
