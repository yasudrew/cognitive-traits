import type { Lang } from "./i18n";

export type TypeId = "camera" | "3d" | "fantasy" | "dictionary" | "radio" | "sound";
export type CategoryId = "visual" | "verbal" | "auditory";

export type TypeText = {
  label: string;
  sub: string;
  category: string;
  desc: string;
  input: string;
  learning: string;
  workstyle: string;
};

/* ═══ i18n DATA ═══ */
const I = {
  types: {
    camera: {
      ja: { label:"カメラタイプ", sub:"写真（カメラアイ）", category:"視覚優位", desc:"写真のように二次元で情報を切り取り、画像として記憶するタイプ。色彩やデザインへの感度が高く、一度見た光景を鮮明に思い出せます。", input:"図表・写真・イラスト・カラーコードなど視覚的な情報。テキストだけのメールより、スクリーンショット付きの方が頭に入る。", learning:"カラーマーカーやマインドマップで色分け整理。教科書の図を見て覚える、ノートに絵を描くなど「見える化」が効果的。", workstyle:"デザインレビュー、資料のビジュアル作成、UI/UXチェック、ビジュアルQAなど、見た目の精度が求められる作業に強い。" },
      en: { label:"Camera Type", sub:"Photographic (Camera Eye)", category:"Visual", desc:"You capture information as two-dimensional snapshots, like photographs. You're highly sensitive to colors and design, and can vividly recall scenes you've seen before.", input:"Charts, photos, illustrations, color-coded information. A screenshot attached to an email sticks better than plain text.", learning:"Use color-coded markers and mind maps. Study diagrams in textbooks, sketch ideas — making information visible is your key to retention.", workstyle:"Design review, visual asset creation, UI/UX checks, visual QA — any task that demands precision in appearance." },
    },
    "3d": {
      ja: { label:"3Dタイプ", sub:"三次元映像（3D）", category:"視覚優位", desc:"空間や時間軸を使って立体的に思考するタイプ。動画のように記憶し、人の顔や道順を覚えるのが得意です。", input:"動画・実演・ハンズオン体験。文字で読むより実際にやってみる、歩いてみるのが一番の近道。", learning:"動画教材や実験・フィールドワークが最適。頭の中で手順を映像として再生するシミュレーション学習も有効。", workstyle:"プロトタイピング、空間設計、プロジェクトの段取り組み、現場の状況判断など、立体的・時系列的な把握が活きる場面。" },
      en: { label:"3D Type", sub:"Three-Dimensional (3D)", category:"Visual", desc:"You think in three dimensions, using space and time. You remember things like a movie — faces, routes, and spatial layouts come naturally.", input:"Videos, demonstrations, hands-on experiences. Doing it yourself or walking through it beats reading about it every time.", learning:"Video tutorials, experiments, and fieldwork are ideal. Mental simulation — replaying steps as a movie in your head — also works well.", workstyle:"Prototyping, spatial design, project planning, on-site decision making — situations where 3D and timeline awareness matter." },
    },
    fantasy: {
      ja: { label:"ファンタジータイプ", sub:"言語映像（ファンタジー）", category:"言語優位", desc:"読んだり聞いたりした内容を映像化して思考するタイプ。文章から鮮明な情景を思い浮かべ、映像を言葉にするのも得意です。", input:"ストーリー仕立ての説明、事例紹介、ケーススタディ。抽象的な理論より具体的なエピソードの方が入りやすい。", learning:"物語形式で覚える、歴史を漫画で読む、エピソード記憶の活用。例え話や比喩を使った理解がぴったり。", workstyle:"企画書やストーリーの構成、ユーザーの利用シナリオ作成、プレゼンの語り方設計など、言語と映像をつなぐ作業。" },
      en: { label:"Fantasy Type", sub:"Verbal-Visual (Fantasy)", category:"Verbal", desc:"You convert words into vivid mental images. When you read a story, you can see the characters and scenery like a movie — and you can just as easily put images back into words.", input:"Story-based explanations, case studies, real examples. Concrete episodes stick better than abstract theories.", learning:"Learn through narratives, read history as manga/comics, leverage episodic memory. Metaphors and analogies are your best friends.", workstyle:"Writing proposals, crafting user scenarios, designing presentation narratives — bridging language and imagery." },
    },
    dictionary: {
      ja: { label:"辞書タイプ", sub:"言語抽象（辞書）", category:"言語優位", desc:"文字や文章をそのまま言葉で思考し、図式化・体系化して記憶するタイプ。ノートまとめの達人で、論理的な整理が得意です。", input:"構造化されたドキュメント、箇条書き、フローチャート。目次がある教科書や体系的なマニュアルが最も頭に入る。", learning:"ノートに自分の言葉でまとめ直す、概念をカテゴリ分けする、フローチャートや表にして整理する学習法。", workstyle:"議事録作成、要件定義、マニュアル整備、ナレッジ管理、論理的な分析・レポート作成など、構造化が求められる場面。" },
      en: { label:"Dictionary Type", sub:"Verbal-Abstract (Dictionary)", category:"Verbal", desc:"You think in words and systems. You naturally organize information into categories, flowcharts, and structured notes — a master of logical summarization.", input:"Structured documents, bullet-point lists, flowcharts. Textbooks with a clear table of contents and systematic manuals work best.", learning:"Rewrite notes in your own words, categorize concepts, create flowcharts and tables to organize your understanding.", workstyle:"Meeting minutes, requirements definition, documentation, knowledge management, analytical reports — wherever structure matters." },
    },
    radio: {
      ja: { label:"ラジオタイプ", sub:"聴覚言語（ラジオ）", category:"聴覚優位", desc:"文字や文章を「音」として耳から入れ情報処理するタイプ。人の話を正確に覚え、語呂合わせや音読での記憶が得意です。", input:"口頭説明、会議、ポッドキャスト、講義。テキストを読むより、誰かに説明してもらう方が理解が早い。", learning:"音読、講義の録音再生、語呂合わせ、ポッドキャストやオーディオブックの活用。声に出して繰り返すと定着する。", workstyle:"ファシリテーション、ヒアリング、電話対応、プレゼン、口頭での引き継ぎなど、聴く・話すが中心の業務。" },
      en: { label:"Radio Type", sub:"Auditory-Verbal (Radio)", category:"Auditory", desc:"You process information best when it comes through spoken words. You accurately remember what people say, and excel at mnemonics and reading aloud.", input:"Verbal explanations, meetings, podcasts, lectures. Having someone explain it to you is faster than reading about it.", learning:"Read aloud, replay recorded lectures, use mnemonics, listen to podcasts and audiobooks. Repetition through voice makes things stick.", workstyle:"Facilitation, interviews, phone work, presentations, verbal handoffs — any task centered on listening and speaking." },
    },
    sound: {
      ja: { label:"サウンドタイプ", sub:"聴覚＆音（サウンド）", category:"聴覚優位", desc:"音色や音階といった音楽的イメージを理解・処理できるタイプ。メロディを一度聞いて再現したり、声の微細な違いを聞き分けます。", input:"音声のトーン・リズム・抑揚。話の内容だけでなく「どう聞こえるか」で理解度が変わる。BGMのある環境が集中しやすいことも。", learning:"リズムに乗せて覚える、チャンツ（歌うように唱える）学習法、BGM付き環境での学習、発音・イントネーションの模倣。", workstyle:"音声コンテンツ制作、場の雰囲気の察知、声のトーンで相手の状態を読む対人業務、ナレーション・音響関連の作業。" },
      en: { label:"Sound Type", sub:"Auditory & Music (Sound)", category:"Auditory", desc:"You understand and process musical patterns — tone, pitch, rhythm. You can reproduce a melody after one listen and pick up subtle differences in voices.", input:"Tone, rhythm, and intonation matter as much as content. How something sounds changes how well you understand it. Background music may help you focus.", learning:"Learn with rhythm, use chants, study with background music, mimic pronunciation and intonation patterns.", workstyle:"Audio content creation, reading the mood of a room, understanding people through vocal tone, narration and sound work." },
    },
  },
  ui: {
    ja: { siteTitle:"認知特性診断", navHome:"ホーム", navAbout:"認知特性とは", navTypes:"タイプ一覧", navResult:"診断結果", heroSub:"COGNITIVE STYLE ASSESSMENT", heroTitle1:"あなたの認知特性を", heroTitle2:"知ろう", heroDesc:"30の質問に答えるだけで、情報の受け取り方・処理の仕方が6タイプの割合で分かります。自分の「脳のクセ」を知って、学び方・働き方を最適化しましょう。", startBtn:"診断をはじめる", duration:"所要時間 約5分 ・ 全30問 ・ 無料", catVisual:"視覚優位", catVisualSub:"見て覚える", catVerbal:"言語優位", catVerbalSub:"読んで覚える", catAuditory:"聴覚優位", catAuditorySub:"聞いて覚える",
      optA0:"Aにとても近い", optA1:"ややAに近い", opt2:"どちらとも言えない", optB3:"ややBに近い", optB4:"Bにとても近い", nearA:"Aに近い", nearB:"Bに近い", prevQ:"← 前の質問", quizNote:"得意・不得意や経験ではなく、ふだん自然にそうなる方を選んでください。",
      resultYourTop:"あなたの最も強い認知特性", resultTied:"%d つのタイプが同率で最も強い認知特性です", scoreTitle:"タイプ別スコア", maxNote:"50%が平均。ほかのタイプと比べたときの選ばれやすさです", catTitle:"カテゴリ別", detailTitle:"詳細", inputLabel:"得意なインプット：", learningLabel:"おすすめ学習法：", workLabel:"得意な業務スタイル：", levelStrong:"とても強い", levelMod:"やや強い", levelAvg:"平均的", levelLow:"控えめ",
      adviceTitle:"あなたへのアドバイス", adviceSingle1:"あなたは", adviceSingle2:"の傾向が最も強いですが、認知特性は一つだけに決まるものではありません。", adviceSingle3:"2番目の", adviceSingle4:"も活用し、自分に合ったインプット・アウトプットの方法を見つけましょう。", adviceTied1:"が同じ強さで出ています。複数の認知チャンネルをバランスよく使えるタイプです。場面に応じて得意な処理方法を使い分けることで、さらに力を発揮できるでしょう。", disclaimer:"※本診断は、本田真美氏の認知特性理論を参考に独自の設問で作成した非公式の簡易診断です。本田式認知特性研究所とは関係ありません。正式な診断は公式の「本田40式認知特性テスト」をお試しください。",
      restartBtn:"もう一度診断する", typesBtn:"タイプ一覧",
      typesPageTitle:"6つの認知特性タイプ", typesPageDesc:"人は情報を処理する方法に個性があり、大きく「視覚」「言語」「聴覚」の3カテゴリ、さらに各2タイプに分かれます。", tryBtn:"診断してみる",
      aboutTitle:"認知特性とは", aboutSub:"Cognitive Style / Cognitive Characteristics", aboutP1:"認知特性とは、目や耳などの感覚器から入ってきた情報を、頭の中で", aboutP1b:"理解・整理・記憶・表現する方法", aboutP1c:"のことです。人によってその処理の仕方には個性があり、同じ情報に触れても、理解の仕方や覚え方が異なります。", aboutP2:"たとえば、好きな曲について話すとき「歌詞が好き」という人もいれば「メロディが好き」という人もいます。教科書を読んで覚える人もいれば、講義を聴いて覚える人もいます。この違いこそが、認知特性の違いです。", about3title:"3つのカテゴリと6つのタイプ", about3desc:"認知特性は大きく「視覚優位」「言語優位」「聴覚優位」の3カテゴリに分けられ、さらにそれぞれが2つのタイプに分かれます。",
      aboutBenTitle:"知ることのメリット", aboutBen1a:"自分の認知特性を知ると、", aboutBen1b:"自分に合った学び方・働き方", aboutBen1c:"を選べるようになります。たとえば視覚優位の人が音声教材だけで勉強しても効率が上がりにくいように、自分の特性に合わない方法を続けていると、本来の力を発揮しづらくなります。", aboutBen2a:"また、周囲の人との認知特性の違いを理解することで、", aboutBen2b:"コミュニケーションの改善", aboutBen2c:"にもつながります。「なぜこの人は口頭で伝えた方が理解してくれるのか」「なぜ資料を見せた方が話が早いのか」——その理由が認知特性の違いにあるかもしれません。", aboutBen3a:"認知特性は優劣ではなく、あくまで", aboutBen3b:"情報処理の好みや傾向", aboutBen3c:"です。また、環境や経験によって変化する可能性もあるとされています。",
      aboutThisTitle:"この診断について", aboutThisP:"この診断は、小児科医・医学博士の本田真美先生が提唱した認知特性理論をベースに、独自の設問30問で作成したものです。6タイプのうち2つを比べる質問に5段階で答える方式で、全15通りの組み合わせを2回ずつ比べます。「できる・得意」ではなく「自然にそうなるか」を聞くことで、経験や訓練の影響をできるだけ減らしています。", aboutThisNote:"※本診断は非公式のもので、本田式認知特性研究所とは関係ありません。より正確な診断を受けたい方は、公式の「本田40式認知特性テスト」をお試しください。",
      catVisualDesc:"目で見た情報を処理するのが得意", catVerbalDesc:"読んだ情報を処理するのが得意", catAuditoryDesc:"耳で聞いた情報を処理するのが得意",
      avgLabel:"平均", profileTitle:"あなたのプロフィール", profileSingle:"はっきり型", profileSingleDesc:"「%s」がほかより一段強く出ています。情報を受け取るときのいつもの入口がはっきりしているタイプです。", profileMixed:"複合型", profileMixedDesc:"上位のタイプが近い強さで並んでいます。場面に応じて、複数の入口を自然に使い分けているタイプです。", profileBalanced:"バランス型", profileBalancedDesc:"6タイプの差が小さく、特定の処理に偏らないタイプです。どの形式の情報にも対応しやすい一方、「これが一番」という実感は持ちにくいかもしれません。",
      withinTitle:"カテゴリ内の偏り", consistencyTitle:"回答の一貫性", consistencyHigh:"高い", consistencyMid:"ふつう", consistencyLow:"ゆらぎあり", consistencyHighDesc:"同じ組み合わせを比べた質問に、ほぼ同じ向きで答えています。結果の確からしさは高めです。", consistencyMidDesc:"おおむね一貫していますが、場面によって答えが変わった組み合わせもありました。", consistencyLowDesc:"同じ組み合わせでも、場面によって答えが分かれました。状況で使い分けているか、迷いながら答えた可能性があります。時間をおいてもう一度診断すると傾向が見えやすくなります。",
      officialLink:"公式テストはこちら", shareTitle:"結果をシェアする", shareText:"私の認知特性は「%s」でした！あなたはどのタイプ？", shareTextTied:"私の認知特性は「%s」が同率トップでした！あなたはどのタイプ？", shareHashtag:"認知特性診断", copyLink:"リンクをコピー", copied:"コピーしました", shareMore:"その他",
      typeDetailLink:"詳しく見る", otherTypes:"ほかのタイプ", typeOfCategory:"%sのタイプ", invalidResult:"診断結果が読み込めませんでした。もう一度診断してください。",
      metaTitle:"認知特性診断｜30問であなたの脳のクセが分かる無料テスト", metaDesc:"30の質問に答えるだけで、あなたの認知特性（視覚・言語・聴覚の6タイプ）が割合で分かる無料診断。自分に合った学び方・働き方が見つかります。", resultMetaTitle:"診断結果：%s｜認知特性診断", ogResultLead:"私の認知特性は", ogCta:"あなたも30問で診断",
    },
    en: { siteTitle:"Cognitive Style", navHome:"Home", navAbout:"What is this?", navTypes:"6 Types", navResult:"Results", heroSub:"COGNITIVE STYLE ASSESSMENT", heroTitle1:"Discover Your", heroTitle2:"Cognitive Style", heroDesc:"Answer 30 questions to find out how you naturally receive and process information, broken down across 6 cognitive types. Understand your brain's preferences and optimize the way you learn and work.", startBtn:"Start Assessment", duration:"About 5 min · 30 questions · Free", catVisual:"Visual", catVisualSub:"Learn by seeing", catVerbal:"Verbal", catVerbalSub:"Learn by reading", catAuditory:"Auditory", catAuditorySub:"Learn by listening",
      optA0:"Very close to A", optA1:"Somewhat closer to A", opt2:"Neither", optB3:"Somewhat closer to B", optB4:"Very close to B", nearA:"Closer to A", nearB:"Closer to B", prevQ:"← Previous", quizNote:"Pick what happens naturally for you — not what you are good at or have practiced.",
      resultYourTop:"Your strongest cognitive style", resultTied:"%d types are tied as your strongest cognitive style", scoreTitle:"Score by Type", maxNote:"50% is average — how often this type was chosen over the others", catTitle:"By Category", detailTitle:"Details", inputLabel:"Best Input Style: ", learningLabel:"Recommended Learning: ", workLabel:"Work Style Strength: ", levelStrong:"Very strong", levelMod:"Somewhat strong", levelAvg:"Average", levelLow:"Low",
      adviceTitle:"Personalized Advice", adviceSingle1:"Your strongest type is ", adviceSingle2:", but cognitive style isn't limited to just one type.", adviceSingle3:"Try leveraging your second-strongest type, ", adviceSingle4:", to find the input and output methods that work best for you.", adviceTied1:" are equally strong for you. You're a balanced multi-channel processor. By consciously switching between modes depending on the situation, you can unlock even more potential.", disclaimer:"This is an unofficial, independently written assessment inspired by Dr. Mami Honda's cognitive trait theory. It is not affiliated with the Honda Cognitive Traits Institute. For a formal assessment, try the official 'Honda 40-Style Cognitive Traits Test'.",
      restartBtn:"Retake Assessment", typesBtn:"View All Types",
      typesPageTitle:"The 6 Cognitive Types", typesPageDesc:"Everyone has their own way of processing information. There are 3 major categories — Visual, Verbal, and Auditory — each split into 2 distinct types.", tryBtn:"Take the Assessment",
      aboutTitle:"What Are Cognitive Styles?", aboutSub:"Cognitive Style / Cognitive Characteristics", aboutP1:"Cognitive style refers to how your brain ", aboutP1b:"understands, organizes, remembers, and expresses", aboutP1c:" information received through your senses. Everyone processes information differently — the same input can lead to very different understanding and recall.", aboutP2:"For example, when talking about a favorite song, some people focus on the lyrics while others focus on the melody. Some learn best by reading a textbook, others by listening to a lecture. These differences are cognitive styles.", about3title:"3 Categories, 6 Types", about3desc:"Cognitive styles fall into three broad categories — Visual, Verbal, and Auditory — each with two subtypes.",
      aboutBenTitle:"Why It Matters", aboutBen1a:"Knowing your cognitive style helps you ", aboutBen1b:"choose learning and working methods that actually fit you", aboutBen1c:". For instance, a visually-oriented person studying only through audio lectures may struggle — not because of ability, but because of a mismatch.", aboutBen2a:"Understanding these differences in others can also ", aboutBen2b:"improve communication", aboutBen2c:". Why does one colleague prefer verbal briefings while another wants a written document? The answer may lie in cognitive style.", aboutBen3a:"Cognitive styles are not about being better or worse — they're simply ", aboutBen3b:"preferences and tendencies in how you process information", aboutBen3c:". They may also shift with experience and environment.",
      aboutThisTitle:"About This Assessment", aboutThisP:"This assessment is based on the cognitive trait theory proposed by Dr. Mami Honda (pediatrician and medical doctor). Each of the 30 original questions compares two of the six types on a 5-point scale, covering all 15 combinations twice. Questions ask what happens naturally rather than what you can do, to reduce the influence of experience and training.", aboutThisNote:"This assessment is unofficial and not affiliated with the Honda Cognitive Traits Institute. For a more precise assessment, try the official 'Honda 40-Style Cognitive Traits Test'.",
      catVisualDesc:"Processes visual information best", catVerbalDesc:"Processes written information best", catAuditoryDesc:"Processes auditory information best",
      avgLabel:"avg", profileTitle:"Your Profile", profileSingle:"Distinct", profileSingleDesc:"\"%s\" stands out clearly above the rest. You have a clear default way of taking in information.", profileMixed:"Combined", profileMixedDesc:"Your top types are close in strength. You naturally switch between several ways of processing depending on the situation.", profileBalanced:"Balanced", profileBalancedDesc:"The differences among the six types are small, so you don't lean heavily on one mode. You adapt to many formats, though you may not feel a single \"best\" way.",
      withinTitle:"Within each category", consistencyTitle:"Answer consistency", consistencyHigh:"High", consistencyMid:"Moderate", consistencyLow:"Variable", consistencyHighDesc:"You answered the paired questions in nearly the same direction. This result is fairly reliable.", consistencyMidDesc:"Mostly consistent, though some pairs changed depending on the situation.", consistencyLowDesc:"Your answers to the same pairs varied by situation. You may switch modes depending on context, or you may have been unsure. Retaking it later can make the pattern clearer.",
      officialLink:"Official test", shareTitle:"Share your result", shareText:"My cognitive style is \"%s\"! What's yours?", shareTextTied:"My top cognitive styles are \"%s\"! What's yours?", shareHashtag:"CognitiveStyle", copyLink:"Copy link", copied:"Copied", shareMore:"More",
      typeDetailLink:"Learn more", otherTypes:"Other types", typeOfCategory:"%s types", invalidResult:"We couldn't load this result. Please take the assessment again.",
      metaTitle:"Cognitive Style Assessment | Free 30-question test", metaDesc:"Answer 30 questions to discover how you process information across 6 cognitive types (visual, verbal, auditory). Find the learning and working style that fits you.", resultMetaTitle:"Result: %s | Cognitive Style Assessment", ogResultLead:"My cognitive style is", ogCta:"Take the free 30-question test",
    },
  },
};

export const TYPE_TEXT: Record<TypeId, Record<Lang, TypeText>> = I.types;
export type UiText = typeof I.ui.ja;
export const UI: Record<Lang, UiText> = I.ui;

export type TypeMeta = { id: TypeId; color: string; bg: string; categoryId: CategoryId };

/** 表示順。スコアのURLエンコード順もこの順で固定する */
export const TYPE_META: readonly TypeMeta[] = [
  { id: "camera", color: "#D94F3B", bg: "#FEF2F0", categoryId: "visual" },
  { id: "3d", color: "#C87620", bg: "#FFF8EE", categoryId: "visual" },
  { id: "fantasy", color: "#2968B0", bg: "#EFF6FF", categoryId: "verbal" },
  { id: "dictionary", color: "#6D4ABA", bg: "#F5F0FF", categoryId: "verbal" },
  { id: "radio", color: "#178F5E", bg: "#EEFBF4", categoryId: "auditory" },
  { id: "sound", color: "#0E8A8A", bg: "#EEFCFC", categoryId: "auditory" },
];

export const TYPE_IDS: readonly TypeId[] = TYPE_META.map((m) => m.id);

export const isTypeId = (v: string): v is TypeId => (TYPE_IDS as readonly string[]).includes(v);

export const CATEGORIES: readonly { id: CategoryId; color: string; ids: readonly TypeId[]; label: Record<Lang, string> }[] = [
  { id: "visual", color: "#D94F3B", ids: ["camera", "3d"], label: { ja: "視覚優位", en: "Visual" } },
  { id: "verbal", color: "#2968B0", ids: ["fantasy", "dictionary"], label: { ja: "言語優位", en: "Verbal" } },
  { id: "auditory", color: "#178F5E", ids: ["radio", "sound"], label: { ja: "聴覚優位", en: "Auditory" } },
];

export const getType = (id: TypeId, lang: Lang): TypeMeta & TypeText => {
  const meta = TYPE_META.find((m) => m.id === id);
  if (!meta) throw new Error(`Unknown type id: ${id}`);
  return { ...meta, ...TYPE_TEXT[id][lang] };
};

/** 「認知特性とは」ページで使う一言説明 */
export const TYPE_TAGLINE: Record<TypeId, Record<Lang, string>> = {
  camera: { ja: "写真のように二次元で記憶", en: "Captures information as 2D snapshots" },
  "3d": { ja: "空間や時間軸で立体的に思考", en: "Thinks spatially and temporally in 3D" },
  fantasy: { ja: "言葉を映像化して思考", en: "Converts words into vivid mental images" },
  dictionary: { ja: "文字を図式化・体系化して記憶", en: "Organizes information into structures and systems" },
  radio: { ja: "言葉を音として処理", en: "Processes spoken words as audio" },
  sound: { ja: "音色やメロディで理解", en: "Understands through musical tone and rhythm" },
};
